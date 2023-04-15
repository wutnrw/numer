import React from 'react';

const EquationInput = ({ onEquationChange }) => {
  return (
    <div>
      <label>สมการ: </label>
      <input type="text" onChange={e => onEquationChange(e.target.value)} />
    </div>
  );
};

export default EquationInput;
