import React, { useState, useEffect, useContext } from 'react';
import { WsClient } from '../lib/client/ws-client';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { updateEnvironmentStatusAction } from '../lib/client/actions';
import { Collapsable } from './shared/collapsable';
import { SettingsContext } from './shared/server-settings-context';

export function EnvironmentSensors() {
  const { serverSettings } = useContext(SettingsContext);

  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState({
    temperature: 21,
    pressure: 1013,
    humidity: 20
  });
  const [client, setClient] = useState();

  function init() {
    const wsClient = new WsClient(browserWebSocketFactory, serverSettings.serverUri);
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
      })
      .onError((e) => {
        setConnected(false);
      })
      .onClose((e) => {
        setConnected(false);
      });
  }

  useEffect(() => {
    init();
  }, [serverSettings.serverUri, serverSettings.device, setConnected, setClient]);

  const sendStatus = () => {
    client.send(updateEnvironmentStatusAction(serverSettings.device, 'test-server', status));
  }

  const handleRangeChange = (e) => {
    setStatus({ ...status, ...{ [e.target.name]: e.target.value } });
  };

  if (!connected) {
    return (
      <div>
        WebSocket is not connected on Environment Sensors.
        <button className="button" onClick={init}>Reconnect</button>
      </div>
    );
  }

  return (
    <Collapsable title="Environment">
      <div className="d-flex flex-direction-column p-3">
        <div className="form-group">
          <label htmlFor="temperature">Temperature ({status.temperature}° C)</label>
          <input type="range" id="temperature" name="temperature" min={-40} max={120}
            value={status.temperature} onChange={handleRangeChange} onBlur={(e) => sendStatus(e)} />
        </div>

        <div className="form-group">
          <label htmlFor="pressure">Pressure ({status.pressure}hPa)</label>
          <input type="range" id="pressure" name="pressure" min={870} max={1084}
            value={status.pressure} onChange={handleRangeChange} onBlur={(e) => sendStatus(e)} />
        </div>

        <div className="form-group">
          <label htmlFor="humidity">Humidity ({status.humidity}%)</label>
          <input type="range" id="humidity" name="humidity" min={0} max={100}
            value={status.humidity} onChange={handleRangeChange} onBlur={(e) => sendStatus(e)} />
        </div>
      </div>
    </Collapsable>
  );
}