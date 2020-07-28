import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="u-center-text">
      <img className="br4" src={ imageUrl } alt=""/>
    </div>
  );
}

export default FaceRecognition;