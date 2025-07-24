import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { photos, getPhotosStats, addPhoto, refreshPhotos } from '../data/photosData';
import './PhotoGallery.css';

const PhotoGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('file'); // 'url' or 'file'
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Responsive photos per page
  const photosPerPage = isMobile ? 12 : 24;
  
  const [newPhoto, setNewPhoto] = useState({
    src: '',
    alt: '',
    category: 'celebration',
    caption: '',
    addedBy: ''
  });

  // Safe access to photos and stats
  const safePhotos = photos || [];
  const stats = getPhotosStats() || { totalPhotos: 0, categories: 0 };

  const categories = ['All', 'Vacation', 'Family', 'Sports', 'Adventure', 'Relationship', 'Work', 'Celebration'];
  
  const filteredPhotos = selectedCategory === 'All' 
    ? safePhotos 
    : safePhotos.filter(photo => photo && photo.category && photo.category.includes(selectedCategory.toLowerCase()));

  // Debug logging
  console.log('Photos loaded:', safePhotos.length);
  console.log('First photo:', safePhotos[0]);
  console.log('Filtered photos:', filteredPhotos.length);
  console.log('Stats:', stats);

  // Pagination logic
  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = startIndex + photosPerPage;
  const currentPhotos = filteredPhotos.slice(startIndex, endIndex);

  console.log('Current photos:', currentPhotos.length);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reset to page 1 when switching between mobile/desktop
  useEffect(() => {
    setCurrentPage(1);
  }, [isMobile]);

  // Simulate loading for skeleton animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Show skeleton for 800ms for smooth animation

    return () => clearTimeout(timer);
  }, [currentPage, selectedCategory]);

  // Skeleton loading component
  const PhotoSkeleton = ({ index }) => (
    <div 
      className="photo-skeleton"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="skeleton-image"></div>
      <div className="skeleton-overlay">
        <div className="skeleton-caption"></div>
        <div className="skeleton-author"></div>
      </div>
    </div>
  );

  const openModal = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(startIndex + index);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    const nextIndex = (currentPhotoIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
    setCurrentPhotoIndex(nextIndex);
  };

  const prevPhoto = () => {
    const prevIndex = currentPhotoIndex === 0 ? filteredPhotos.length - 1 : currentPhotoIndex - 1;
    setSelectedPhoto(filteredPhotos[prevIndex]);
    setCurrentPhotoIndex(prevIndex);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
        setNewPhoto(prev => ({ ...prev, src: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setFilePreview(e.target.result);
          setNewPhoto(prev => ({ ...prev, src: e.target.result }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPhoto.caption.trim() && newPhoto.addedBy.trim() && (newPhoto.src.trim() || selectedFile)) {
      addPhoto(newPhoto);
      refreshPhotos(); // Refresh the photos list
      setNewPhoto({
        src: '',
        alt: '',
        category: 'celebration',
        caption: '',
        addedBy: ''
      });
      setSelectedFile(null);
      setFilePreview(null);
      setShowUploadForm(false);
      // Reset to first page when new photo is added
      setCurrentPage(1);
    }
  };

  const handleInputChange = (field, value) => {
    setNewPhoto(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
    setIsLoading(true); // Show skeleton when changing category
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setIsLoading(true); // Show skeleton when changing page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e) => {
    if (!selectedPhoto) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowRight') {
      nextPhoto();
    } else if (e.key === 'ArrowLeft') {
      prevPhoto();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentPhotoIndex, filteredPhotos]);

  // Error handling
  if (!safePhotos || safePhotos.length === 0) {
    return (
      <div className="photo-gallery">
        <div className="gallery-header">
          <h1>📸 Photo Gallery</h1>
          <p>Loading photos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="photo-gallery">
              <div className="gallery-header">
          <h1>📸 Photo Gallery</h1>
          <p>Explore memories from Nathan's life journey!</p>
        </div>

        <div className="add-photo-section">
        <button 
          className="add-photo-btn"
          onClick={() => setShowUploadForm(!showUploadForm)}
        >
          {showUploadForm ? '✕ Cancel' : '📸 Add a Photo'}
        </button>

        {showUploadForm && (
          <form className="photo-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Your Name:</label>
              <input
                type="text"
                value={newPhoto.addedBy}
                onChange={(e) => handleInputChange('addedBy', e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Method:</label>
              <div className="upload-method-toggle">
                <button
                  type="button"
                  className={`toggle-btn ${uploadMethod === 'file' ? 'active' : ''}`}
                  onClick={() => setUploadMethod('file')}
                >
                  📱 Camera Roll / Device
                </button>
                <button
                  type="button"
                  className={`toggle-btn ${uploadMethod === 'url' ? 'active' : ''}`}
                  onClick={() => setUploadMethod('url')}
                >
                  🔗 Photo URL
                </button>
              </div>
            </div>

            {uploadMethod === 'file' ? (
              <div className="form-group">
                <label>Upload Photo:</label>
                <div 
                  className="file-upload-area"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />
                  {filePreview ? (
                    <div className="file-preview">
                      <img src={filePreview} alt="Preview" />
                      <p>{selectedFile?.name}</p>
                    </div>
                  ) : (
                    <div className="upload-placeholder">
                      <span>📷</span>
                      <p>Click to select or drag & drop a photo</p>
                      <small>Supports: JPG, PNG, HEIC, GIF</small>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="form-group">
                <label>Photo URL:</label>
                <input
                  type="url"
                  value={newPhoto.src}
                  onChange={(e) => handleInputChange('src', e.target.value)}
                  placeholder="Enter photo URL (e.g., from Imgur, Google Drive, etc.)"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Photo Caption:</label>
              <input
                type="text"
                value={newPhoto.caption}
                onChange={(e) => handleInputChange('caption', e.target.value)}
                placeholder="Enter a caption for the photo"
                required
              />
            </div>

            <div className="form-group">
              <label>Category:</label>
              <select
                value={newPhoto.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                required
              >
                <option value="celebration">Celebration</option>
                <option value="friends">Friends</option>
                <option value="sports">Sports</option>
                <option value="work">Work</option>
                <option value="adventure">Adventure</option>
                <option value="entertainment">Entertainment</option>
                <option value="family">Family</option>
                <option value="hobbies">Hobbies</option>
                <option value="vacation">Vacation</option>
                <option value="relationship">Relationship</option>
              </select>
            </div>

            <button type="submit" className="submit-photo-btn">
              📸 Add Photo
            </button>
          </form>
        )}
      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category === 'All' && '📷'}
            {category === 'Celebration' && '🎉'}
            {category === 'Friends' && '👥'}
            {category === 'Sports' && '⚾'}
            {category === 'Work' && '💼'}
            {category === 'Adventure' && '🏔️'}
            {category === 'Entertainment' && '🎵'}
            {category === 'Family' && '👨‍👩‍👧‍👦'}
            {category === 'Hobbies' && '🎮'}
            {category === 'Vacation' && '✈️'}
            {category === 'Relationship' && '💕'}
            {category}
          </button>
        ))}
      </div>

      <div className="photos-grid">
        {isLoading ? (
          // Skeleton loading
          Array.from({ length: photosPerPage }, (_, index) => (
            <PhotoSkeleton key={`skeleton-${index}`} index={index} />
          ))
        ) : (
          // Actual photos
          currentPhotos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="photo-item" 
              onClick={() => openModal(photo, index)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <img src={photo.src} alt={photo.alt} onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }} />
              <div className="photo-placeholder" style={{ display: 'none' }}>
                <span>Image not available</span>
              </div>
              <div className="photo-overlay">
                <h3>{photo.caption}</h3>
                {photo.addedBy && <p>Added by: {photo.addedBy}</p>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button 
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}

      <div className="gallery-stats">
        <div className="stats-card">
          <h3>📊 Gallery Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-number">{stats.totalPhotos}</span>
              <span className="stat-label">Total Photos</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{stats.categories}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>
      </div>

      {selectedPhoto && (
        <div className="photo-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <button className="modal-nav modal-prev" onClick={prevPhoto}>‹</button>
            <button className="modal-nav modal-next" onClick={nextPhoto}>›</button>
            <img src={selectedPhoto.src} alt={selectedPhoto.alt} className="modal-image" />
            <div className="modal-info">
              <h3>{selectedPhoto.caption}</h3>
              <p>{selectedPhoto.alt}</p>
              {selectedPhoto.addedBy && <p>Added by: {selectedPhoto.addedBy}</p>}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PhotoGallery; 