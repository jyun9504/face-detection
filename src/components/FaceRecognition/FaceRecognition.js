import React from 'react';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="" style={{position: 'relative'}}>
      <img id="input_img" className="br4" src={ imageUrl } alt=""/>
      <div className="bounding-box" style={{width: box.clarifeiWidth, height: box.clarifeiHeight,top: box.topRow, left: box.leftCol}}></div>
    </div>
  );
}

export default FaceRecognition;