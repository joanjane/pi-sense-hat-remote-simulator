import React, { useState, useEffect } from 'react';
import './web-remote-display.css';

import { actionTypes } from '../lib/client/actions';
import { useWsClient } from './shared/server-settings-context';

const displaySize = { x: 8, y: 8 };

export function WebRemoteDisplay() {
  const { connected, client, device } = useWsClient();
  const [subscriberId, setSubscriberId] = useState();
  const [message, setMessage] = useState(emptyMessage());
  const [display, setDisplay] = useState(emptyDisplay());

  function init() {
    const subId = `WebRemoteDisplay${Date.now()}`;
    setSubscriberId((previousSubscriber) => {
      client.unsubscribeAll(previousSubscriber);
      return subId;
    });

    client.onMessage((message) => {
      handleMessage(message);
    }, subId);
  }

  function handleMessage(message) {
    if (message.device !== device) return;

    console.log(`Received message`, message);
    if (message.type === actionTypes.displayMatrix) {
      const twoDDisplay = emptyDisplay();
      message.matrix.forEach((c, i) => {
        const y = Math.trunc(i / displaySize.x);
        const x = i % displaySize.x;
        twoDDisplay[y][x] = c;
      });
      setDisplay(twoDDisplay);
    } else if (message.type === actionTypes.displayMessage) {
      showMessage(message.text, message.color);
    }
  }

  function showMessage(text, color) {
    if (message.currentTimeout) {
      clearTimeout(message.currentTimeout);
    }
    const currentTimeout = setTimeout(() => {
      setMessage(emptyMessage());
    }, 15000);

    setMessage({
      text,
      color,
      currentTimeout
    });
  }

  useEffect(() => {
    if (connected) {
      init();
    }
    return () => {
      subscriberId && client.unsubscribeAll(subscriberId);
    };
  }, [client, connected]);

  return (
    <div className="remote-display">
      <table className="remote-display__panel">
        <tbody>
          {
            display.map((row, y) => (
              <tr key={y}>
                {
                  row.map((cell, x) =>
                    <td key={x} style={({ background: cell })} className="remote-display__pixel"></td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
      {
        message.text ?
          <p className="remote-display__message" style={({ color: message.color })}>
            {message.text}
          </p> :
          ''
      }
    </div>
  );
}

const O = '#000000';
const emptyDisplay = () => [
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O],
  [O, O, O, O, O, O, O, O]
];

const emptyMessage = () => ({
  text: '',
  color: '',
  currentTimeout: null
});