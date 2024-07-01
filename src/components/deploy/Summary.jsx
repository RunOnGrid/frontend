import React from 'react';

const Summary = ({
  geolocation = '',
  period = '',
  service = '',
  instanceType = {},
  specs = [],
  price = '',
  mode,
}) => {
  return (
    <div className={`summary-container ${mode ? 'dark' : 'light'}`}>
      <h2>Summary</h2>
      <p>
        <strong>Geolocation:</strong> {geolocation}
      </p>
      <p>
        <strong>Period:</strong> {period}
      </p>
      <p>
        <strong>Service:</strong> {service}
      </p>
      <p>
        <strong>Instance type:</strong> {instanceType.type || ''}
      </p>
      <p>{instanceType.subtype || ''}</p>
      <ul className="specs-list">
        {specs.length > 0 ? (
          specs.map((spec, index) => <li key={index}>{spec}</li>)
        ) : (
          <li>No specs available</li>
        )}
      </ul>
      <div className="price-container">
        <hr />
        <p>
          <strong>Price: {price}</strong>
        </p>
      </div>
    </div>
  );
};

export default Summary;
