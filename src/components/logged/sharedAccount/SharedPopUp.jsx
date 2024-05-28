import React from 'react';

const SharedPopUp = ({ handleClose }) => {
  return (
    <div className="popup-container">
      <h2>Update invite for benja.aguirre2599@gmail.com</h2>
      <span>Specify a different role for this user:</span>
      <div className="shared-options">
        <label>
          <input type="radio" name="role" value="Admin" />
          <span>Admin</span>
        </label>
        <label>
          <input type="radio" name="role" value="Developer" />
          <span>Developer</span>
        </label>
        <label>
          <input type="radio" name="role" value="Viewer" defaultChecked />
          <span>Viewer</span>
        </label>
      </div>
      <div className="button-container">
        <button onClick={handleClose} className="discard-button">
          Discard changes
        </button>
        <button onClick={handleClose} className="save2-button">
          Save changes
        </button>
      </div>
    </div>
  );
};

export default SharedPopUp;
