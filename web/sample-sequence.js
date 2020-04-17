import React, { useState, useEffect, useContext } from 'react';
import { RemoteDisplay } from '../lib/client/remote-display';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { flashTestSequence } from '../lib/scripts/flash-test-sequence';
import { SettingsContext } from './shared/server-settings-context';

export function SampleSequence() {
  const { serverSettings } = useContext(SettingsContext);

  const [state, setState] = useState({
    connected: false
  });

  let display = new RemoteDisplay(browserWebSocketFactory, serverSettings.serverUri, serverSettings.device);
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
  }, [serverSettings.serverUri, serverSettings.device]);

  return (
    <div hidden={!state.connected}>
      <button className="button" onClick={() => flashTestSequence(display)}>Sample</button>
    </div>
  );
}