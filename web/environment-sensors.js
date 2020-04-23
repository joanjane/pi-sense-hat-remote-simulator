import React, { useState } from 'react';
import { updateEnvironmentStatusAction } from '../lib/client/actions';
import { Collapsable } from './shared/collapsable';
import { useWsClient } from './shared/server-settings-context';

export function EnvironmentSensors() {
  const { connected, client, device } = useWsClient();

  const [status, setStatus] = useState({
    temperature: 21,
    pressure: 1013,
    humidity: 20
  });

  const sendStatus = () => {
    if (!connected) {
      return;
    }
    client.send(updateEnvironmentStatusAction(device, status));
  }

  const handleRangeChange = (e) => {
    setStatus({ ...status, ...{ [e.target.name]: e.target.value } });
  };

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