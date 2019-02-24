// drag and drop elements
const nodes = document.getElementsByClassName('node');
console.log(nodes);
let offset = [0, 0];
let dragTarget ;
let isDown = false;

function dragStart(e) {
  dragTarget = e.target;
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
    deleteLinks(dragTarget, node2);
    linkElements(dragTarget, node2);
  }
}

function dragLeave(e) {
  isDown = false;
}

for (let i = 0; i < nodes.length; i++){
  console.log(nodes[i]);
  nodes[i].addEventListener('mousedown', dragStart, true);
  nodes[i].addEventListener('mouseup', dragLeave, true);
  nodes[i].addEventListener('mousemove', drag, true);
}


// document.addEventListener('mousedown', function (e) {
  
// }, true);

// document.addEventListener('mouseup', function () {
  
// }, true);

// document.addEventListener('mousemove', function (e) {
  
// }, true);