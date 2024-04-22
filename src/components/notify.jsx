import React, { useState, useEffect } from "react";
import { Notification } from "konsta/react";

const Notify = ({ isOpen, onClose, title, subtitle, text }) => {
  const [notificationFull, setNotificationFull] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNotificationFull(true);
      setTimeout(() => {
        setNotificationFull(false);
        if (onClose) onClose();
      }, 3000);
    }
  }, [isOpen]);

  return (
    <Notification
      opened={notificationFull}
      title={title}
      titleRightText="now"
      subtitle={subtitle}
      text={text}
    />
  );
};

export default Notify;
