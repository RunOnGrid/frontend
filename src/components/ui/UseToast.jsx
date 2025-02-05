import { useState } from "react";

const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const toast = ({ title, description, duration = 5000 }) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, title, description }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };

  return { toast, toasts };
};

export default useToast;
