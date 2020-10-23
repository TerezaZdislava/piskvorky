'use strict';

let natahu = 'circle';

const pole = document.querySelectorAll('.button');
for (let i = 0; i < pole.length; i++) {
  // funguje spravne
  pole[i].addEventListener('click', function (event) {
    zapisto(pole[i], event);
    zmenIkonku(ikonka);
  });

  // nefunguje
  // pole[i].addEventListener('click', zapisto(pole[i]));
}

const zapisto = (button, event) => {
  event.target.disabled = 'true';
  if (natahu === 'circle') {
    button.classList.remove('board__field--cross');
    button.classList.add('board__field--circle');
    natahu = 'cross';
  } else {
    button.classList.remove('board__field--circle');
    button.classList.add('board__field--cross');
    natahu = 'circle';
  }
};

let ikonka = document.querySelector('.ikonka');

const zmenIkonku = (ikonka) => {
  if (natahu === 'circle') {
    ikonka.classList.remove('ikonka-cross');
    ikonka.classList.add('ikonka-circle');
  } else {
    ikonka.classList.remove('ikonka-circle');
    ikonka.classList.add('ikonka-cross');
  }
};
