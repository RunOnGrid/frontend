import React from 'react';

const TeamAssistance = () => {
  return (
    <div className="assistance-container">
      <p className="main-text">
        Do you need <strong>assistance transferring workloads?</strong> We help
        teams.
      </p>
      <button className="create-team-button">+ Create a team</button>
      <p className="footer-text">
        <span className="info-icon"></span> Access more features like{' '}
        <strong>creating workspaces</strong> and <strong>Back-ups</strong> by
        upgrading to a team plan.
      </p>
    </div>
  );
};

export default TeamAssistance;
