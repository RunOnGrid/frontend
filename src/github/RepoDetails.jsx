import React from 'react'

const  RepoDetails = ({ repoContents }) => {
    return (
      <div style={{color:'white'}} >
        {/* Display or use repoContents as needed */}
        <pre>{JSON.stringify(repoContents, null, 2)}</pre>
      </div>
    );
  };

export default RepoDetails
