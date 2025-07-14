import React, { useState } from 'react';

const SliderComp = ({
  initialDuration = 2,
  min = 1,
  max = 52,
  step = 1,
  label = "",
  unit = "",
  unitPlural = "",
  setInstances,
  darkMode,
}) => {
  const [duration, setDuration] = useState(initialDuration);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    setDuration(parseInt(e.target.value, 10));
    setInstances(parseInt(e.target.value));
  };

  return (
    <div className={`slider-container ${darkMode ? "dark" : "light"}`}>
      <div className="slider-label">
        <span>
          {label}: {duration}
          {unit && ` ${duration === 1 ? unit : unitPlural}`}
        </span>
      </div>
      <div className="slider-wrapper">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={duration}
          onChange={handleChange}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className={isDragging ? "slider dragging" : "slider"}
        />
        <div className="slider-track">
          <div
            className="slider-progress"
            style={{ width: `${((duration - min) / (max - min)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SliderComp;