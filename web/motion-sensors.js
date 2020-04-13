import React, { useState, useEffect } from 'react';
import { WsClient } from '../lib/client/ws-client';
import { browserWebSocketFactory } from '../lib/client/browser-web-socket-provider';
import { updateMotionStatusAction } from '../lib/client/actions';
import { Collapsable } from './shared/collapsable';

export function MotionSensors({ device, serverUri }) {
  const [client, setClient] = useState();
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState({
    acceleration: { x: 0, y: 0, z: 0 },
    gyroscope: { x: 0, y: 0, z: 0 },
    orientation: { x: 0, y: 0, z: 0 },
    compass: 0
  });

  function init() {
    const wsClient = new WsClient(browserWebSocketFactory, serverUri);
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
  }, [serverUri, device, setConnected, setClient]);

  const sendStatus = () => {
    client.send(updateMotionStatusAction(device, 'test-server', {
      acceleration: toVector(status.acceleration),
      gyroscope: toVector(status.gyroscope),
      orientation: toVector(status.orientation),
      compass: 0
    }));
  }

  const handleRangeChange = (e) => {
    setStatus({ ...status, ...{ [e.target.name]: e.target.value } });
  };

  const handleCoordChange = (e) => {
    status[e.target.name][e.target.dataset.coord] = e.target.value;
    setStatus({ ...status });
  };

  if (!connected) {
    return (
      <div>
        WebSocket is not connected on Motion Sensors.
        <button className="button" onClick={init}>Reconnect</button>
      </div>
    );
  }

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