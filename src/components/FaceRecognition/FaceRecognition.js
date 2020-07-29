import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div id="face_recognition" className="" style={{position: 'relative'}}>
      <img id="input_img" className="br4" src={ imageUrl } alt=""/>
    </div>
  );
}

export default FaceRecognition;