import React, { useState, useEffect } from 'react';
import './web-remote-display.css';

import { WsClient } from '../lib/client/ws-client';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { actionTypes } from '../lib/client/actions';
import { useCurrentWsInfo } from './shared/ws-info-hook';

const displaySize = { x: 8, y: 8 };

export function WebRemoteDisplay() {
  const { device, serverUri } = useCurrentWsInfo();
  const [message, setMessage] = useState(emptyMessage());
  const [display, setDisplay] = useState(emptyDisplay());
  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState(false);
  
  function init() {
    const wsClient = new WsClient(browserWebSocketFactory, serverUri);
    setClient(wsClient);
    try {
      wsClient.connect();
    } catch (error) {
      console.error(error);
      setConnected(false);
      return;
    }

    wsClient
      .onOpen(() => {
        setConnected(true);
        wsClient.onMessage((message) => {
          handleMessage(message);
        });
      })
      .onError((e) => {
        console.log('Error on WebSocket', e);
        setConnected(false);
      })
      .onClose((e) => {
        console.log('WebSocket was closed', e);
        setConnected(false);
      });

    return wsClient;
  }

  function handleMessage(message) {
    if (message.target !== device) return;

    console.log(`Received message`, message);
    if (message.type === actionTypes.displayMatrix) {
      const twoDDisplay = emptyDisplay();
      message.matrix.forEach((c, i) => {
        const y = Math.trunc(i / displaySize.x);
        const x = i % displaySize.x;
        twoDDisplay[y][x] = c;
      });
      setDisplay(twoDDisplay);
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
  }, [serverUri, device, setConnected, setClient]);

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

      <div hidden={connected}>
        WebSocket is not connected on Display.
        <button className="button" onClick={init}>Reconnect</button>
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