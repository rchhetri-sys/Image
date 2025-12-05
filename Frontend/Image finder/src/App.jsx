import { useState } from 'react';
import SearchSection from '../Components/Search';
import UploadSection from '../Components/Upload';
import MessageBox from '../Components/Messagebox';
import { styles } from './styles/styles';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleImageUpdate = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  return (
    <div style={styles.container}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        🖼️ Image Finder & Uploader
      </h1>
      
      <MessageBox message={message} type={messageType} />
      
      <SearchSection onImageUpdate={handleImageUpdate} />
      <UploadSection onImageUpdate={handleImageUpdate} />
    </div>
  );
}

export default App
