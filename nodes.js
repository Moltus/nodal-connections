
class Node {
  constructor(id, initialPosition, color=undefined) {
    this.id = id;
    this.domElement = document.getElementById(this.id);
    // console.log("domElement is : ", this.domElement);
    this.initPos = initialPosition;
    this.color = (color || this.getColor());
    this.type = 'node';
    this.domConnections = document.getElementById((this.id + '__connections'));
    this.children = [];
    this.parents = [];
    this.bbox = this.domElement.getBoundingClientRect();
    this.animation = false;
  }

  getColor() {
    let color = 'rgb(' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50) + ')';
    this.domElement.style.backgroundColor = color;
    return color;
  }

  getChildren(...targets) {
    // method for adding children to the node.children property
    for (let i of targets) {
      this.children.push(i); 
    }
  }

  getParents() {
    // method for adding parents to the node.parents property
    for (let n of nodes) {
      for (let i of n.children) {
        if (this == i) {
          this.parents.push(n);
        }
      }
    }
  }

  linkChildren(){
    // start creating links for all children in node.children array
    for (let child of this.children) this.linkChild(child);
  }

  linkParents(){
    // start creating links for all parents in node.parents array
    for (let parent of this.parents) parent.linkChild(this);
  }

  move(x, y, suffix='px', time=1000) {
    // manual animated movement for nodes
    // this temporarily disables drag and drop movement
    // default transition is 1sec
    this.animation = true;

    this.domElement.style.transition = 'all ' + time + 'ms';

    this.domElement.style.left = x + suffix;
    if (suffix === 'vw') suffix = 'vh';
    this.domElement.style.top = y + suffix;
    this.deleteLinks();

    let n = 0;
    let interval = setInterval(() => {
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

  linkChild(child) {
    let parent = this; // for readability
    let parentElem = parent.domElement;
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
    // if parent or child is a badge give him center coordinates for all situations
    if (parent.type == 'badge') {
      var centerPlug1_posX = parentHMid;
      var centerPlug1_posY = parentVMid;
    }
    if (child.type == 'badge') {
      var centerPlug2_posX = childHMid;
      var centerPlug2_posY = childVMid;
    }
    
    // declare width (X distance between plug 1 and 2)
    // declare height (Y distance between plug 1 and 2)
    // declare arrow direction (from parent to child or child to parent)
    let width;
    let height;
    let arrow = (parent.type == 'node' && child.type == 'node')? true : false;
    let arrowDir;
    
    if (parentBbox.right < childBbox.left) {
      // parent is left of child
      plug1_posX = centerPlug1_posX || parentBbox.right - 1;
      plug1_posY = centerPlug1_posY || parentBbox.top + parentBbox.height / 2;
      plug2_posX = centerPlug2_posX || childBbox.left + 1;
      plug2_posY = centerPlug2_posY || childBbox.top + childBbox.height / 2;
      width = plug2_posX - plug1_posX;
      
      
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
      plug1_posX = centerPlug1_posX || parentBbox.left + 1;
      plug1_posY = centerPlug1_posY || parentBbox.top + parentBbox.height / 2;
      plug2_posX = centerPlug2_posX || childBbox.right - 1;
      plug2_posY = centerPlug2_posY || childBbox.top + childBbox.height / 2;
      width = plug1_posX - plug2_posX;
      

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
      plug1_posX = centerPlug1_posX || (parentBbox.right + parentBbox.left) / 2;
      plug2_posX = centerPlug2_posX || (childBbox.right + childBbox.left) / 2;
      
      if (parentBbox.top > childBbox.bottom) {
        // parent is under child
        plug1_posY = centerPlug1_posY || parentBbox.top + 1;
        plug2_posY = centerPlug2_posY || childBbox.bottom - 1;
        height = plug1_posY - plug2_posY;

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
        plug1_posY = centerPlug1_posY || parentBbox.bottom - 1;
        plug2_posY = centerPlug2_posY || childBbox.top + 1;
        // create links
        height = plug2_posY - plug1_posY;
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

    for (let n of nodes) {
      let toDel = n.domConnections.querySelectorAll(`[class*=${this.id}]`);
      if (toDel.length !== 0) {
        for (let i of toDel) {
          n.domConnections.removeChild(i);
        }
      }
    } 
  }
}

class Badge extends Node {
  constructor(id, initialPosition, color = undefined) {
    super(id, initialPosition, color);
    this.type = 'badge';
  }

  getColor() {
    let color = 'rgb(' + (Math.floor(Math.random() * 100) + 1)
      + ',' + (Math.floor(Math.random() * 100) + 1)
      + ',' + (Math.floor(Math.random() * 100) + 1) + ')';
    let bg = document.getElementById(this.id + '__bg');
    bg.style.fill = color;
    return color;
  }
}



