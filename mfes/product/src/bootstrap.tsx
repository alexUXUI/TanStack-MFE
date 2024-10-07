import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      {/* Use the router */}
      <App />
    </React.StrictMode>,
  );
}
