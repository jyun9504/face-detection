import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="navigation center">
        <p onClick={() => onRouteChange('signin') } className="f3 link dim black underline pointer pt3">Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav className="navigation center">
        <p onClick={() => onRouteChange('signin') } className="f3 link dim black underline pointer pt3 mr3">Sign In</p>
        <p onClick={() => onRouteChange('register') } className="f3 link dim black underline pointer pt3">Regiter</p>
      </nav>
    );
  }
}

export default Navigation;
