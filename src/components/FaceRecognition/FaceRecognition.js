import React from 'react';

const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div id="face_recognition" className="" style={{position: 'relative'}}>
      <img id="input_img" className="br4" src={ imageUrl } alt=""/>
      { 
        box.map(data => {
          return (
            <div
              className="bounding-box" 
              style={{
                width: data.clarifeiWidth, 
                height: data.clarifeiHeight, 
                top: data.topRow, 
                left: data.leftCol,
              }}
              key={ data.key }
            ></div>
          )
        })
      }
    </div>
  );
}

export default FaceRecognition;