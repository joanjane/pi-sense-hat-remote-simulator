import React, { useState, useEffect } from 'react';
import { WsClient } from '../lib/client/ws-client';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { keyPressAction } from '../lib/client/actions';
import { useCurrentWsInfo } from './shared/ws-info-hook';

export function Joystick() {
  const { device, serverUri } = useCurrentWsInfo();

  const [connected, setConnected] = useState(false);
  const [client, setClient] = useState();
  
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
        window.addEventListener('keydown', handleKeyDown);
        setConnected(true);
      })
      .onError((e) => {
        console.log('Error on WebSocket', e);
        setConnected(false);
      })
      .onClose((e) => {
        console.log('WebSocket was closed', e);
        setConnected(false);
      });
  }

  function clean() {
    console.log('Clean up joystick');
    window.removeEventListener('keydown', handleKeyDown);
  }

  function handleKeyDown(e) {
    if (!Object.keys(keyMap).some(k => e.key === k)) return;

    const key = keyMap[e.key];
    console.log(`Send key ${key} ${serverUri}`);
    client.send(keyPressAction(device, 'test-server', key));
  }

  useEffect(() => {
    init();

    return () => {
      clean();
    };
  }, [serverUri, device, setConnected, setClient]);

  return (
    <div hidden={connected}>
      WebSocket is not connected on Joystick.
      <button className="button" onClick={init}>Reconnect</button>
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