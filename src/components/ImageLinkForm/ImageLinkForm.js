import React from 'react';


const ImageLinkForm = ({ onInputChange, onDetectSubmit }) => {
  return (
    <div className="image-link-form u-center-text u-margin-bottom-small">
      <p className="f3 u-margin-bottom-small">{'Paste image url. Try it!'}</p>
      <div style={{display: 'flex'}}>
        <input className="f4 pa2 w-100 br2" type="text" onChange={ onInputChange } />
        <a className="btn-detect grow f3 link dib br2 ph3 pv2 dib white bg-orange" href="#0" onClick={ onDetectSubmit }>Detect</a>
      </div>
    </div>
  );
}

export default ImageLinkForm;