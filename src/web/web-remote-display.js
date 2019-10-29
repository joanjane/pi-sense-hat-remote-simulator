const { Client } = require('../client');
const { actionTypes } = require('.,/actions');

module.exports.WebRemoteDisplay = class WebRemoteDisplay {
    constructor(renderElem, { device, serverUri }) {
        this.renderElem = renderElem;
        this.device = device;
        this.client = new Client(serverUri)
            .connect()
            .onOpen(() => {
                this.client.onMessage((message) => {

                });
            });
        this.display = empty();
    }

    handleMessage(message) {
        if (message.target !== this.device) return;

        if (actionTypes.type === actionTypes.displayMatrix) {
            this.displayMatrix(message.matrix);
        } else if (actionTypes.type === actionTypes.displayMessage) {
            this.showMessage(message.text);
        }
    }

    showMessage(message) {
        console.log(message);
    }
    
    displayMatrix(matrix) {
        console.log(matrix);
        this.renderElem.innerHTML = `
        <table>
        ${matrix.map(row => {
            return `
            <tr>
                ${row.map(cell => 
                `<td style="background: ${cell};">&nbsp;</td>
                `
                ).join('')}
            </tr>
            `;
        }).join('')}
        </table>
        `;
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