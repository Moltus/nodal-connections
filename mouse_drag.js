// drag and drop elements

let offset = [0, 0];
let dragTarget ;
let isDown = false;

document.addEventListener('mousedown', function (e) {
  dragTarget = e.target;
  console.log(dragTarget);
  console.log(content1);
  isDown = true;
  offset = [
    dragTarget.offsetLeft - e.clientX,
    dragTarget.offsetTop - e.clientY
  ];
}, true);

document.addEventListener('mouseup', function () {
  isDown = false;
}, true);

document.addEventListener('mousemove', function (e) {
  event.preventDefault();
  if (isDown) {
    dragTarget.style.left = (e.clientX + offset[0]) + 'px';
    dragTarget.style.top = (e.clientY + offset[1]) + 'px';
    deleteLinks(dragTarget, content2);
    linkElements(dragTarget, content2);
  }
}, true);