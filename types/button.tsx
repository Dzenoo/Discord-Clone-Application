export interface ButtonProps {
  type: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}
