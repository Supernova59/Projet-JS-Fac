import React from 'react';
import '../assets/style/doneButton.css';

const DoneButton = ({ onClick }) => {
  return (
    <div className="doneButton" onClick={onClick}>
      ✓
    </div>
  );
};

export default DoneButton;