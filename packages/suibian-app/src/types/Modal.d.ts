type Modal = {
  message: string;
  show: boolean;
  ttl?: number;
  // onAnimationEnd - You can pass back an onAnimationEnd event to reset state.
  modalType?: string; // Type of modal (warning/confirmation/default)
};
