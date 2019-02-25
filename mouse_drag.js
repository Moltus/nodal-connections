// drag and drop elements
// const nodes = document.getElementsByClassName('node');
let offset = [0, 0];
let dragTarget;
let targetNodeObj;
let isDown = false;

function dragStart(e) {
  dragTarget = e.target;
  console.log('dragTarget : ', dragTarget);
  for (let n of nodes) if (n.element === dragTarget) targetNodeObj = n;
  console.log('did we find the node obj ? : ', targetNodeObj);
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
    targetNodeObj.linkChildren();
  }
}

function dragLeave(e) {
  isDown = false;
}

for (let i = 0; i < nodes.length; i++){
  // console.log(nodes[i]);
  nodes[i].element.addEventListener('mousedown', dragStart, true);
  nodes[i].element.addEventListener('mouseup', dragLeave, true);
  nodes[i].element.addEventListener('mousemove', drag, true);
}


// document.addEventListener('mousedown', function (e) {
  
// }, true);

// document.addEventListener('mouseup', function () {
  
// }, true);

// document.addEventListener('mousemove', function (e) {
  
// }, true);