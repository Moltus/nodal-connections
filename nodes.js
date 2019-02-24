

class Node {
  constructor(id, color=undefined) {
    this.id = id;
    this.element = document.getElementById(id);
    this.bbox = this.element.getBoundingClientRect()
    // let red = Math.floor(Math.random()*50) + 50;
    // let green = Math.floor(Math.random()*50) + 50;
    // let red = Math.floor(Math.random()*50) + 50;
    this.color = (color || 'rgb(' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50)
      + ',' + (Math.floor(Math.random() * 50) + 50) + ')');
    this.element.style.backgroundColor = this.color;
    this.children = [];
    this.parents = [];
  }

  getChildren(targets) {
    for (let i = 0; i < targets.length; i++) this.children.push(value); 
  }

  linkChild(child) {
  // declare connection origins positions for assigning them later
    let plug1_posX;
    let plug1_posY;
    let plug2_posX;
    let plug2_posY;
    // TODO : maybe change the object bbox to a local one here ?
    let childBbox = child.getBoundingClientRect();
    let elem1VMid = (this.bbox.bottom + this.bbox.top) / 2;
    let elem2VMid = (childBbox.bottom + childBbox.top) / 2;

    if (this.bbox.left <= childBbox.left) {
      // get X and Y positions for origins if elem1 is left of elem2
      plug1_posX = this.element.clientLeft + this.element.clientWidth - 1;
      plug1_posY = this.element.clientTop + this.element.clientHeight / 2;
      plug2_posX = child.clientLeft - 1;
      plug2_posY = child.clientTop + child.clientHeight / 2;
      
      
      if (this.bbox.top >= childBbox.top) {
        // create links
        width = childBbox.left - this.bbox.right + 2;
        height = elem1VMid - elem2VMid;
        createLinks(this.element, child, 'bottom-right', plug1_posX, plug1_posY, width, height);
        createLinks(child, this.element, 'top-left', plug2_posX, plug2_posY, width, height);
        createArrow(this.element, plug1_posX + width / 2,
          plug1_posY - height / 2, 'up');
      } else {
        // create links
        width = childBbox.left - this.bbox.right + 2;
        height = elem2VMid - elem1VMid;
        createLinks(this.element, child, 'top-right',
          plug1_posX, plug1_posY, width, height);
        createLinks(child, this.element, 'bottom-left',
          plug2_posX, plug2_posY, width, height);
        createArrow(this.element, plug1_posX + width / 2,
          plug1_posY + height / 2, 'down');
      }
      // create plugs after so they appear on top
      createPlug(this.element, plug1_posX, plug1_posY);
      createPlug(child, plug2_posX, plug2_posY);
    } else {
      // get X and Y positions for origins if elem1 is right of elem2
      plug1_posX = this.element.clientLeft - 1;
      plug1_posY = this.element.clientTop + this.element.clientHeight / 2;
      plug2_posX = child.clientLeft + child.clientWidth;
      plug2_posY = child.clientTop + child.clientHeight / 2;
      

      if (this.bbox.top >= childBbox.top) {
        // create links
        width = this.bbox.left - childBbox.right + 2;
        height = elem1VMid - elem2VMid;
        createLinks(this.element, child, 'bottom-left',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        createLinks(child, this.element, 'top-right',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        createArrow(this.element, plug1_posX + width / 2,
          plug1_posY - height / 2, 'up');
      } else {
        // create links
        width = this.bbox.left - childBbox.right + 2;
        height = elem2VMid - elem1VMid;
        createLinks(this.element, child, 'top-left',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        createLinks(child, this.element, 'bottom-right',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        createArrow(this.element, plug1_posX + width / 2,
          plug1_posY + height / 2, 'down');
      }
      // create plugs after so they appear on top
      createPlug(this.element, plug1_posX, plug1_posY);
      createPlug(child, plug2_posX, plug2_posY);
    }
  }

  createPlug(element, x, y) {

    let plug = document.createElement('div');
    element.appendChild(plug);
    plug.className = 'plug';
    plug.style.left = x - 5 + 'px';
    plug.style.top = y - 5 + 'px';
  }

  createArrow(element, x, y, direction) {
    let arrow = document.createElement('div');
    element.appendChild(arrow);
    if (direction === 'up') {
      arrow.className = 'arrow-up';
    } else if (direction === 'down') {
      arrow.className = 'arrow-down';
    }
    arrow.style.left = x - 5 + 'px';
    arrow.style.top = y - 5 + 'px';
  }

  createLinks(child, direction, plugX, plugY, width, height) {
    let link = document.createElement('div');
    this.element.appendChild(link);
    link.classList.add('link');
    link.classList.add('link__' + this.id + '-' + child.id);

    if (direction === 'top-right') {
      // link has opposite borders horizontally
      link.classList.add('link--top-right');
      link.style.left = plugX + 'px';
      link.style.top = plugY + 'px';
      link.style.width = width / 2 + 'px';
      link.style.height = height / 2 + 'px';
    } else if (direction === 'top-left') {
      link.classList.add('link--top-left');
      link.style.left = plugX - width / 2 + 'px';
      link.style.top = plugY + 'px';
      link.style.width = width / 2 + 'px';
      link.style.height = height / 2 + 'px'
    } else if (direction === 'bottom-right') {
      link.classList.add('link--bottom-right');
      link.style.left = plugX + 'px';
      link.style.top = plugY - height / 2 + 'px';
      link.style.width = width / 2 + 'px';
      link.style.height = height / 2 + 'px';
    } else if (direction === 'bottom-left') {
      link.classList.add('link--bottom-left');
      link.style.left = plugX - width / 2 + 'px';
      link.style.top = plugY - height / 2 + 'px';
      link.style.width = width / 2 + 'px';
      link.style.height = height / 2 + 'px'
    }
  }

  deleteLinks(element1, element2) {
    while (element1.childNodes[1]) element1.removeChild(element1.childNodes[1]);
    while (element2.childNodes[1]) element2.removeChild(element2.childNodes[1]);
  }
}

  const node1 = new Node("node1");
  const node2 = new Node("node2");
  const node3 = new Node("node3");
  const node4 = new Node("node4");
  const node5 = new Node("node5");
  const node6 = new Node("node6");

  node1.getChildren(node2);
  node3.getChildren(node2);
  node4.getChildren(node2);
  node2.getChildren(node5);
  node6.getChildren(node2);
  node4.getChildren(node5);

