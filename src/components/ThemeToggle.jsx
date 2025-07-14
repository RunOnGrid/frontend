import { useTheme } from "@/ThemeContext";
import Image from "next/image";

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="theme-toggle-container">
      <label className="theme-toggle-switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={toggleDarkMode}
          className="theme-toggle-checkbox"
        />
        <span className="theme-toggle-slider theme-toggle-slider-round">
          <Image
            alt={darkMode ? "Moon icon" : "Sun icon"}
            src={
              darkMode
                ? "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/4199e734-82a5-46a5-4c31-2db16fa2bb00/public" // Moon (for dark mode)
                : "https://imagedelivery.net/EXhaUxjEp-0lLrNJjhM2AA/b74855c2-2b12-4a84-3e53-456f04887b00/public" // Sun (for light mode)
            }
            width={20}
            height={20}
            className="theme-toggle-slider-icon"
          />
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;