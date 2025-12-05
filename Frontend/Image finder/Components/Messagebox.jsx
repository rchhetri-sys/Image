import React from 'react';
import { styles } from '../styles/styles';

function MessageBox({ message, type }) {
  if (!message) return null;

  const messageStyle = type === 'success' ? styles.successMessage : styles.errorMessage;

  return (
    <div style={{...styles.messageBox, ...messageStyle}}>
      {type === 'success' ? '✓ ' : '✕ '}
      {message}
    </div>
  );
}

export default MessageBox;