import React from 'react';

const MetricScreen = () => {
  return (
    <div>
      <div className="environment-box">
        <h3>Bandwidth</h3>
        <span style={{ width: '70%', marginRight: 'auto' }}>
          {' '}
          This static site has no bandwidth data for the last 24 hours. Check
          back again tomorrow.{' '}
        </span>
      </div>
    </div>
  );
};

export default MetricScreen;
