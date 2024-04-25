import React from 'react';

const SettingsScreen = () => {
  return (
    <div>
      <div className="notification-screen">
        <h3>Enable application auto-rollback</h3>

        <span>
          If enabled, Porter will automatically trigger a rollback to the last
          successful deployment if any services of the new deployment fail to
          deploy.
        </span>
        <div style={{ margin: '10px' }} className="checkbox-filter">
          <input type="checkbox" />
          <label>Auto-rollback enabled</label>
        </div>
      </div>

      <div className="notification-screen">
        <h3>Export &quot;nippon&quot;</h3>

        <span>Export this application as Grid Cloud YAML.</span>
        <button style={{ margin: '10px' }}> Export</button>
      </div>
      <div className="notification-screen">
        <h3>Delete &quot;nippon&quot;</h3>

        <span>Delete this application and all of its resources.</span>
        <button className="delete"> Delete</button>
      </div>
    </div>
  );
};

export default SettingsScreen;
