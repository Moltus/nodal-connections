// drag and drop elements
// const nodes = document.getElementsByClassName('node');
let offset = [0, 0];
let dragTarget;
let targetNodeObj;
let isDown = false;

function dragStart(e) {
  dragTarget = e.target;
  // TODO maybe check if it's really a node with classList.contains ?
  dragTarget.style.zIndex = "100";
  // console.log('dragTarget : ', dragTarget);
  for (let n of nodes) if (n.element === dragTarget) targetNodeObj = n;
  // console.log('did we find the node obj ? : ', targetNodeObj);
  isDown = true;
  offset = [
    dragTarget.offsetLeft - e.clientX,
    dragTarget.offsetTop - e.clientY
  ];
}

function drag(e) {
  event.preventDefault();
  if (isDown) {
    dragTarget.style.left = (e.clientX + offset[0]) + 'px';
    dragTarget.style.top = (e.clientY + offset[1]) + 'px';
    targetNodeObj.deleteLinks();
    targetNodeObj.linkParents();
    targetNodeObj.linkChildren();
  }
}

function dragLeave(e) {
  dragTarget.style.zIndex = "10";
  isDown = false;
}

for (let node of nodes){
  // console.log(nodes[i]);
  node.element.addEventListener('mousedown', dragStart, true);
  node.element.addEventListener('mouseup', dragLeave, true);
  node.element.addEventListener('mousemove', drag, true);
}


// document.addEventListener('mousedown', function (e) {
  
// }, true);

// document.addEventListener('mouseup', function () {
  
// }, true);

// document.addEventListener('mousemove', function (e) {
  
// }, true);