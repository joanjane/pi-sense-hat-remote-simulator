import React from 'react';
import { WebRemoteDisplay } from './web-remote-display';
import { Joystick } from './joystick';
import { EnvironmentSensors } from './environment-sensors';
import { MotionSensors } from './motion-sensors';
import { SettingsProvider } from './shared/server-settings-context';
import { ServerSettings } from './server-settings';

export function App() {

  return (
    <div className="app">
      <SettingsProvider>
        <ServerSettings />

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
      </SettingsProvider>

    </div>
  );
}