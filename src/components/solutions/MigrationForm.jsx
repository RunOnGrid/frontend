import React from 'react';

const MigrationForm = () => {
  return (
    <div className="migration-form">
      <h1> Migrate Now</h1>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>What is your work email?(required)</label>
        <input placeholder="Ex: sophon@acme.com" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>What is your company name?(required)</label>
        <input placeholder="Ex: Acme" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label>What is your work website?(required)</label>
        <input placeholder="Ex: https://acme.com" />
      </div>
      <button>Submit </button>
    </div>
  );
};

export default MigrationForm;
