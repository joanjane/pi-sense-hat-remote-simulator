import React, { useState, useEffect, useContext } from 'react';
import { RemoteDisplay } from '../lib/client/remote-display';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { flashTestSequence } from '../lib/scripts/flash-test-sequence';
import { SettingsContext } from './shared/server-settings-context';

export function SampleSequence() {
  const { serverSettings } = useContext(SettingsContext);

  const [connected, setConnected] = useState(false);
  const [display, setDisplay] = useState();

  async function init() {
    setConnected(false);
    const display = new RemoteDisplay(browserWebSocketFactory, serverSettings.serverUri, serverSettings.device);
    setDisplay(display);
    try {
      display.connect(() => {
        setConnected(true);
      });
    } catch (error) {
      console.error(error);
      setConnected(false);
    }
    return display;
  }

  useEffect(() => {
    let dp;
    init().then(display => dp = display);

    return () => {
      dp && dp.close();
    };
  }, [serverSettings.serverUri, serverSettings.device]);

  if (!connected) {
    return null;
  }
  return (
    <>
      <button className="button" onClick={() => flashTestSequence(display)}>Sample</button>
      <input type="text" placeholder="Type a message to display" className="form-control"
        onBlur={(e) =>{
          display.showMessage(e.target.value, 0.1, '#bbaa00');
        }
      } />
    </>
  );
}