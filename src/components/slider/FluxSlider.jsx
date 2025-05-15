import React, { useState } from 'react';

const FluxSlider = ({ 
  initialValue = 3, 
  min = 1, 
  max = 6, 
  step = 1,
  label = 'Duration',
  onChange = null,
  setCompDuration,
  disableSelect
}) => {
  // Definimos los intervalos de tiempo disponibles
  const timeIntervals = [
    { value: 5040, label: '1 week' },
    { value: 10080, label: '2 weeks' },
    { value: 20160, label: '1 month' },
    { value: 60480, label: '3 month' },
    { value: 120960, label: '6 month' },
    { value: 241920, label: '1 year' }
  ];
  
  // Aseguramos que el valor inicial sea válido
  const validInitialValue = Math.min(Math.max(initialValue, min), max);
  const [duration, setDuration] = useState(validInitialValue);
  const [isDragging, setIsDragging] = useState(false);
  
  // Para obtener el intervalo actualmente seleccionado
  const currentInterval = timeIntervals[duration - 1];
  
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setDuration(newValue);
    setCompDuration(timeIntervals[newValue - 1].value);
    
    // Si hay un callback, lo llamamos con el intervalo actual
    if (onChange) {
      onChange(timeIntervals[newValue - 1]);
    }
  };
  
  return (
    <div className={`slider-container ${disableSelect ? "disabled" : ''}`}>
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
            style={{ width: `${(duration - min) / (max - min) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default FluxSlider;