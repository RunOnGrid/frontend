const Input = ({ placeholder, className }) => (
  <input
    type="text"
    placeholder={placeholder}
    style={{
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      width: "100%",
    }}
    className={className}
  />
);

export default Input;
