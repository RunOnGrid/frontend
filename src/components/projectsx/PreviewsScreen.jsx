import React from 'react';

const PreviewsScreen = () => {
  return (
    <div>
      <div className="environment-box">
        <h3>Pull Request Previews</h3>
        <span style={{ width: '70%', marginRight: 'auto' }}>
          {' '}
          Inspect and review functional and visual changes for the code in your
          pull requests before merging them. If enabled, a preview will be
          generated for each pull request. Read the docs{' '}
        </span>
      </div>
    </div>
  );
};

export default PreviewsScreen;
