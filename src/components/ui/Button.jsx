const Button = ({ children, onClick, disabled, className }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "8px 16px",
      backgroundColor: disabled ? "#ccc" : "#00b174",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
    className={className}
  >
    {children}
  </button>
);

export default Button;
