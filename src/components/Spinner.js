import React from 'react';
import loading from './loading.gif'; // Ensure this path is correct based on your project structure

const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={loading} alt="loading" style={{ height: '50px' }} />
    </div>
  );
};

export default Spinner;
