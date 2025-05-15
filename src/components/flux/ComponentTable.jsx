// ComponentsTable.jsx
import Image from 'next/image';
import React, { useState } from 'react';


const ComponentsTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  
  const components = [
    { 
      id: 1, 
      source: 'github', 
      name: 'Comp 1', 
      status: 'Done', 
      user: '', 
      repository: '', 
      branch: 'Pull private image',
      pipelineUrl: 'https://github.com/BenjaminAguirre/griseu/Actions/runs/1376913457'
    },
    { 
      id: 2, 
      source: 'azure', 
      name: 'Comp 2', 
      status: 'Done', 
      user: '', 
      repository: '', 
      branch: 'Pull private image',
      pipelineUrl: 'https://github.com/BenjaminAguirre/griseu/Actions/runs/1376913457'
    },
    { 
      id: 3, 
      source: 'gitlab', 
      name: 'Comp 3', 
      status: 'Building', 
      user: 'benjaminaguirre', 
      repository: 'BenjaminAguirre/PartyAccess', 
      branch: 'Main',
      pipelineUrl: 'https://github.com/BenjaminAguirre/griseu/Actions/runs/1376913457'
    },
    { 
      id: 4, 
      source: 'gitlab', 
      name: 'Comp 4', 
      status: 'Done', 
      user: 'benjaminaguirre', 
      repository: 'BenjaminAguirre/EarlyAccess', 
      branch: 'Main',
      pipelineUrl: 'https://github.com/BenjaminAguirre/griseu/Actions/runs/1376913457'
    },
  ];
  
  const handleRowClick = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
    }
  };
  
  return (
    <div className="components-container">
      <h3>Components</h3>
      
      <div className="table-container">
        <table className="components-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Name</th>
              <th>Status</th>
              <th>User</th>
              <th>Repository</th>
              <th>Branch</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {components.map((component) => (
              
              <>
              <tr 
                key={component.id}
                onClick={() => handleRowClick(component.id)}
                className={expandedRow === component.id ? "row-active" : ""}
              >  
                <td>
                  {component.source === 'github' && (
                    <div className="icon github-icon"></div>
                  )}
                  {component.source === 'azure' && (
                    <div className="icon azure-icon"></div>
                  )}
                  {component.source === 'gitlab' && (
                    <div className="icon gitlab-icon"></div>
                  )}
                </td>
                <td>{component.name}</td>
                <td>
                  {component.status === 'Done' && (
                    <span className="status-badge done">
                      <span className="check-icon">✓</span> Done
                    </span>
                  )}
                  {component.status === 'Building' && (
                    <span className="status-badge building">Building</span>
                  )}
                  {component.status === 'Build' && (
                    <span className="status-badge build">Build</span>
                  )}
                </td>
                <td>{component.user}</td>
                <td>{component.repository}</td>
                <td>{component.branch}</td>
                <td>
                  
                <Image onClick={(e) => e.stopPropagation()} src='/edit.png' width={18} height={18} alt=''/>
                </td>
                <td>
                <Image onClick={(e) => e.stopPropagation()} src='/deleteL.png' width={18} height={18} alt=''/>
                </td>
              </tr>
              {expandedRow === component.id && (
                <tr className="expanded-row">
                  <td colSpan={8}>
                    <div className="pipeline-info-container">
                      <div className="pipeline-info">
                        <span className="success-icon">✓</span>
                        <span className="pipeline-text">The pipeline has finished successfully.</span>
                      </div>
                        <a href={component.pipelineUrl} className="pipeline-link">{component.pipelineUrl}</a>
                    </div>
                  </td>
                </tr>
              )}
            </>
              
             
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="action-buttons">
        <button className="build-all-button">Build All</button>
        <button className="continue-button">Continue</button>
      </div>
    </div>
  );
};

export default ComponentsTable;