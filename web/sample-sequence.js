import React, { useState, useEffect } from 'react';
import { RemoteDisplayClient } from '../lib/client/remote-display-client';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { flashTestSequence } from '../lib/scripts/flash-test-sequence';

export function SampleSequence({ device, serverUri }) {
  const [state, setState] = useState({
    connected: false
  });

  let display = new RemoteDisplayClient(browserWebSocketFactory, serverUri, device);
  async function init() {
    console.log('Initializing web remote display');
    try {
      display.connect(() => {
        setState({ ...state, connected: true });
      });
    } catch(error) {
      console.error(error);
      setState({ ...state, connected: false });
      return;
    }
  }

  useEffect(() => {
    init();

    return () => {
      display && display.close();
    };
  }, [serverUri, device]);

  return (
    <div hidden={!state.connected}>
      <button onClick={() => flashTestSequence(display)}>Sample</button>
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