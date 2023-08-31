import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app-component';

const container = document.getElementById('output');
const root = createRoot(container);

root.render(
  <App></App>
);
