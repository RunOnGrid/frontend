import React, { forwardRef, useState } from 'react';
import Image from 'next/image';

const Step1Docker = forwardRef(({ onNextStep }, ref) => {
  const [url, setUrl] = useState(false);
  const [image, setImage] = useState('');

  const handleUrl = () => {
    setUrl(true);
    onNextStep();
  };
  return (
    <div ref={ref}>
      <h3>Image settings</h3>
      <span>Specify your image URL</span>
      <div className="input-with-image3">
        <input placeholder="Search images " />
        <Image alt="" src="/searc.png" height={15} width={15} />
      </div>
      <div className="no-docker">
        <div style={{ opacity: '0' }}>.</div>
        <p style={{ marginTop: '30px', marginBottom: '15px' }}>
          No linked images found
        </p>
        <p style={{ marginBottom: '30px' }}>
          {' '}
          Configure linked image registries, or provide the URL of a public
          image (e.g. &apos;nginx&apos;) to continue.
        </p>
        <div style={{ opacity: '0' }}>.</div>
      </div>
      <div className="repo-git2">
        <Image alt="" src="/plus2.png" height={10} width={10} />
        <span> Use image URL :</span>
        <input onChange={(e) => setImage(e.target.value)} />
        <p onClick={() => handleUrl()}> Add</p>
      </div>
      {url ? (
        <div className="repo-selected">
          <div className="circle1"> </div>
          <h5> Image URL:</h5>
          <span> {image}</span>
          <p onClick={() => setUrl(false)}> Change </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
});

Step1Docker.displayName = 'Step1Docker';
export default Step1Docker;
