import './pixel-drawer.css';
import React, { useState, useEffect } from 'react';

const displaySize = { x: 8, y: 8 };

export function PixelDrawer() {
  const [displayCode, setDisplayCode] = useState();
  const [columns, setColumns] = useState(displaySize.x);
  const [display, setDisplay] = useState(emptyDisplay(columns));

  useEffect(() => {
    setDisplay(emptyDisplay(columns));
  }, [columns]);
  
  useEffect(() => {
    copyCode();
  }, [display]);

  function copyCode() {
    const maxCol = display
      .map((c, i) => c.toString() === X.toString() ? i % columns : -1)
      .reduce((a, b) => a > b ? a : b);
    if (maxCol === -1) {
      setDisplayCode('');
      return;
    }
    let displaySnippet = '[';
    display.map((cell, i) => {
      if (i % columns > maxCol) {
        return;
      }
      if (i % columns === 0) {
        displaySnippet += '\n  ';
      }
      if (cell.toString() === O.toString()) {
        displaySnippet += 'X, ';
      } else {
        displaySnippet += 'O, ';
      }
    });
    displaySnippet += '\n]';
    setDisplayCode(displaySnippet);
  }

  return (
    <div className="pixel-drawer">
      <div className="m-2">
        <button className="button" onClick={() => setDisplay(emptyDisplay(columns))}>❌ Clear</button>
        <input type="number" className="form-control" value={columns} onChange={(e) => setColumns(+e.target.value)} />
      </div>
      <div className="pixel-drawer__screen"
        style={({gridTemplateColumns: new Array(columns).fill('auto').join(' ')})}>
        {
          display.map((cell, i) => (
            <button key={i}
              className="pixel-drawer__pixel"
              style={({ background: `rgb(${cell[0]},${cell[1]},${cell[2]})` })}
              onClick={(e) => {
                if (cell.toString() === O.toString()) {
                  display[i] = X;
                } else {
                  display[i] = O;
                }
                setDisplay([...display]);
              }}
              ></button>
          ))
        }
      </div>
      <div>
        <pre className="pixel-drawer__code">
          <code>
            {displayCode}
          </code>
        </pre>
      </div>
    </div>
  );
}

const O = [0, 0, 0];
const X = [255, 255, 255];
const emptyDisplay = (columns) => new Array(displaySize.y * columns).fill(O);