import React, { useState } from 'react';
import Image from 'next/image';

const Step2Docker = () => {
  const [url, setUrl] = useState(false);
  const [image, setImage] = useState('');
  return (
    <div>
      <span>Specify your image tag</span>
      <div className="input-with-image3">
        <input placeholder="Search tags " />
        <Image alt="" src="/searc.png" height={15} width={15} />
      </div>
      <div className="no-docker">
        <div style={{ opacity: '0' }}>.</div>
        <p style={{ marginTop: '30px', marginBottom: '30px' }}>
          Please specify a tag.
        </p>
        <div style={{ opacity: '0' }}>.</div>
      </div>
      <div className="repo-git2">
        <Image alt="" src="/plus2.png" height={10} width={10} />
        <span> Use tag :</span>
        <input onChange={(e) => setImage(e.target.value)} />
        <p onClick={() => setUrl(true)}> Add</p>
      </div>
      {url ? (
        <div className="repo-selected">
          <div className="circle1"> </div>
          <h5> Tag:</h5>
          <span> {image}</span>
          <p onClick={() => setUrl(false)}> Change </p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

Step2Docker.displayName = 'Step2Docker';
export default Step2Docker;
