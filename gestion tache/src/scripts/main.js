import React from 'react';
import { createRoot } from 'react-dom/client';
import TaskApp from '../components/taskApp.component.jsx';

const container = document.getElementById('insertReactHere');
const root = createRoot(container); // Use createRoot for React 18 compatibility

root.render(<TaskApp />);

console.log('le bundle a été généré !');