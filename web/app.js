import React from 'react';
import { WebRemoteDisplay } from './web-remote-display';
import { Joystick } from './joystick';
import { SampleSequence } from './sample-sequence';
import { EnvironmentSensors } from './environment-sensors';
import { MotionSensors } from './motion-sensors';
import { Collapsable } from './shared/collapsable';
import { useWsInfoState, WsInfoContext } from './shared/ws-info-hook';

export function App() {
  const [state, setState] = useWsInfoState();

  function setValue(e) {
    const newState = { ...state, [e.target.name]: e.target.value };
    setState(newState);
  }

  return (
    <div className="app">
      <WsInfoContext.Provider value={state}>
        <Collapsable title="Server settings">
          <div className="d-flex flex-direction-row flex-direction-column-md p-3">
            <div className="form-group p-md-0 p-2">
              <label htmlFor="serverUri">Server URI</label>
              <input type="text"
                id="serverUri"
                name="serverUri"
                value={state.serverUri}
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
                value={state.device}
                onChange={setValue}
                className="form-control"
                placeholder="Device ID"
              />
            </div>
            <div className="form-group p-md-0 p-2">
              <SampleSequence />
            </div>
          </div>
        </Collapsable>

        <Joystick />

        <div className="d-flex flex-direction-row flex-direction-column-md">
          <div className="p-md-3">
            <WebRemoteDisplay />
          </div>
          <div className="w-100">
            <EnvironmentSensors />
            <MotionSensors />
          </div>
        </div>
      </WsInfoContext.Provider>

    </div>
  );
}