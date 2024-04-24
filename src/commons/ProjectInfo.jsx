import React from 'react';

const ProjectInfo = () => {
  return (
    <>
      <div style={{ opacity: '0' }}>.</div>
      <div className="projectDataContainer">
        <div className="data-project">
          <img className="icon-chico-project" alt="" src="/webIcon.png" />
          <h3> nippon</h3>
          <p>
            {' '}
            <img className="icon-chico-project" alt="" src="/github.png" />{' '}
            Bautistagl/nippon-project
          </p>
        </div>
        <div className="branch-project">
          <div> Branch </div>
          <div>master</div>
        </div>
      </div>
    </>
  );
};

export default ProjectInfo;
