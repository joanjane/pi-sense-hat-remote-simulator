import './app.css';
import React, { useState, useEffect } from 'react';
import { WsClient } from '../client/ws-client';
import { browserWebSocketFactory } from '../client/browser-web-socket-provider';
import { keyPress } from '../client/actions';

export function Joystick({ device, serverUri }) {
  const [state, setState] = useState({
    connected: false
  });
  const client = new WsClient(browserWebSocketFactory, serverUri);

  async function init() {
    console.log('Initializing web remote display');
    try {
      await client.connect();
    } catch(error) {
      console.error(error);
      setState({ ...state, connected: false });
      return;
    }

    client
      .onOpen(() => {
        window.addEventListener('keydown', handleKeyDown);
        console.log(`WS state: ${client.readyState}`);
        setState({ ...state, connected: true });
      })
      .onError((e) => {
        console.log('Error on WebSocket', e);
        setState({ ...state, connected: false });
      })
      .onClose((e) => {
        console.log('WebSocket was closed', e);
        setState({ ...state, connected: false });
      });
    console.log(`WS state: ${client.readyState}`);
  }

  function clean() {
    console.log('Clean up joystick');
    window.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e) {
    if (!Object.keys(keyMap).some(k => e.key === k)) return;

    const key = keyMap[e.key];
    console.log(`Send key ${key} ${serverUri}`);
    client.send(keyPress(device, 'test-server', key));
  }

  useEffect(() => {
    init();

    return () => {
      clean();
    };
  }, [serverUri, device]);

  return (
    <div hidden={state.connected}>
      WebSocket is not connected on Joystick.
      <button onClick={init}>Reconnect</button>
    </div>
  );
}


const keyMap = {
  'ArrowLeft': 'left',
  'ArrowUp': 'up',
  'ArrowRight': 'right',
  'ArrowDown': 'down',
  'Enter': 'click'
};