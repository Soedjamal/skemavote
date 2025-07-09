const Button = ({
  title = "Button",
  icon,
  onClick,
  className = "",
  disabled,
  type,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn wide-btn ${className}`}
      onClick={onClick}
    >
      {icon} {title}
    </button>
  );
};

export default Button;
