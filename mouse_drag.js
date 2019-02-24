// drag and drop elements
const contents = document.getElementsByClassName('content');
console.log(contents);
let offset = [0, 0];
let dragTarget ;
let isDown = false;

function dragStart(e) {
  dragTarget = e.target;
  console.log(dragTarget);
  console.log(content1);
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
    deleteLinks(dragTarget, content2);
    linkElements(dragTarget, content2);
  }
}

function dragLeave(e) {
  isDown = false;
}

for (let i = 0; i < contents.length; i++){
  console.log(contents[i]);
  contents[i].addEventListener('mousedown', dragStart, true);
  contents[i].addEventListener('mouseup', dragLeave, true);
  contents[i].addEventListener('mousemove', drag, true);
}


// document.addEventListener('mousedown', function (e) {
  
// }, true);

// document.addEventListener('mouseup', function () {
  
// }, true);

// document.addEventListener('mousemove', function (e) {
  
// }, true);