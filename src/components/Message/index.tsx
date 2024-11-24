import React from 'react';

const Message: React.FC<MessageProps> = ({ type, text }) => {
  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-700 border-green-500';
      case 'error':
        return 'bg-red-100 text-red-700 border-red-500';
      default:
        return '';
    }
  };

  return (
    <div
      className={`border-l-4 p-4 mb-4 rounded ${getStyles()} shadow-sm`}
      role="alert"
    >
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default Message;
