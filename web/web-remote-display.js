import React, { useState, useEffect } from 'react';
import './web-remote-display.css';

import { actionTypes } from '../lib/client/actions';
import { useWsClient } from './shared/server-settings-context';
import { DisplayMessageScroller, logDisplay, formatColor } from './core/display-utils';

const displaySize = { x: 8, y: 8 };

export function WebRemoteDisplay() {
  const { connected, client, device } = useWsClient();
  const [subscriberId, setSubscriberId] = useState();
  const [display, setDisplay] = useState(emptyDisplay());
  const [onMessageCancelListeners, setOnMessageCancelListeners] = useState([]);

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
      setDisplay(map2DMatrix(message.matrix));
    } else if (message.type === actionTypes.displayMessage) {
      cancelCurrentMessage();
      showMessage(message.text, message.speed, message.color, message.background);
    }
  }

  function showMessage(message, speed, color, background) {
    const promise = new Promise((resolve, reject) => {
      setOnMessageCancelListeners((prevOnMessageCancelListeners) => [...prevOnMessageCancelListeners, reject]);
      const messageScroller = new DisplayMessageScroller(message, color, background);
      scrollMessage(
        messageScroller,
        (pixels) => {
          console.log(logDisplay(pixels, displaySize.x, displaySize.y));
          setDisplay(map2DMatrix(pixels));
        },
        speed,
        () => {
          resolve();
          setOnMessageCancelListeners([]);
        },
        (cancelListener) => setOnMessageCancelListeners((prevOnMessageCancelListeners) =>
          [...prevOnMessageCancelListeners, cancelListener]));
    });

    return promise;
  }

  function cancelCurrentMessage() {
    if (onMessageCancelListeners.length > 0) {
      onMessageCancelListeners.forEach(l => l());
      onMessageCancelListeners = [];
      setOnMessageCancelListeners(onMessageCancelListeners);
    }
  }

  function scrollMessage(messageScroller, setPixels, speed, resolve, onCancel) {
    const next = messageScroller.next();
    if (next.done) {
      resolve();
      return;
    }

    setPixels(next.value);
    const timeout = setTimeout(() => {
      scrollMessage(messageScroller, setPixels, speed, resolve, onCancel);
    }, 1000 * speed);

    onCancel && onCancel(() => {
      clearTimeout(timeout);
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
                    <td key={x} style={({ background: `rgb(${cell[0]},${cell[1]},${cell[2]})` })} className="remote-display__pixel"></td>
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

const O = [0,0,0];
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
  background: '#000000',
  speed: 0.2
});

function map2DMatrix(matrix) {
  const twoDDisplay = emptyDisplay();
  matrix.forEach((c, i) => {
    const y = Math.trunc(i / displaySize.x);
    const x = i % displaySize.x;
    twoDDisplay[y][x] = formatColor(c);
  });
  return twoDDisplay;
}