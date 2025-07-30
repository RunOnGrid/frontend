import React, { useState } from 'react';
import AppGeoSelect from "../deploy/application/AppGeoSelect";

const FluxSlider = ({
  initialValue = 3,
  min = 1,
  max = 6,
  step = 1,
  label = "Duration",
  onChange = null,
  setCompDuration,
  disableSelect,
  instances,
  setInstances,
  allowedLocations,
  setAllowedLocations,
  forbiddenLocations,
  setForbiddenLocations,
  allSelectedLocations,
  setAllSelectedLocations,
  darkMode,
}) => {
  const timeIntervals = [
    { value: 5040, label: "1 week" },
    { value: 10080, label: "2 weeks" },
    { value: 20160, label: "1 month" },
    { value: 60480, label: "3 month" },
    { value: 120960, label: "6 month" },
    { value: 241920, label: "1 year" },
  ];

  const validInitialValue = Math.min(Math.max(initialValue, min), max);
  const [duration, setDuration] = useState(validInitialValue);
  const [isDraggingDuration, setIsDraggingDuration] = useState(false);
  const [isDraggingInstances, setIsDraggingInstances] = useState(false);

  const currentInterval = timeIntervals[duration - 1];

  const handleDurationChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setDuration(newValue);
    setCompDuration(timeIntervals[newValue - 1].value);
    if (onChange) {
      onChange(timeIntervals[newValue - 1]);
    }
  };

  const handleInstancesChange = (e) => {
    const newVal = parseInt(e.target.value, 10);
    setInstances(newVal);
  };

  return (
    <div>
      <div
        className={`slider-container ${disableSelect ? "disabled" : ""} ${
          darkMode ? "dark" : "light"
        }`}
      >
        <div className="slider-item">
          <div className="slider-label">
            <span>
              {label}: {currentInterval.label}
            </span>
          </div>

          <div className="slider-wrapper">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={duration}
              onChange={handleDurationChange}
              onMouseDown={() => setIsDraggingDuration(true)}
              onMouseUp={() => setIsDraggingDuration(false)}
              onTouchStart={() => setIsDraggingDuration(true)}
              onTouchEnd={() => setIsDraggingDuration(false)}
              className={isDraggingDuration ? "slider dragging" : "slider"}
            />
            <div className="slider-track">
              <div
                className="slider-progress"
                style={{ width: `${((duration - min) / (max - min)) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="slider-item">
          <div className="slider-label">
            <span>Instances: {instances}</span>
          </div>
          <div className="slider-wrapper">
            <input
              type="range"
              min={3}
              max={100}
              step={1}
              value={instances}
              onChange={handleInstancesChange}
              onMouseDown={() => setIsDraggingInstances(true)}
              onMouseUp={() => setIsDraggingInstances(false)}
              onTouchStart={() => setIsDraggingInstances(true)}
              onTouchEnd={() => setIsDraggingInstances(false)}
              className={isDraggingInstances ? "slider dragging" : "slider"}
            />
            <div className="slider-track">
              <div
                className="slider-progress"
                style={{ width: `${((instances - 3) / (100 - 3)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <AppGeoSelect
        allowedLocations={allowedLocations}
        setAllowedLocations={setAllowedLocations}
        forbiddenLocations={forbiddenLocations}
        setForbiddenLocations={setForbiddenLocations}
        darkMode={darkMode}
        allSelectedLocations={allSelectedLocations}
        setAllSelectedLocations={setAllSelectedLocations}
      />
    </div>
  );
};

export default FluxSlider;