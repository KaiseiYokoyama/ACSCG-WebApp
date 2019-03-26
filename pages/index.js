document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.collapsible.expandable');
  const instances = M.Collapsible.init(elems, {
    accordion: false,
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.datepicker');
  const instances = M.Datepicker.init(elems, {
  });
});

function setTitle(elem,keycode) {
  if(13 === keycode) {
    let title = elem.value;
    while(elem.tagName!=='LI') {
      elem = elem.parentElement;
    }
    elem.querySelector('.collapsible-header span.title').innerHTML = title;
  }
}

// elem: Dateを示すtd
function selectDate(elem) {
  let span = elem.querySelector('span');
  if (elem.classList.contains('selected')) {
    elem.classList.remove('selected');
    span.classList.remove('circled');
  } else {
    elem.classList.add('selected');
    span.classList.add('circled');
  }
}

function selectColor(elem) {
  const children = elem.parentElement.children;
  for (let index = 0; index < children.length; index++) {
    const element = children[index];
    element.innerHTML = '';
    element.classList.remove('selected');
  }
  const color = window.getComputedStyle(elem).backgroundColor;
  console.log(color);

  elem.innerHTML = '<i class="material-icons">done</i>selected';
  elem.classList.add('selected');
  while(elem.tagName!=='LI') {
    elem = elem.parentElement;
  }
  elem.querySelector('.collapsible-header span.circled').style.backgroundColor = color;
}

function shadowOnOff(elem){
  console.log(elem);
  while(elem.tagName!=='LI') {
    elem = elem.parentElement;
  }
  elem = elem.querySelector('.collapsible-header span.circled');
  if (elem.classList.contains('z-depth-2')) {
    elem.classList.remove('z-depth-2');
  } else {
    elem.classList.add('z-depth-2');
  }
}