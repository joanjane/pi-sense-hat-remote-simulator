import React, { useContext } from 'react';
import { SampleSequence } from './sample-sequence';
import { Collapsable } from './shared/collapsable';
import { SettingsContext } from './shared/server-settings-context';


export function ServerSettings() {
  const { serverSettings, setServerSettings } = useContext(SettingsContext);

  function setValue(e) {
    const newState = { ...serverSettings, [e.target.name]: e.target.value };
    setServerSettings(newState);
  }

  return (
    <Collapsable title="Server settings">
      <div className="d-flex flex-direction-row flex-direction-column-md p-3">
        <div className="form-group p-md-0 p-2">
          <label htmlFor="serverUri">Server URI</label>
          <input type="text"
            id="serverUri"
            name="serverUri"
            value={serverSettings.serverUri}
            onChange={setValue}
            className="form-control"
            placeholder="Server URI"
          />
        </div>
        <div className="form-group p-md-0 p-2">
          <label htmlFor="device">Device ID</label>
          <input
            id="device"
            name="device"
            value={serverSettings.device}
            onChange={setValue}
            className="form-control"
            placeholder="Device ID"
          />
        </div>
        {
          serverSettings.serverUri && serverSettings.device ?
            <div className="form-group p-md-0 p-2">
              <SampleSequence />
            </div>
            : null
        }
      </div>
    </Collapsable>
  );
}