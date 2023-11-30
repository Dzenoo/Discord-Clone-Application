export interface DialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  children: React.ReactNode;
}
