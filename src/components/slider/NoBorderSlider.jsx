import React, { useState, useEffect } from 'react';

const NoBorderSlider = ({ 
  initialDuration = 2, 
  min = 1, 
  max = 52, 
  step = 1,
  label = '',
  unit = '',
  unitPlural = '',
  onChange = null,
  customize
}) => {
  const [duration, setDuration] = useState(initialDuration);
  const [isDragging, setIsDragging] = useState(false);
  
  // Actualizar el valor interno cuando cambie initialDuration (para sincronizar con el padre)
  useEffect(() => {
    setDuration(initialDuration);
  }, [initialDuration]);
  
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setDuration(newValue);
    
    // Llamar a la función onChange si existe para comunicar el cambio al componente padre
    if (onChange) {
      onChange(newValue);
    }
  };
  
  return (
    <div style={{ opacity: customize ? 0.6 : 1 }} className="no-slider-container">
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
          disabled={customize}
          
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

export default NoBorderSlider;