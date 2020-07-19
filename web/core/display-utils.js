import emojis from './emojis.json';
import symbols from './symbols.json';
import lowercase from './lowercase.json';
import uppercase from './uppercase.json';

const charTable = {
  ...emojis,
  ...symbols,
  ...lowercase,
  ...uppercase
};
export const emptyScreen = () => new Array(64).fill(' ');

export class DisplayMessageScroller {
  constructor(message, color, background) {
    this.displaySize = { x: 8, y: 8 };

    this.display = emptyScreen();
    this.appendPixels = [];
    this.messageIndex = 0;
    this.message = convertRenderMessage(message);
    this.color = formatColor(color);
    this.background = formatColor(background || '#000000');
  };

  [Symbol.iterator]() {
    this.display = emptyScreen();
    this.appendPixels = [];
    this.messageIndex = 0;
    return this;
  }

  next() {
    if (this.messageIndex === this.message.length && this.appendPixels.length === 0) {
      return { done: true };
    } else {
      if (this.appendPixels.length === 0) {
        const charSymbol = this.message[this.messageIndex];
        this.appendPixels = charTable[charSymbol] || charTable['?'];
        this.messageIndex++;
      }
      const { result, nextPixels } = this.shiftColumn(this.display, this.appendPixels);
      this.display = result;
      this.appendPixels = nextPixels;
      return { done: false, value: this.renderPixels(this.display, this.color, this.background) };
    }
  }

  renderPixels(display, color, background) {
    return display.map(p => p === 'x' ? color : background);
  }

  shiftColumn(displayMatrix, next) {
    // remove first col deleting pixels with index being a multiple of the nº cols:
    // Ex. 8x8: 0, 8, 16, 24...
    const result = displayMatrix.filter((v, i) => i % this.displaySize.x !== 0);

    const nextCols = next.length / this.displaySize.y;
    const appendCol = [];
    const nextPixels = [];

    // take first colum of the matrix
    for (let yIndex = 0; yIndex < this.displaySize.y; yIndex++) {
      for (let xIndex = 0; xIndex < nextCols; xIndex++) {
        const pixel = next[yIndex * nextCols + xIndex];
        if (xIndex === 0) {
          appendCol.push(pixel);
        } else {
          nextPixels.push(pixel);
        }
      }
    }

    // append 1 column using formula i*rows + (cols-1)
    // Ex. 8x8: 7, 15, 23...
    for (let i = 0; i < appendCol.length; i++) {
      const insertIndex = (i * this.displaySize.y) + (this.displaySize.x - 1);
      result.splice(
        insertIndex,
        0,
        appendCol[i]);
    }

    return {
      result,
      nextPixels
    };
  }
}

export function logDisplay(display, cols, rows, renderValues) {
  let textDisplay = '\n';
  for (let yIndex = 0; yIndex < rows; yIndex++) {
    for (let xIndex = 0; xIndex < cols; xIndex++) {
      const pixel = display[yIndex * cols + xIndex];
      if (renderValues) {
        textDisplay += ` [${formatDigit(pixel[0])},${formatDigit(pixel[1])},${formatDigit(pixel[2])}]`;
      } else {
        textDisplay += ` ${!pixel || pixel.every(p => p === 0) ? '_' : 'x'}`;
      }
    }
    textDisplay += `\n`;
  }
  return textDisplay;
}

function formatDigit(d) {
  if (d > 99) {
    return d.toString();
  } else if (d > 9) {
    return `0${d}`
  } else {
    return `00${d}`
  }
}

export function formatColor(color) {
  if (!Array.isArray(color) && typeof color !== 'string') {
    throw new Error(`Color is not valid ${color}`);
  }
  return typeof color === 'string' ? hexToRgb(color) : color;
}

export function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result || result.length !== 4) {
    throw new Error(`'${hex}' is not a valid color`);
  }
  return [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ];
}

const emptyPadding = '    ';
const letterSpacing = '¶';
function convertRenderMessage(message) {
  // append 4 spaces to scroll until an empty screen
  return Array.from(Array.from(message).reduce((a,b) => { 
    return a[a.length-1] !== ' ' && b !== ' ' ? a+letterSpacing+b : a+b;
  }) + emptyPadding);
}