import React from 'react';


const Navigation = ({ onRouteChange }) => {
  return (
    <nav className="navigation center">
      <p onClick={() => onRouteChange('signin') } className="f3 link dim black underline pointer pt3">Sign Out</p>
    </nav>
  );
}

export default Navigation;
