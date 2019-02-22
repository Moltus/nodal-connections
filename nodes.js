const content1 = document.getElementById("content1");
const content2 = document.getElementById("content2");
const content3 = document.getElementById("content3");
const content4 = document.getElementById("content4");

function linkElements(element1, element2) {
  // declare connection origins positions for assigning them later
  let plug1_posX;
  let plug1_posY;
  let plug2_posX;
  let plug2_posY;

  const elem1Info = element1.getBoundingClientRect();
  console.log('elem1Info : ', elem1Info);
  const elem2Info = element2.getBoundingClientRect();
  console.log('elem2Info : ', elem2Info);

  if (elem1Info.left <= elem2Info.left) {
    // get X and Y positions for origins if elem1 is left of elem2
    plug1_posX = element1.clientLeft + element1.clientWidth - 1;
    plug1_posY = element1.clientTop + element1.clientHeight / 2;
    plug2_posX = element2.clientLeft - 1;
    plug2_posY = element2.clientTop + element2.clientHeight / 2;
    
    
    console.log('plug positions : ', plug1_posX, plug1_posY, plug2_posX, plug2_posY)
    if (elem1Info.top >= elem2Info.top) {
      // create links
      width = elem2Info.left - elem1Info.right + 2;
      height = elem1Info.top - elem2Info.top;
      createLinks(element1, 'bottom-right', plug1_posX, plug1_posY, width, height);
      createLinks(element2, 'top-left', plug2_posX, plug2_posY, width, height);
      createArrow(element1, plug1_posX + width / 2,
        plug1_posY - height / 2, 'up');
    } else {
      // create links
      width = elem2Info.left - elem1Info.right + 2;
      height = elem2Info.top - elem1Info.top;
      createLinks(element1, 'top-right',
        plug1_posX, plug1_posY, width, height);
      createLinks(element2, 'bottom-left',
        plug2_posX, plug2_posY, width, height);
      createArrow(element1, plug1_posX + width / 2,
        plug1_posY + height / 2, 'down');
    }
    // create plugs after so they appear on top
    createPlug(element1, plug1_posX, plug1_posY);
    createPlug(element2, plug2_posX, plug2_posY);
  } else {
    // get X and Y positions for origins if elem1 is right of elem2
    plug1_posX = element1.clientLeft;
    plug1_posY = element1.clientTop + element1.clientHeight / 2;
    plug2_posX = element2.clientLeft + element2.clientWidth;
    plug2_posY = element2.clientTop + element2.clientHeight / 2;
    

    if (elem1Info.top >= elem2Info.top) {
      // create links
      width = elem1Info.left - elem2Info.right + 2;
      height = elem2Info.top - elem1Info.top;
      createLinks(element1, 'bottom-left',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      createLinks(element2, 'top-right',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
    } else {
      // create links
      width = elem1Info.left - elem2Info.right + 2;
      height = elem1Info.top - elem2Info.top;
      createLinks(element1, 'top-left',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
      createLinks(element2, 'bottom-right',
        plug1_posX, plug1_posY, plug2_posX, plug2_posY);
    }
    // create plugs after so they appear on top
    createPlug(element1, 'right');
    createPlug(element2, 'left');
  }
}

function createPlug(element, x, y) {

  let plug = document.createElement('div');
  element.appendChild(plug);
  plug.className = 'plug';
  plug.style.left = x - 5 + 'px';
  plug.style.top = y - 5 + 'px';
}

function createArrow(element, x, y, direction) {
  // console.log('create arrow avec : ', element, x, y, direction);
  let arrow = document.createElement('div');
  element.appendChild(arrow);
  if (direction === 'up') {
    arrow.className = 'arrow-up';
  } else if (direction === 'down') {
    arrow.className = 'arrow-down';
  }
  arrow.style.left = x - 5 + 'px';
  arrow.style.top = y - 5 + 'px';
}

function createLinks(element, direction, plugX, plugY, width, height) {
  // console.log('arguments : ', element, direction, plugX, plugY, width, height);
  let link = document.createElement('div');
  element.appendChild(link);

  if (direction === 'top-right') {
    // link has opposite borders horizontally
    link.className = 'link';
    link.className = 'top-right';
    link.style.left = plugX + 'px';
    link.style.top = plugY + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px';
  } else if (direction === 'top-left') {
    link.className = 'link';
    link.className = 'top-left';
    link.style.left = plugX - width / 2 + 'px';
    link.style.top = plugY + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px'
  } else if (direction === 'bottom-right') {
    link.className = 'link';
    link.className = 'bottom-right';
    link.style.left = plugX + 'px';
    link.style.top = plugY - height / 2 + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px';
  } else if (direction === 'bottom-left') {
    link.className = 'link';
    link.className = 'bottom-left';
    link.style.left = plugX - width / 2 + 'px';
    link.style.top = plugY - height / 2 + 'px';
    link.style.width = width / 2 + 'px';
    link.style.height = height / 2 + 'px'
  }
}

function deleteLinks(element1, element2) {
  console.log('element1 last child :', element1.lastElementChild);
  let divs = document.getElementsByTagName('div');
  console.log(divs);
  while (divs[0]) divs[0].element1.removeChild(divs[0]);
}


linkElements(content1, content2);
linkElements(content3, content2);
linkElements(content4, content2);

