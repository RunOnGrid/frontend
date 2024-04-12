import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const Step1 = ({onNextStep}) => {
  return (
    <div>
          <h2 style={{fontFamily:'rouben'}}>Build settings</h2>
          <span
            style={{ color: 'rgba(255, 255, 255, 0.686)', fontSize: '0.9rem' }}>
            {' '}
            Specify your GitHub repository.{' '}
          </span>
          <div className="build-button">
            <button onClick={()=>onNextStep()}>
            <Link href='https://github.com/apps/prueba-grid'>
              {' '}
              <Image alt="" src="/github.png" height={15} width={15} /> Install
              the GridCloud app
            </Link>
            </button>
            
          </div>
        </div>
  )
}

export default Step1