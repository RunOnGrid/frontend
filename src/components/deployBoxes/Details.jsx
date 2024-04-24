import Image from 'next/image';
import React, { useState, forwardRef } from 'react';

import Botonera from '@/commons/Botonera';
import CountrySelector from './CountrySelector';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Details = forwardRef(({ onNextStep }, ref) => {
  const [values, setValues] = useState({
    range1: 3,
    range2: 100,
    range3: 1,
  });
  const [duration, setDuration] = useState(1);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const delay = 0;
    setTimeout(() => {
      setValues({
        ...values,
        [name]: parseFloat(value),
      });
    }, delay);
  };
  const handleDurationChange = (e) => {
    const selectedDuration = parseInt(e.target.value);
    setDuration(selectedDuration);

    // Adjust the range3 value based on the selected duration
    let newValue;
    switch (selectedDuration) {
      case 1:
        newValue = 1; // 1 week
        break;
      case 2:
        newValue = 4; // 2 weeks
        break;
      case 3:
        newValue = 30; // 1 month
        break;
      case 4:
        newValue = 90; // 3 months
        break;
      case 5:
        newValue = 180; // 6 months
        break;
      case 6:
        newValue = 365; // 1 year
        break;
      default:
        newValue = 1;
    }

    setValues((prevValues) => ({
      ...prevValues,
      range3: newValue,
    }));
  };
  const getDurationLabel = (duration) => {
    switch (duration) {
      case 1:
        return '1 week';
      case 2:
        return '2 weeks';
      case 3:
        return '1 month';
      case 4:
        return '3 months';
      case 5:
        return '6 months';
      case 6:
        return '1 year';
      default:
        return '';
    }
  };
  // State to track the switch status (on/off)
  const [isOn, setIsOn] = useState(false);
  const [isOn2, setIsOn2] = useState(false);
  // Event handler to toggle the switch
  const toggleSwitch = () => {
    setIsOn(!isOn);
  };
  const toggleSwitch2 = () => {
    setIsOn2(!isOn2);
  };

  return (
    <div ref={ref}>
      <Image
        style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}
        alt=""
        width={25}
        height={25}
        src="/dot.png"
      />
      <div style={{ display: 'flex' }}>
        <div className="newServ-container2">
          <h3>Allowed Geolocations</h3>
          <div className="card-newApp3">
            <CountrySelector />
            <div style={{ marginTop: '50px' }}>
              <div className="ranges">
                <label>Instances: {values.range1}</label>
                <input
                  type="range"
                  name="range1"
                  min="3"
                  max="100"
                  step="1"
                  value={values.range1}
                  onChange={handleChange}
                />
              </div>
              <div className="ranges">
                <label>Duration: {getDurationLabel(duration)}</label>
                <input
                  type="range"
                  name="duration"
                  min="1"
                  max="6"
                  step="1"
                  value={duration}
                  onChange={handleDurationChange}
                />
              </div>
              <Botonera titulo="Static IP" />
              <Botonera titulo="Enterprise Application" />
            </div>
          </div>
          <button className="boton-continue" onClick={() => onNextStep()}>
            Continue
          </button>
        </div>
        {/* <WebComponent/> */}
      </div>
    </div>
  );
});

Details.displayName = 'Details';
export default Details;
