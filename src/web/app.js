import './app.css';
import React, { useState } from 'react';
import { WebRemoteDisplay } from './web-remote-display';
import { Joystick } from './joystick';
import { UserData } from './user-data';

export function App() {
  const userData = new UserData();
  const data = userData.get();
  const [state, setState] = useState({
    device: data && data.device || 'test-web-client',
    serverUri: data && data.serverUri || 'ws://localhost:8080'
  });

  function setValue(e) {
    const newState = { ...state, [e.target.name]: e.target.value };
    setState(newState);
    userData.set(newState);
  }

  return (
    <div className="app">
      <div className="app__form">
        <div className="form-group">
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
        <div className="form-group">
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
      </div>
      {
        state.serverUri && state.device ?
          <WebRemoteDisplay serverUri={state.serverUri} device={state.device} />
          : ''
      }

      <Joystick serverUri={state.serverUri} device={state.device} />
    </div>
  );
}