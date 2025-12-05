import React, { useState } from 'react';
import { styles } from '../src/styles/styles';

function SearchSection({ onImageUpdate }) {
  const [searchName, setSearchName] = useState('');
  const [displayImage, setDisplayImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchName.trim()) {
      alert('Please enter a character name to search');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/getImage?name=${searchName}`);
      const data = await response.json();
      
      if (data.success && data.imagePath) {
        setDisplayImage(`http://localhost:3000/${data.imagePath}?t=${Date.now()}`);
        onImageUpdate(`Found image for "${searchName}"!`, 'success');
      } else {
        onImageUpdate(data.message || 'Image not found', 'error');
      }
    } catch (error) {
      onImageUpdate('Error searching for image', 'error');
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.heading}>🔍 Search for Image</h2>
      <div style={styles.inputGroup}>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Enter character name (e.g., tom, jerry, dog)"
          style={styles.input}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          style={styles.searchButton}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {displayImage && (
        <div style={styles.imageContainer}>
          <img
            src={displayImage}
            alt={searchName}
            style={styles.image}
          />
        </div>
      )}
    </div>
  );
}

export default SearchSection;