
class Node {
  constructor(id, color=undefined) {
    this.id = id;
    this.element = document.getElementById(id);
    this.color = (color || 'rgb(' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50) + ')');
    this.element.style.backgroundColor = this.color;
    this.children = [];
    this.parents = [];
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
    for (let child of this.children) this.linkChild(child.element);
  }

  linkParents(){
    // console.log("parents are : ", this.parents);
    for (let parent of this.parents) {
      // console.log("parent : ", parent);
      parent.linkChild(this.element);
    }
  }

  linkChild(child) {
    let parent = this.element;
    // console.log('parent : ' , parent, 'linking a child : ', child);
  // declare connection origins positions for assigning them later
    let plug1_posX;
    let plug1_posY;
    let plug2_posX;
    let plug2_posY;
    // TODO : maybe change the object bbox to a local one here ?
    let parentBbox = parent.getBoundingClientRect();
    let childBbox = child.getBoundingClientRect();
    let parentVMid = (parentBbox.bottom + parentBbox.top) / 2;
    let childVMid = (childBbox.bottom + childBbox.top) / 2;
    let parentHMid = (parentBbox.left + parentBbox.right) / 2;
    let childHMid = (childBbox.left + childBbox.right) / 2;

    if (parentBbox.right < childBbox.left) {
      let width = childBbox.left - parentBbox.right + 2;
      // get X and Y positions for origins if parent is left of child
      plug1_posX = parent.clientLeft + parent.clientWidth - 1;
      plug1_posY = parent.clientTop + parent.clientHeight / 2;
      plug2_posX = child.clientLeft - 1;
      plug2_posY = child.clientTop + child.clientHeight / 2;
      
      
      if (parentVMid >= childVMid) {
        // create links
        
        let height = parentVMid - childVMid;
        this.createLinks(parent, child, 'bottom-right', plug1_posX, plug1_posY,width, height);
        this.createLinks(child, parent, 'top-left', plug2_posX, plug2_posY, width, height);
        this.createArrow(parent, child, plug1_posX + width / 2,
          plug1_posY - height / 2, 'up');
      } else {
        // create links
        let height = childVMid - parentVMid;
        this.createLinks(parent, child, 'top-right',
          plug1_posX, plug1_posY, width, height);
        this.createLinks(child, parent, 'bottom-left',
          plug2_posX, plug2_posY, width, height);
        this.createArrow(parent, child,  plug1_posX + width / 2,
          plug1_posY + height / 2, 'down');
      }
      // create plugs after so they appear on top
      this.createPlug(parent, child, plug1_posX, plug1_posY);
      this.createPlug(child, parent, plug2_posX, plug2_posY);

    } else if (parentBbox.left > childBbox.right)  {
      let width = parentBbox.left - childBbox.right + 2;
      // get X and Y positions for origins if parent is right of child
      plug1_posX = parent.clientLeft - 1;
      plug1_posY = parent.clientTop + parent.clientHeight / 2;
      plug2_posX = child.clientLeft + child.clientWidth - 1;
      plug2_posY = child.clientTop + child.clientHeight / 2;
      

      if (parentVMid >= childVMid) {
        // create links
        
        let height = parentVMid - childVMid;
        this.createLinks(parent, child, 'bottom-left',
          plug1_posX, plug1_posY, width, height);
        this.createLinks(child, parent, 'top-right',
          plug2_posX, plug2_posY, width, height);
        this.createArrow(parent, child,  plug1_posX - width / 2,
          plug1_posY - height / 2, 'up');
      } else {
        // create links
        let height = childVMid - parentVMid;
        this.createLinks(parent, child, 'top-left',
          plug1_posX, plug1_posY, width, height);
        this.createLinks(child, parent, 'bottom-right',
          plug2_posX, plug2_posY, width, height);
        this.createArrow(parent, child,  plug1_posX - width / 2,
          plug1_posY + height / 2, 'down');
      }
      // create plugs after so they appear on top
      this.createPlug(parent, child, plug1_posX, plug1_posY);
      this.createPlug(child, parent, plug2_posX, plug2_posY);

    } else if ((parentBbox.right >= childBbox.left) && (parentBbox.right <= childBbox.right)) {
      // console.log("directly under");
      let width = childHMid - parentHMid;
      plug1_posX = (parent.clientLeft + parent.clientWidth) / 2;
      plug2_posX = (child.clientLeft + child.clientWidth) / 2;
      
      if (parentVMid >= childVMid) {
        plug1_posY = parent.clientTop - 1;
        plug2_posY = child.clientTop + child.clientHeight - 1;
       
        // create links
        let height = parentBbox.top - childBbox.bottom + 2;
        this.createLinks(parent, child, 'top-left',
          plug1_posX + width / 2, plug1_posY - height / 2, width, height);
        this.createLinks(child, parent, 'bottom-right',
          plug2_posX - width / 2, plug2_posY + height / 2, width, height);
        this.createArrow(parent, child, plug1_posX + width / 2,
          plug1_posY - height / 2, 'right');
        // create plugs after so they appear on top
        this.createPlug(parent, child, plug1_posX, plug1_posY);
        this.createPlug(child, parent, plug2_posX, plug2_posY);

      } else {
        plug1_posY = parent.clientTop + parent.clientHeight;
        plug2_posY = child.clientTop;
        // create links
        let height = childBbox.top - parentBbox.bottom + 2;
        this.createLinks(parent, child, 'bottom-left',
          plug1_posX + width / 2, plug1_posY + height / 2, width, height);
        this.createLinks(child, parent, 'top-right',
          plug2_posX - width / 2, plug2_posY - height / 2, width, height);
        this.createArrow(parent, child, plug1_posX + width / 2,
          plug1_posY + height / 2, 'right');
        // create plugs after so they appear on top
        this.createPlug(parent, child, plug1_posX, plug1_posY);
        this.createPlug(child, parent, plug2_posX, plug2_posY);
      }
      
    }
  }

  createPlug(element1, element2, x, y) {

    let plug = document.createElement('div');
    element1.appendChild(plug);
    plug.className = 'plug';
    plug.classList.add('plug__' + element1.id + '-' + element2.id)
    plug.style.left = x - 5 + 'px';
    plug.style.top = y - 5 + 'px';
  }

  createArrow(element1, element2, x, y, direction) {
    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    arrow.classList.add('arrow__' + element1.id + '-' + element2.id);
    element1.appendChild(arrow);
    arrow.classList.add('arrow--' + direction);
    arrow.style.left = x - 5 + 'px';
    arrow.style.top = y - 5 + 'px';
  }

  createLinks(element1, element2, direction, plugX, plugY, width, height) {
    let link = document.createElement('div');
    element1.appendChild(link);
    link.classList.add('link');
    // TODO : update this class add with correct ids.
    link.classList.add('link__' + element1.id + '-' + element2.id);
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px';

    if (direction === 'top-right') {
      // link has opposite borders horizontally
      link.classList.add('link--top-right');
      link.style.left = plugX + 'px';
      link.style.top = plugY + 'px';
      
    } else if (direction === 'top-left') {
      link.classList.add('link--top-left');
      link.style.left = plugX - width / 2 + 'px';
      link.style.top = plugY + 'px';
    
    } else if (direction === 'bottom-right') {
      link.classList.add('link--bottom-right');
      link.style.left = plugX + 'px';
      link.style.top = plugY - height / 2 + 'px';
      
    } else if (direction === 'bottom-left') {
      link.classList.add('link--bottom-left');
      link.style.left = plugX - width / 2 + 'px';
      link.style.top = plugY - height / 2 + 'px';
      
    }
  }

  deleteLinks() {
    // while (this.element.childNodes[1]) {
    //   this.element.removeChild(this.element.childNodes[1]);
    // }

    // for (let n of this.children) {
    //   console.log('iterate through children : ', n);
    //   while (n.childNodes[1]) {
    //     n.removeChild(n.childNodes[1]);
    //   }
    for (let n of nodes) {
      let toDel = n.element.querySelectorAll(`[class*=${this.id}]`);
      if (toDel.length !== 0) {
        // console.log("elements to remove : ", toDel);
        for (let i of toDel) {
          // console.log(`subelements of ${toDel} to remove :`,  i);
          n.element.removeChild(i);
        }
      }
    } 
  }
}


const node1 = new Node("node1");
const node2 = new Node("node2");
const node3 = new Node("node3");
const node4 = new Node("node4");
const node5 = new Node("node5");
const node6 = new Node("node6");

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
}

// for (let i of nodes) console.log(i);

