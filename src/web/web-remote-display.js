import './web-remote-display.css';

import { WsClient } from '../client/ws-client';
import { actionTypes } from '../client/actions';

export class WebRemoteDisplay {
  constructor(renderElem, { device, serverUri }) {
    this.renderElem = renderElem;
    this.device = device;
    this.display = empty();
    this.client = new WsClient(serverUri);
    this.message = null;
    this.messageColor = null;
  }

  init() {
    this.client
      .connect()
      .onOpen(() => {
        this.client.onMessage((message) => {
          this.handleMessage(message);
        });
      });
    this.render();
  }

  handleMessage(message) {
    if (message.target !== this.device) return;

    if (message.type === actionTypes.displayMatrix) {
      this.display = message.matrix;
      this.render();
    } else if (message.type === actionTypes.displayMessage) {
      this.showMessage(message.text, message.color);
    }
  }

  showMessage(message, color) {
    this.message = message;
    this.messageColor = color;
    this.render();
    setTimeout(() => {
      this.message = null;
      this.messageColor = null;
      this.render();
    }, 15000);
    console.log(message);
  }

  render() {
    console.log(this.display);
    this.renderElem.innerHTML = `
      <div class="remote-display">
        <table class="remote-display__panel">
        ${this.display.map(row => {
          return `
            <tr>
                ${row.map(cell =>
                  `<td style="background: ${cell};" class="remote-display__pixel"></td>`
                ).join('')}
            </tr>
            `;
          }).join('')}
        </table>
        ${this.message ? `
          <p class="remote-display__message" style="color: ${this.messageColor};">
            ${this.message}
          </p>` : ''}
      </div>`;
  }
}


const O = '#000000';
const empty = () => [
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O]
];