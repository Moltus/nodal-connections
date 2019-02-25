
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
    console.log('getChildren targets :', targets);
    for (let i = 0; i < targets.length; i++) {
      this.children.push(targets[i]); 
    }
    this.linkChildren();
  }

  getParents()

  linkChildren(){
    for (let n of this.children) this.linkChild(n);
  }

  linkChild(child) {
    console.log('linking a child : ', child);
  // declare connection origins positions for assigning them later
    let plug1_posX;
    let plug1_posY;
    let plug2_posX;
    let plug2_posY;
    // TODO : maybe change the object bbox to a local one here ?
    let elem1Bbox = this.element.getBoundingClientRect();
    let childBbox = child.getBoundingClientRect();
    let elem1VMid = (elem1Bbox.bottom + elem1Bbox.top) / 2;
    let elem2VMid = (childBbox.bottom + childBbox.top) / 2;

    if (elem1Bbox.left <= childBbox.left) {
      // get X and Y positions for origins if elem1 is left of elem2
      plug1_posX = this.element.clientLeft + this.element.clientWidth - 1;
      plug1_posY = this.element.clientTop + this.element.clientHeight / 2;
      plug2_posX = child.clientLeft - 1;
      plug2_posY = child.clientTop + child.clientHeight / 2;
      
      
      if (elem1Bbox.top >= childBbox.top) {
        // create links
        let width = childBbox.left - elem1Bbox.right + 2;
        let height = elem1VMid - elem2VMid;
        this.createLinks(this.element, child, 'bottom-right', plug1_posX, plug1_posY,width, height);
        this.createLinks(child, this.element, 'top-left', plug2_posX, plug2_posY, width, height);
        this.createArrow(this.element, child, plug1_posX + width / 2,
          plug1_posY - height / 2, 'up');
      } else {
        // create links
        let width = childBbox.left - elem1Bbox.right + 2;
        let height = elem2VMid - elem1VMid;
        this.createLinks(this.element, child, 'top-right',
          plug1_posX, plug1_posY, width, height);
        this.createLinks(child, this.element, 'bottom-left',
          plug2_posX, plug2_posY, width, height);
        this.createArrow(this.element, child,  plug1_posX + width / 2,
          plug1_posY + height / 2, 'down');
      }
      // create plugs after so they appear on top
      this.createPlug(this.element, plug1_posX, plug1_posY);
      this.createPlug(child, plug2_posX, plug2_posY);
    } else {
      // get X and Y positions for origins if elem1 is right of elem2
      plug1_posX = this.element.clientLeft - 1;
      plug1_posY = this.element.clientTop + this.element.clientHeight / 2;
      plug2_posX = child.clientLeft + child.clientWidth;
      plug2_posY = child.clientTop + child.clientHeight / 2;
      

      if (elem1Bbox.top >= childBbox.top) {
        // create links
        let width = elem1Bbox.left - childBbox.right + 2;
        let height = elem1VMid - elem2VMid;
        this.createLinks(this.element, child, 'bottom-left',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        this.createLinks(child, this.element, 'top-right',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        this.createArrow(this.element, child,  plug1_posX + width / 2,
          plug1_posY - height / 2, 'up');
      } else {
        // create links
        let width = elem1Bbox.left - childBbox.right + 2;
        let height = elem2VMid - elem1VMid;
        this.createLinks(this.element, child, 'top-left',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        this.createLinks(child, this.element, 'bottom-right',
          plug1_posX, plug1_posY, plug2_posX, plug2_posY);
        this.createArrow(this.element, child,  plug1_posX + width / 2,
          plug1_posY + height / 2, 'down');
      }
      // create plugs after so they appear on top
      this.createPlug(this.element, plug1_posX, plug1_posY);
      this.createPlug(child, plug2_posX, plug2_posY);
    }
  }

  createPlug(element, x, y) {

    let plug = document.createElement('div');
    element.appendChild(plug);
    plug.className = 'plug';
    plug.style.left = x - 5 + 'px';
    plug.style.top = y - 5 + 'px';
  }

  createArrow(element1, element2, x, y, direction) {
    let arrow = document.createElement('div');
    arrow.classList.add('arrow');
    arrow.classList.add('arrow__' + element1.id + '-' + element2.id);
    element1.appendChild(arrow);
    if (direction === 'up') {
      arrow.classList.add('arrow--up');
    } else if (direction === 'down') {
      arrow.classList.add('arrow--down');
    }
    arrow.style.left = x - 5 + 'px';
    arrow.style.top = y - 5 + 'px';
  }

  createLinks(element1, element2, direction, plugX, plugY, width, height) {
    let link = document.createElement('div');
    element1.appendChild(link);
    link.classList.add('link');
    // TODO : update this class add with correct ids.
    link.classList.add('link__' + element1.id + '-' + element2.id);

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
      var toDel = n.element.querySelectorAll(`[class*=${this.id}]`);
      if (toDel.length !== 0) {
        console.log("elements to remove : ", toDel);
        for (let i of toDel) {
          console.log(`subelements of ${toDel} to remove :`,  i);
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

node1.getChildren(node2.element);
node3.getChildren(node2.element);
node4.getChildren(node2.element);
node2.getChildren(node5.element);
node6.getChildren(node2.element);
node4.getChildren(node5.element);


// for (let i of nodes) console.log(i);

