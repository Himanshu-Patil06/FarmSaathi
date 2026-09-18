import { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <span>{type === "success" ? "✓" : "!"}</span>
      <p>{message}</p>

      <button onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
