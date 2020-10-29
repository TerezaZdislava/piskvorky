'use strict';

let natahu = 'circle';

const pole = document.querySelectorAll('.button');

for (let i = 0; i < pole.length; i++) {
  // funguje spravne
  pole[i].addEventListener('click', function (event) {
    zapisto(pole[i], event);
    zmenIkonku(ikonka);
    isWinningMove(pole[i]);
    showResult(isWinningMove(pole[i]), getSymbol(pole[i]));
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

//--------------------ukol 5----------------------

const boardSize = 10; // 10x10
const fields = document.querySelectorAll('.button');

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
  //vrati radek a sloupec jednoho buttonu
};

const getField = (row, column) => fields[row * boardSize + column]; // inverzni k getposition
//ziskat button podle radku a sloupce

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;
  let j;

  let inRow = 1; // Jednička pro právě vybrané políčko // body hráče
  //-----------------------------------------------------------------------------------
  // Koukni doleva
  i = origin.column; // číslo sloupce, vytažené první funkcí
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    // zjistí nasledujici buton podle pozice a zjistí symbol co tam je
    inRow++; // zvyš body hráče o 1
    i--; // koukni se o jeden sloupec doleva
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1)) //
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolů
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  //---------------bonus sikme smery---------
  // Koukni sikmo nahoru doleva

  i = origin.column;
  j = origin.row;

  let inDiaLeft = 1;

  while (j > 0 && i > 0 && symbol === getSymbol(getField(j - 1, i - 1))) {
    inDiaLeft++;
    i--;
    j--;
  }
  // Koukni sikmo dolu doprava
  i = origin.column;
  j = origin.row;
  while (
    j < boardSize - 1 &&
    i < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i + 1)) //
  ) {
    inDiaLeft++;
    i++;
    j++;
  }

  if (inDiaLeft >= symbolsToWin) {
    return true;
  }

  let inDiaRight = 1;

  // Koukni sikmo nahoru doprava
  i = origin.column;
  j = origin.row;
  while (j > 0 && i > 0 && symbol === getSymbol(getField(j - 1, i + 1))) {
    inDiaRight++;
    i++;
    j--;
  }

  // Koukni sikmo dolu doleva
  i = origin.column;
  j = origin.row;
  while (
    i < boardSize - 1 &&
    j < boardSize - 1 &&
    symbol === getSymbol(getField(j + 1, i - 1)) //
  ) {
    inRow++;
    i--;
    j++;
  }

  if (inDiaRight >= symbolsToWin) {
    return true;
  }
  return false;
};

const showResult = (vyhra, symbol) => {
  if (vyhra) {
    console.log('funguju');
    if (symbol === 'cross') {
      window.confirm(
        'Vyhrál křížek. Chcete další hru, ať mu to kolečko natře?',
      );
    }
    if (symbol === 'circle') {
      let r = confirm(
        'Vyhrálo kolečko. Chcete další hru, ať mu to křížek natře?',
      );
      if (r === true) {
        location.reload();
      }
    }
  }
};
