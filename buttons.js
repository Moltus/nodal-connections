document.getElementById("toggle-options").addEventListener('click', toggleOptions);
document.getElementById("random-pos").addEventListener('click', randomPositions);
document.getElementById("random-colors").addEventListener('click', randomColors);
document.getElementById("reset-pos").addEventListener('click', resetPositions);
document.getElementById("get-coords").addEventListener('click', getNodesCoords);

const options = document.getElementById('options');
const optionsBtn = document.getElementById('toggle-options');
function toggleOptions() {
  options.classList.toggle('active');
  optionsBtn.classList.toggle('active');
  optionsBtn.textContent = optionsBtn.classList.contains('active') ? "Hide Options" : "Show options";
}

function randomPositions() {
  for (let n of nodes) {
    if (n.animation) return;
    rndX = Math.floor(Math.random() * 75) + 1;
    rndY = Math.floor(Math.random() * 60) + 10;
    n.move(rndX, rndY, 'vw');
  }
}

function randomColors() {
  for (let n of nodes) {
    n.getColor();
  }
}

function resetPositions() {
  for (let n of nodes) {
    if (n.animation) return;
    n.move(...n.initPos);
  }
}

const infoCoords = document.getElementById('info-coords');
function getNodesCoords() {
  let infoText = '';
  if (targetNodeObj) {
    let coords = targetNodeObj.getCoords().map(Math.round);
    infoText = ` ${targetNodeObj.id}  x: ${coords[0]} y: ${coords[1]} `;
  } else infoText = "click on a node to get coordinates";
  infoCoords.textContent = infoText;
}