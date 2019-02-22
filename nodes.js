const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");

function linkElements(element1, element2) {
  // declare connection origins positions for assigning them later
  let plug1_posX;
  let plug1_posY;
  let plug2_posX;
  let plug2_posY;
  if (element1.offsetLeft <= element2.offsetLeft) {
    // get X and Y positions for origins if elem1 is left of elem2
    plug1_posX = element1.offsetLeft + element1.offsetWidth;
    plug1_posY = element1.offsetTop + element1.offsetHeight / 2;
    plug2_posX = element2.offsetLeft;
    plug2_posY = element2.offsetTop + element2.offsetHeight / 2;
    // create plugs
    createPlug(element1, plug1_posX, plug1_posY);
    createPlug(element2, plug2_posX, plug2_posY);

    if (plug1_posY >= plug2_posY) {
      // create links
      width = element2.getBoundingClientRect().left - element1.getBoundingClientRect().right;
      height = element2.getBoundingClientRect().top - element1.getBoundingClientRect().top;
      createLinks(element1, 'topLeft', plug1_posX, plug1_posY, width, height);
      createLinks(element2, 'bottomRight', plug2_posX, plug2_posY, width, height);
    } else {
      // create links
      width = element2.getBoundingClientRect().left - element1.getBoundingClientRect().right;
      height = element1.getBoundingClientRect().top - element2.getBoundingClientRect().top;
      createLinks(element1, 'bottomLeft',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      createLinks(element2, 'topRight',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
    }
  } else {
    // get X and Y positions for origins if elem1 is right of elem2
    plug1_posX = element1.offsetLeft;
    plug1_posY = element1.offsetTop + element1.offsetHeight / 2;
    plug2_posX = element2.offsetLeft + element2.offsetWidth;
    plug2_posY = element2.offsetTop + element2.offsetHeight / 2;
    // create plugs
    createPlug(element1, 'right');
    createPlug(element2, 'left');

    if (plug1_posY >= plug2_posY) {
      // create links
      width = element1.getBoundingClientRect().left - element2.getBoundingClientRect().right;
      height = element2.getBoundingClientRect().top - element1.getBoundingClientRect().top;
      createLinks(element1, 'topRight',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      createLinks(element2, 'bottomLeft',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
    } else {
      // create links
      width = element1.getBoundingClientRect().left - element2.getBoundingClientRect().right;
      height = element1.getBoundingClientRect().top - element2.getBoundingClientRect().top;
      createLinks(element1, 'bottomRight',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      createLinks(element2, 'topLeft',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
    }
  }
}

function createPlug(element, x, y) {

  let plug = document.createElement('div');
  element.appendChild(plug);
  plug.className = 'plug';
  plug.style.left = x - 6 + 'px';
  plug.style.top = y - 6 + 'px';
}

function createLinks(element, direction, plugX, plugY, width, height) {
  console.log('arguments : ', element, direction, plugX, plugY, width, height);
  let link = document.createElement('div');
  element.appendChild(link);

  if (direction === 'topLeft') {
    // link has opposite borders horizontally
    link.className = 'topright';
    link.style.left = plugX + 'px';
    link.style.top = plugY + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px';
  } else if (direction === 'topRight') {
    link.className = 'topleft';
    link.style.left = plugX - width / 2 + 'px';
    link.style.top = plugY + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px'
  } else if (direction === 'bottomLeft') {
    link.className = 'bottomright';
    link.style.left = plugX + 'px';
    link.style.top = plugY - height / 2 + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px';
  } else if (direction === 'bottomRight') {
    link.className = 'bottomleft';
    link.style.left = plugX - width / 2 + 'px';
    link.style.top = plugY - height / 2 + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px'
  }

}


linkElements(content1, content2);
linkElements(content3, content4);

console.log('MOU9AEZFROUIHAEFOIAEJF');