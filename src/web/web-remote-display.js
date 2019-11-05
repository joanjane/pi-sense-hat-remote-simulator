import React, { useState, useEffect } from 'react';
import './web-remote-display.css';

import { WsClient } from '../client/ws-client';
import { browserWebSocketFactory } from '../client/browser-web-socket-provider';
import { actionTypes } from '../client/actions';

export function WebRemoteDisplay({ device, serverUri }) {
  const [message, setMessage] = useState(emptyMessage());
  const [display, setDisplay] = useState(emptyDisplay());
  const [wsStatus, setWsStatus] = useState({ connected: false });
  const client = new WsClient(browserWebSocketFactory, serverUri);

  async function init() {
    console.log('Initializing web remote display');
    
    try {
      client.connect();
    } catch(error) {
      console.error(error);
      setWsStatus({ ...wsStatus, connected: false });
      return;
    }

    client
      .onOpen(() => {
        console.log(`WS state: ${client.readyState}`);
        setWsStatus({ ...wsStatus, connected: true });
        client.onMessage((message) => {
          handleMessage(message);
        });
      })
      .onError((e) => {
        console.log('Error on WebSocket', e);
        setWsStatus({ ...wsStatus, connected: false });
      })
      .onClose((e) => {
        console.log('WebSocket was closed', e);
        setWsStatus({ ...wsStatus, connected: false });
      });
  }

  function handleMessage(message) {
    if (message.target !== device) return;

    console.log(`Received message`, message);
    if (message.type === actionTypes.displayMatrix) {
      setDisplay(message.matrix);
    } else if (message.type === actionTypes.displayMessage) {
      showMessage(message.text, message.color);
    }
  }

  function showMessage(text, color) {
    if (message.currentTimeout) {
      clearTimeout(message.currentTimeout);
    }
    const currentTimeout = setTimeout(() => {
      setMessage(emptyMessage());
    }, 15000);

    setMessage({
      text,
      color,
      currentTimeout
    });
  }

  useEffect(() => {
    init();

    return () => {
      client.close();
    }
  }, [serverUri, device]);

  return (
    <div className="remote-display">
      <table className="remote-display__panel">
        <tbody>
          {
            display.map((row, y) => (
              <tr key={y}>
                {
                  row.map((cell, x) =>
                    <td key={x} style={({ background: cell })} className="remote-display__pixel"></td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        message.text ?
          <p className="remote-display__message" style={({ color: message.color })}>
            {message.text}
          </p> :
          ''
      }

      <div hidden={wsStatus.connected}>
        WebSocket is not connected on Display.
        <button onClick={init}>Reconnect</button>
      </div>
    </div>
  );
}


const O = '#000000';
const emptyDisplay = () => [
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O]
];

const emptyMessage = () => ({
  text: '',
  color: '',
  currentTimeout: null
});