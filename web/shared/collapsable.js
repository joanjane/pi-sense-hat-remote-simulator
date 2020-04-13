import './collapsable.css';
import React, { useState } from 'react';

export function Collapsable({ collapsedByDefault, title, children }) {
  const [collapsed, setCollapsed] = useState(collapsedByDefault == null ? true : collapsedByDefault);

  return (
    <div className={`collapsable ${collapsed ? 'is-collapsed' : ''}`}>
      <button className="collapsable__title" onClick={() => setCollapsed(!collapsed)}>
        {title}
        <span aria-label="expand" className="collapsable__icon collapsable__icon--expand">＋</span>
        <span aria-label="collapse" className="collapsable__icon collapsable__icon--collapse">－</span>
      </button>
      <div className="collapsable__content">
        {children}
      </div>
    </div>
  );
}