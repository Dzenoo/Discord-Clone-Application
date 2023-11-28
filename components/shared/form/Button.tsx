import { ButtonProps } from "@/types/button";

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  children,
  disabled,
  variant,
}) => {
  enum ButtonVariant {
    primary = "bg-[#4857f4] hover:bg-[#3b47d8] font-bold",
    secondary = "bg-[#45da5b] hover:bg-[#45da5bcd] font-bold",
    danger = "bg-[#f04747] hover:bg-[#f04747dc] font-bold",
  }

  const variantButton = ButtonVariant[variant];

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${variantButton} p-3 rounded-md text-[13px] text-white w-full disabled:opacity-30 disabled:cursor-not-allowed transition-all`}
    >
      {children}
    </button>
  );
};

export default Button;
