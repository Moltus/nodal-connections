
class Node {
  constructor(id, initialPosition, text=undefined, color=undefined) {
    console.log('text argument is : ', text);
    this.id = id;
    // this.domElement = document.getElementById(this.id);
    this.text = text || this.id;
    this.domElement = this.createElements();
    // console.log("domElement is : ", this.domElement);
    this.initPos = initialPosition;
    this.color = color || this.getColor();
    this.type = 'node';
    this.domConnections = document.getElementById((this.id + '__connections'));
    this.children = [];
    this.parents = [];
    this.bbox = this.domElement.getBoundingClientRect();
    this.animation = false;
  }

  createElements() {
    let container = document.createElement('div');
    container.className = 'node-container';
    document.getElementById("wrapper").appendChild(container);

    let nodeElement = document.createElement('div');
    nodeElement.className = 'node';
    nodeElement.id = this.id;
    console.log("text is : ", this.text);
    
    for (let i of this.text) {
      let para = document.createElement("p");
      let txt = document.createTextNode(i);
      para.appendChild(txt);
      nodeElement.appendChild(para); 
    }

    container.appendChild(nodeElement);

    // connections div to append plugs, links, arrows with linkchild
    let connections = document.createElement('div');
    connections.className = 'connections';
    connections.id = this.id + '__connections';
    container.appendChild(connections);

    return nodeElement;
  }

  getColor() {
    let color = 'rgb(' + (Math.floor(Math.random() * 30) + 50)
      + ',' + (Math.floor(Math.random() * 30) + 50)
      + ',' + (Math.floor(Math.random() * 30) + 50) + ')';
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
    let color = 'rgb(' + (Math.floor(Math.random() * 30) + 50)
      + ',' + (Math.floor(Math.random() * 30) + 50)
      + ',' + (Math.floor(Math.random() * 30) + 50) + ')';
    let bg = document.getElementById(this.id + '__bg');
    bg.style.fill = color;
    return color;
  }

  createElements() {
  
    let container = document.createElement('div');
    container.className = 'node-container';
    document.getElementById("wrapper").appendChild(container);

    // create svg and all subelements using .createElementNS
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttributeNS(null, "viewBow", "0 0 90 90");
    svg.setAttributeNS(null, "class", "badge");
    svg.id = this.id;
    container.appendChild(svg);

    // background shape
    let bg = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    bg.setAttributeNS(null, "class", "badge__bg");
    bg.id = this.id + "__bg";
    let d = "M45,1C20.7,1,1,20.7,1,45s19.6,44,44,44s44-19.6,44-44S69.3,1,45,1z M45,60.3 c-8.5,0-15.3-6.9-15.3-15.3S36.5,29.7,45,29.7S60.3,36.5,60.3,45S53.5,60.3,45,60.3z";
    bg.setAttributeNS(null, "d", d);
    svg.appendChild(bg);

    // text path shape
    let path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    path.setAttributeNS(null, "class", "badge__path");
    path.id = this.id + "__path";
    d = "M63.9,29.1c8.7,10.5,7.3,26.2-3.1,34.9s-26.2,7.3-34.9-3.1S18.6,34.7,29,26 S55.3,18.6,63.9,29.1z";
    path.setAttributeNS(null, "d", d);
    svg.appendChild(path);

    // text from constructor arg
    let svgTxt = document.createElementNS("http://www.w3.org/2000/svg", 'text');
    svgTxt.setAttributeNS(null, "class", "badge__text");
    svg.appendChild(svgTxt);
    let txtPath = document.createElementNS("http://www.w3.org/2000/svg", 'textPath');
    let pathXlink = '#' + this.id + '__path';
    txtPath.setAttributeNS('http://www.w3.org/1999/xlink', 'href', pathXlink);
    txtPath.textContent = this.text;
    svgTxt.appendChild(txtPath);

    // connections div to append plugs, links, arrows with linkchild
    let connections = document.createElement('div');
    connections.className = 'connections';
    connections.id = this.id + '__connections';
    container.appendChild(connections);

    return svg;
  }  
}



