import React, { forwardRef, useState } from 'react'

const Step3 = forwardRef(({ onNextStep,repo }, ref) => {
  const [inputClassName, setInputClassName] = useState('');
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onNextStep();
      setInputClassName('newClassName');
    }
  };
  return (
    <div style={{marginTop:'50px'}} ref={ref}>
        <div className="repo-selected">
          <div className="circle1"> </div>
          <h5> GitHub repository:</h5>
          <span> gridClient/repo-0{repo}</span>

        </div>
        <div className="repo-selected">
          <div className="circle1"> </div>
          <h5> GitHub branch:</h5>
          <span> main</span>
          <p> Change </p>
        </div>
        <div className="repo-path">
          <span> Specify your application root path.</span>
          <label> Application root path:</label>
          <input className={inputClassName}  placeholder="./" onKeyDown={handleKeyDown} />
          
        </div>
        {/* <button className='boton-continue' onClick={()=>onNextStep()}>Continue</button> */}

    </div>
  )
})
Step3.displayName = 'Step3'
export default Step3