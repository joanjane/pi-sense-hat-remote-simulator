import React, { useState } from 'react';
import { updateMotionStatusAction } from '../lib/client/actions';
import { Collapsable } from './shared/collapsable';
import { useWsClient } from './shared/server-settings-context';

export function MotionSensors() {
  const { connected, client, device } = useWsClient();

  const [status, setStatus] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
    gyroscope: { x: 0, y: 0, z: 0 },
    orientation: { x: 0, y: 0, z: 0 },
    compass: 0
  });

  const sendStatus = () => {
    if (!connected) {
      return;
    }

    client.send(updateMotionStatusAction(device, {
      acceleration: toVector(status.acceleration),
      gyroscope: toVector(status.gyroscope),
      orientation: toVector(status.orientation),
      compass: status.compass
    }));
  }

  const handleRangeChange = (e) => {
    setStatus({ ...status, ...{ [e.target.name]: e.target.value } });
  };

  const handleCoordChange = (e) => {
    status[e.target.name][e.target.dataset.coord] = e.target.value;
    setStatus({ ...status });
  };

  return (
    <>
      <Collapsable title="Acceleration">
        <div className="d-flex flex-direction-column p-3">
          <div className="form-group">
            <label>X/Y/Z ({formatCoords(status.acceleration)})</label>
            <input type="range" id="acceleration" name="acceleration" data-coord="x" min={0} max={359}
              value={status.acceleration.x} onChange={handleCoordChange} onBlur={sendStatus} />
            <input type="range" id="acceleration" name="acceleration" data-coord="y" min={0} max={359}
              value={status.acceleration.y} onChange={handleCoordChange} onBlur={sendStatus} />
            <input type="range" id="acceleration" name="acceleration" data-coord="z" min={0} max={359}
              value={status.acceleration.z} onChange={handleCoordChange} onBlur={sendStatus} />
          </div>
        </div>
      </Collapsable>

      <Collapsable title="Gyroscope">
        <div className="d-flex flex-direction-column p-3">
          <div className="form-group">
            <label>X/Y/Z ({formatCoords(status.gyroscope)})</label>
            <input type="range" id="gyroscope-x" name="gyroscope" data-coord="x" min={0} max={359}
              value={status.gyroscope.x} onChange={handleCoordChange} onBlur={sendStatus} />
            <input type="range" id="gyroscope-y" name="gyroscope" data-coord="y" min={0} max={359}
              value={status.gyroscope.y} onChange={handleCoordChange} onBlur={sendStatus} />
            <input type="range" id="gyroscope-z" name="gyroscope" data-coord="z" min={0} max={359}
              value={status.gyroscope.z} onChange={handleCoordChange} onBlur={sendStatus} />
          </div>
        </div>
      </Collapsable>

      <Collapsable title="Orientation">
        <div className="d-flex flex-direction-column p-3">
          <div className="form-group">
            <label>X/Y/Z ({formatCoords(status.orientation)})</label>
            <input type="range" id="orientation-x" name="orientation" data-coord="x" min={0} max={359}
              value={status.orientation.x} onChange={handleCoordChange} onBlur={sendStatus} />
            <input type="range" id="orientation-y" name="orientation" data-coord="y" min={0} max={359}
              value={status.orientation.y} onChange={handleCoordChange} onBlur={sendStatus} />
            <input type="range" id="orientation-z" name="orientation" data-coord="z" min={0} max={359}
              value={status.orientation.z} onChange={handleCoordChange} onBlur={sendStatus} />
          </div>
        </div>
      </Collapsable>

      <Collapsable title="Compass">
        <div className="d-flex flex-direction-column p-3">
          <div className="form-group">
            <label>({status.compass}°)</label>
            <input type="range" id="compass" name="compass" min={0} max={359}
              value={status.compass} onChange={handleRangeChange} onBlur={sendStatus} />
          </div>
        </div>
      </Collapsable>
    </>
  );
}

function toVector(coord) {
  return [coord.x, coord.y, coord.z];
}

function formatCoords(coord) {
  return Object.values(coord).join('/');
}