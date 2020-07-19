import './pixel-drawer.css';
import React, { useState, useEffect } from 'react';

const displaySize = { x: 8, y: 8 };
const _ = [0,0,0];
const x = [255,255,255];

export function CharTableParser() {
  const [content, setContent] = useState();
  const [data, setData] = useState();

  useEffect(() => {
  }, [content]);

  function parseContent() {
    const data = eval(content);
    setData(data);
    console.log(data);
  }

  return (
    <div className="pixel-drawer">
      <div className="m-2">
        <button className="button" onClick={() => setContent('')}>❌ Clear</button>
      </div>
      
      <div>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} onBlur={() => parseContent()}>
        </textarea>
      </div>
    </div>
  );
}

const O = [0, 0, 0];
const X = [255, 255, 255];
const emptyDisplay = (columns) => new Array(displaySize.y * columns).fill(O);