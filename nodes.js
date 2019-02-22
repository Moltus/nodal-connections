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

    console.log('les positions x,y :', plug1_posX, plug1_posY, plug2_posX, plug2_posY);

    if (plug1_posY >= plug2_posY) {
      console.log('les positions x,y après :', plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      // create links
      createLinks(element1, 'topLeft',
      plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      createLinks(element2, 'bottomRight',
      plug1_posX, plug1_posY, plug2_posX, plug2_posY);
    } else {
      // create links
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
      createLinks(element1, 'topRight',
      plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      createLinks(element2, 'bottomLeft',
      plug1_posX, plug1_posY, plug2_posX, plug2_posY);
    } else {
      // create links
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

function createLinks(element, direction, plug1_X, plug1_Y, plug2_X, plug2_Y) {
  console.log('creating links', element, direction, plug1_X, plug1_Y, plug2_X, plug2_Y);
  let height;
  let width;
  let link1 = document.createElement('div');
  element.appendChild(link1);
  let link2 = document.createElement('div');
  element.appendChild(link2);
  if (direction === 'topLeft') {
    height = plug1_Y - plug2_Y;
    console.log('height: ', height);
    width = plug2_X - plug1_X;
    console.log('width ', width);
    link1.className = 'topright';
    link1.style.left = plug1_X + 'px';
    link1.style.top = plug1_Y + 'px';
    link1.style.width = width * .1 + 'px';
    link1.style.height = height / 4 + 'px';
  }

}


linkElements(content1, content2);
linkElements(content3, content4);