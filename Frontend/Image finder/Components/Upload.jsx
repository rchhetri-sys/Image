import React, { useState } from 'react';
import { styles } from '../src/styles/styles';

function UploadSection({ onImageUpdate }) {
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadName, setUploadName] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadFile(file);
    } else {
      onImageUpdate('Please select a valid image file', 'error');
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) {
      onImageUpdate('Please select an image file', 'error');
      return;
    }

    if (!uploadName.trim()) {
      onImageUpdate('Please enter a character name', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('image', uploadFile);

    setIsUploading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/upload?name=${uploadName}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        onImageUpdate(`Successfully uploaded image for "${uploadName}"!`, 'success');
        setUploadFile(null);
        setUploadName('');
        document.getElementById('fileInput').value = '';
      } else {
        onImageUpdate(data.error || 'Upload failed', 'error');
      }
    } catch (error) {
      onImageUpdate('Error uploading image', 'error');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.heading}>📤 Upload New Image</h2>
      
      <div style={styles.formGroup}>
        <label style={styles.label}>Character Name</label>
        <input
          type="text"
          value={uploadName}
          onChange={(e) => setUploadName(e.target.value)}
          placeholder="e.g., tom, jerry, dog"
          style={styles.input}
        />
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Select Image File</label>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={isUploading}
        style={styles.uploadButton}
      >
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </button>
    </div>
  );
}

export default UploadSection;
