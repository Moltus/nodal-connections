document.getElementById("toggle-options").addEventListener('click', toggleOptions);
document.getElementById("random-pos").addEventListener('click', randomPositions);
document.getElementById("reset-pos").addEventListener('click', resetPositions);
document.getElementById("get-coords").addEventListener('click', getNodesCoords);

const options = document.getElementsByClassName('options');
const optionsBtn = document.getElementById('toggle-options');
function toggleOptions() {
  for (let i of options) i.classList.toggle('active');
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

function resetPositions() {
  for (let n of nodes) {
    if (n.animation) return;
    n.move(...n.initPos);
  }
}

const infoCoords = document.getElementById('infoCoords');
function getNodesCoords() {
  let infoText = '';
  for (let n of nodes) {
    let coords = n.getCoords().map(Math.round);
    infoText += `  ${n.id}  x: ${coords[0]} y: ${coords[1]} |`;
    console.log(infoText);
  }
  infoCoords.textContent = infoText;
}