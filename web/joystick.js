import React, { useEffect } from 'react';
import { keyPressAction } from '../lib/client/actions';
import { useWsClient } from './shared/server-settings-context';

export function Joystick() {
  const { connected, client, device } = useWsClient();
  
  function handleKeyDown(e) {
    if (!connected || !Object.keys(keyMap).some(k => e.key === k)) return;

    const key = keyMap[e.key];
    console.log(`Send key ${key}`);
    client.send(keyPressAction(device, 'test-server', key));
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <></>;
}


const keyMap = {
  'ArrowLeft': 'left',
  'ArrowUp': 'up',
  'ArrowRight': 'right',
  'ArrowDown': 'down',
  'Enter': 'click'
};