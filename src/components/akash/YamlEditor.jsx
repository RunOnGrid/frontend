import React from "react";

export default function YamlEditor({ yaml, onChange }) {
  const lines = yaml.split("\n");

  return (
    <div className="yaml-editor">
      <div className="line-numbers">
        {lines.map((_, index) => (
          <div key={index + 1} className="line-number">
            {index + 1}
          </div>
        ))}
      </div>

      <textarea
        value={yaml}
        onChange={(e) => onChange(e.target.value)}
        spellCheck="false"
      />
    </div>
  );
}
