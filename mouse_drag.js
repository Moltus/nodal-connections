// drag and drop elements
// const nodes = document.getElementsByClassName('node');
let offset = [0, 0];
let dragTarget;
let targetNodeObj;
let isDown = false;
var nodeDivs = document.getElementsByClassName('node');
var linkDivs = document.getElementsByClassName('link');

function dragStart(e) {
  dragTarget = e.target;
  if (dragTarget !== this) return;
  // dragTarget.style.zIndex = "100";
  for (let n of nodes) if (n.domElement === dragTarget) targetNodeObj = n;
  if (targetNodeObj.animation) return;
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
  // dragTarget.style.zIndex = "10";
  isDown = false;
}

for (let node of nodeDivs){
  // console.log(nodes[i]);
  node.addEventListener('mousedown', dragStart, true);
  node.addEventListener('mouseup', dragLeave, true);
  node.addEventListener('mousemove', drag, true);
}


// document.addEventListener('mousedown', function (e) {
  
// }, true);

// document.addEventListener('mouseup', function () {
  
// }, true);

// document.addEventListener('mousemove', function (e) {
  
// }, true);