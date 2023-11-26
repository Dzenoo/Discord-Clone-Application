import { ButtonProps } from "@/types/button";

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  children,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className="p-3 rounded-md bg-[#4857f4] text-white font-bold w-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#3b47d8] transition-all"
    >
      {children}
    </button>
  );
};

export default Button;
