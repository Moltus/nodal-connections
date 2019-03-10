
class Node {
  constructor(id, initialPosition, color=undefined) {
    this.id = id;
    this.domElement = document.getElementById(this.id);
    this.domConnections = document.getElementById((this.id + '__connections'));
    // console.log("domConnections id : ", this.domConnections);
    this.initPos = initialPosition;
    this.color = (color || 'rgb(' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50) + ')');
    this.domElement.style.backgroundColor = this.color;
    this.children = [];
    this.parents = [];
    this.bbox = this.domElement.getBoundingClientRect();
    console.log(this.bbox);
    this.animation = false;
  }

  getChildren(...targets) {
    // console.log('getChildren targets :', targets);
    for (let i of targets) {
      this.children.push(i); 
    }
  }

  getParents() {
    for (let n of nodes) {
      for (let i of n.children) {
        if (this == i) {
          this.parents.push(n);
        }
      }
    }
  }

  linkChildren(){
    for (let child of this.children) this.linkChild(child);
  }

  linkParents(){
    // console.log("parents are : ", this.parents);
    for (let parent of this.parents) {
      // console.log("parent : ", parent);
      parent.linkChild(this);
    }
  }

  move(x, y, suffix='px', time=1000) {
    this.animation = true;
    console.log(this, "  movePos : ", x, y)

    this.domElement.style.transition = 'all ' + time + 'ms';

    this.domElement.style.left = x + suffix;
    if (suffix === 'vw') suffix = 'vh';
    console.log("move suffix : ", suffix);
    this.domElement.style.top = y + suffix;
    this.deleteLinks();

    let n = 0;
    let interval = setInterval(() => {
      // console.log(" n is equal to : ", n);
      // console.log("interval : ", interval);
      
      this.deleteLinks();
      this.linkParents();
      this.linkChildren();
      n ++;
      if (n === time / 10) {
        this.domElement.style.transition = 'none';
        clearInterval(interval);
        this.animation = false;
      }
    }, 10); 
    
  }

  getCoords() {
    return [this.domElement.getBoundingClientRect().left, this.domElement.getBoundingClientRect().top];
  }

  linkChild(child, arrow=true) {
    let parent = this;
    let parentElem = this.domElement;
    let childElem = child.domElement;
    let parentBbox = parentElem.getBoundingClientRect();
    let childBbox = childElem.getBoundingClientRect();
    let parentVMid = (parentBbox.bottom + parentBbox.top) / 2;
    let childVMid = (childBbox.bottom + childBbox.top) / 2;
    let parentHMid = (parentBbox.left + parentBbox.right) / 2;
    let childHMid = (childBbox.left + childBbox.right) / 2;
    // declare plugs origin positions for assigning them later
    let plug1_posX;
    let plug1_posY;
    let plug2_posX;
    let plug2_posY;
    // declare width (X distance between plug 1 and 2)
    // declare height (Y distance between plug 1 and 2)
    // declare arrow direction (from parent to child or child to parent)
    let width;
    let height;
    let arrowDir;
    
    

    if (parentBbox.right < childBbox.left) {
      // parent is left of child
      width = childBbox.left - parentBbox.right + 2;
      plug1_posX = parentBbox.right - 1;
      plug1_posY = parentBbox.top + parentBbox.height / 2;
      plug2_posX = childBbox.left + 1;
      plug2_posY = childBbox.top + childBbox.height / 2;
      
      
      if (parentVMid >= childVMid) {
        // parent is left of child and under child
        height = parentVMid - childVMid;
        arrowDir = (height/width < .15) ? 'right' : 'up';
        createLinks(parent, child, plug1_posX, plug1_posY - height / 2, 'bottom-right');
        createLinks(child, parent, plug2_posX - width / 2, plug2_posY,'top-left');
        if (arrow) createArrow(parent, child, plug1_posX + width / 2,
          plug1_posY - height / 2, arrowDir);
      } else {
        // parent is left of child and above child
        height = childVMid - parentVMid;
        arrowDir = (height / width < .15) ? 'right' : 'up';
        createLinks(parent, child, plug1_posX, plug1_posY, 'top-right');
        createLinks(child, parent, plug2_posX - width/2, plug2_posY - height/2, 'bottom-left');
        if (arrow) createArrow(parent, child,  plug1_posX + width / 2,
          plug1_posY + height / 2, arrowDir);
      }
      // create plugs after so they appear on top
      createPlug(parent, child, plug1_posX, plug1_posY);
      createPlug(child, parent, plug2_posX, plug2_posY);

    } else if (parentBbox.left > childBbox.right)  {
      // parent is right of child
      width = parentBbox.left - childBbox.right + 2;
      plug1_posX = parentBbox.left + 1;
      plug1_posY = parentBbox.top + parentBbox.height / 2;
      plug2_posX = childBbox.right - 1;
      plug2_posY = childBbox.top + childBbox.height / 2;
      

      if (parentVMid >= childVMid) {
        // parent is right of child and under child
        
        height = parentVMid - childVMid;
        arrowDir = (height / width < .1) ? 'left' : 'up';
        createLinks(parent, child, plug1_posX - width/2, plug1_posY - height/2, 'bottom-left');
        createLinks(child, parent, plug2_posX, plug2_posY, 'top-right');
        if (arrow) createArrow(parent, child,  plug1_posX - width / 2,
          plug1_posY - height / 2, arrowDir);
      } else {
        // parent is right of child and above child
        height = childVMid - parentVMid;
        arrowDir = (height / width < .1) ? 'left' : 'down';
        createLinks(parent, child, plug1_posX - width/2, plug1_posY, 'top-left');
        createLinks(child, parent, plug2_posX, plug2_posY - height/2, 'bottom-right');
        if (arrow) createArrow(parent, child,  plug1_posX - width / 2,
          plug1_posY + height / 2, arrowDir);
      }
      // create plugs after so they appear on top
      createPlug(parent, child, plug1_posX, plug1_posY);
      createPlug(child, parent, plug2_posX, plug2_posY);

    } else { // when nodes are right above or under each other
      width = childHMid - parentHMid;
      plug1_posX = (parentBbox.right + parentBbox.left) / 2;
      plug2_posX = (childBbox.right + childBbox.left) / 2;
      
      if (parentBbox.top > childBbox.bottom) {
        // parent is under child
        height = parentBbox.top - childBbox.bottom + 2;
        plug1_posY = parentBbox.top + 1;
        plug2_posY = childBbox.bottom - 1;

        if (parentHMid <= childHMid) {
          // parent is under child and parent is left of child
          arrowDir = (width / height < .1) ? 'up' : 'right';
          createLinks(parent, child, plug1_posX, plug1_posY - height / 2, 'top-left');
          createLinks(child, parent, plug2_posX - width / 2, plug2_posY, 'bottom-right');
          if (arrow) createArrow(parent, child, plug1_posX + width / 2,
            plug1_posY - height / 2, arrowDir);
        } else {
          // parent is under child and parent is right of child
          width = parentHMid - childHMid;
          arrowDir = (width / height < .1) ? 'up' : 'left';
          createLinks(parent, child, plug1_posX - width / 2, plug1_posY - height / 2, 'top-right');
          createLinks(child, parent, plug2_posX, plug2_posY, 'bottom-left');
          if (arrow) createArrow(parent, child, plug1_posX - width / 2,
            plug1_posY - height / 2, arrowDir);
        }
        // create plugs after so they appear on top
        createPlug(parent, child, plug1_posX, plug1_posY);
        createPlug(child, parent, plug2_posX, plug2_posY);

      } else if (parentBbox.bottom < childBbox.top){
        // parent is above child
        plug1_posY = parentBbox.bottom - 1;
        plug2_posY = childBbox.top + 1;
        // create links
        height = childBbox.top - parentBbox.bottom + 2;
        if (parentHMid <= childHMid) {
          // parent is above child and left of child
          arrowDir = (width / height < .1) ? 'down' : 'right';
          createLinks(parent, child, plug1_posX, plug1_posY, 'bottom-left');
          createLinks(child, parent, plug2_posX - width / 2, plug2_posY - height / 2, 'top-right');
          if (arrow) createArrow(parent, child, plug1_posX + width / 2,
            plug1_posY + height / 2, arrowDir);
        } else {
          // parent is above child and right of child
          width = parentHMid - childHMid;
          arrowDir = (width / height < .1) ? 'down' : 'left';
          createLinks(parent, child, plug1_posX - width / 2, plug1_posY,'bottom-right');
          createLinks(child, parent, plug2_posX, plug2_posY - height / 2,'top-left');
          if (arrow) createArrow(parent, child, plug1_posX - width / 2,
            plug1_posY + height / 2, arrowDir);
        }
        // create plugs after so they appear on top
        createPlug(parent, child, plug1_posX, plug1_posY);
        createPlug(child, parent, plug2_posX, plug2_posY);
      }     
    }
    function createPlug(element1, element2, x, y) {
  
      let plug = document.createElement('div');
      // console.log("element1 connections : ", element1.domConnections)
      element1.domConnections.appendChild(plug);
      plug.className = 'plug';
      plug.classList.add('plug__' + element1.id + '-' + element2.id)
      plug.style.left = x - 5 + 'px';
      plug.style.top = y - 5 + 'px';
    }
  
    function createLinks(element1, element2, topLeftX, topLeftY, corner) {
      let link = document.createElement('div');
  
      element1.domConnections.appendChild(link);
      link.classList.add('link');
      link.classList.add('link__' + element1.id + '-' + element2.id);
      // TODO : maybe add some flattened link style when height/width < .2 for ex.
      // if (isFlat) link.classList.add('link--flat');
      link.style.width = width / 2 + 'px';
      link.style.height = height / 2 + 'px';
  
      link.classList.add('link--' + corner);
      link.style.left = topLeftX + 'px';
      link.style.top = topLeftY + 'px';     
    }

    function createArrow(element1, element2, x, y, direction) {
      let arrow = document.createElement('div');
      arrow.classList.add('arrow');
      arrow.classList.add('arrow__' + element1.id + '-' + element2.id);
      element1.domConnections.appendChild(arrow);
      arrow.classList.add('arrow--' + direction);
      arrow.style.left = x - 7 + 'px';
      arrow.style.top = y - 7 + 'px';
    }

  }

  deleteLinks() {
    // while (this.domConnections.childNodes[1]) {
    //   this.domConnections.removeChild(this.domConnections.childNodes[1]);
    // }

    // for (let n of this.children) {
    //   console.log('iterate through children : ', n);
    //   while (n.childNodes[1]) {
    //     n.removeChild(n.childNodes[1]);
    //   }
    for (let n of nodes) {
      let toDel = n.domConnections.querySelectorAll(`[class*=${this.id}]`);
      if (toDel.length !== 0) {
        // console.log("elements to remove : ", toDel);
        for (let i of toDel) {
          // console.log(`subelements of ${toDel} to remove :`,  i);
          n.domConnections.removeChild(i);
        }
      }
    } 
  }
}


const node1 = new Node("node1", [87, 70]);
const node2 = new Node("node2", [430, 276]);
const node3 = new Node("node3", [14, 394]);
const node4 = new Node("node4", [290, 613]);
const node5 = new Node("node5", [770, 408]);
const node6 = new Node("node6", [831, 51]);

var nodes = [node1, node2, node3, node4, node5, node6];

node1.getChildren(node2);
node3.getChildren(node2);
node4.getChildren(node2);
node2.getChildren(node5);
node6.getChildren(node2);
node4.getChildren(node5);

for (let n of nodes) {
  n.getParents();
  n.linkChildren();
  n.move(...n.initPos);
}

const initialNodesPos = [[87, 70], [430, 276], [14, 394], [290, 613], [770, 408], [831, 51]];


