// drag and drop elements with 'mousedown' 'mousemove' and 'mouseup' events

// offset to initial position at 'mousedown'
let offset = [0, 0];
let dragTarget;
var targetNodeObj;
let isDown = false;
// node and badge DOM elements
var nodeElements = nodes.map(a => a.domElement);

function dragStart(e) {
  dragTarget = e.target;
  // console.log("drag target is : ", dragTarget);
  if (dragTarget !== this) return;
  if (nodeElements.includes(dragTarget)) {
    targetNodeObj = dragTarget;
  } else {
    return;
  }
  for (let n of nodes) if (n.domElement === dragTarget) targetNodeObj = n;
  if (targetNodeObj.animation) return;
  isDown = true;
  offset = [
    dragTarget.getBoundingClientRect().left - e.clientX,
    dragTarget.getBoundingClientRect().top - e.clientY
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
  isDown = false;
}

for (let node of nodeElements){
  node.addEventListener('mousedown', dragStart, true);
  node.addEventListener('mouseup', dragLeave, true);
  node.addEventListener('mousemove', drag, true);
}

