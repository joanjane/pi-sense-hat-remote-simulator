import React, { useState, useEffect } from 'react';
import { RemoteDisplay } from '../lib/client/remote-display';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { flashTestSequence } from '../lib/scripts/flash-test-sequence';
import { useCurrentWsInfo } from './shared/ws-info-hook';

export function SampleSequence() {
  const { device, serverUri } = useCurrentWsInfo();

  const [state, setState] = useState({
    connected: false
  });

  let display = new RemoteDisplay(browserWebSocketFactory, serverUri, device);
  async function init() {
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
      <button className="button" onClick={() => flashTestSequence(display)}>Sample</button>
    </div>
  );
}