import React, { useState, useMemo, useEffect } from 'react';
import SweetCard from './SweetCard';
import { getAllSweets, addSweet, updateSweet, deleteSweet, uploadImage, purchaseSweet } from '../services/sweetService';
import '../styles/Dashboard.css';

export const Dashboard = ({ isAdmin, onNavigate, searchQuery = '', selectedCategory = 'All', currentUser }) => {
  const [editingSweet, setEditingSweet] = useState(null);
  const [restockSweet, setRestockSweet] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sweetsList, setSweetsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  // Fetch sweets from backend on mount
  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    setLoading(true);
    const result = await getAllSweets();
    if (result.success) {
      setSweetsList(result.data);
    } else {
      setError('Failed to load sweets. Please try again.');
    }
    setLoading(false);
  };

  // Filter sweets based on search and category
  const filteredSweets = useMemo(() => {
    return sweetsList.filter((sweet) => {
      const matchName = sweet.sweetName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategory === 'All' || sweet.sweetCategory === selectedCategory;
      return matchName && matchCategory;
    });
  }, [sweetsList, searchQuery, selectedCategory]);

  const handleAddSweet = async (newSweet) => {
    const result = await addSweet(newSweet);
    if (result.success) {
      setSweetsList([...sweetsList, result.data]);
      setIsAddModalOpen(false);
    } else {
      alert(result.error);
    }
  };

  const handleRestockUpdate = async (updatedSweet) => {
    const result = await updateSweet(updatedSweet.sweetId, updatedSweet);
    if (result.success) {
      setSweetsList(sweetsList.map((sweet) => (sweet.sweetId === updatedSweet.sweetId ? result.data : sweet)));
      setRestockSweet(null);
    } else {
      alert(result.error);
    }
  };

  const handleUpdateSweet = async (updatedSweet) => {
    const result = await updateSweet(updatedSweet.sweetId, updatedSweet);
    if (result.success) {
      setSweetsList(sweetsList.map((sweet) => (sweet.sweetId === updatedSweet.sweetId ? result.data : sweet)));
      setEditingSweet(null);
    } else {
      alert(result.error);
    }
  };

  const handleDeleteSweet = async (sweetId) => {
    const result = await deleteSweet(sweetId);
    if (result.success) {
      setSweetsList(sweetsList.filter((sweet) => sweet.sweetId !== sweetId));
      setDeleteConfirm(null);
    } else {
      alert(result.error);
    }
  };

  const handlePurchase = async (sweet) => {
    if (purchaseLoading) return;

    // Optimistic update (optional) or wait for server
    // Let's wait for server to be safe
    setPurchaseLoading(true);
    const result = await purchaseSweet(sweet.sweetId, 1);

    if (result.success) {
      // Update the sweet in the list with the new data from server
      setSweetsList(sweetsList.map((s) => (s.sweetId === sweet.sweetId ? result.data : s)));
      alert(`Successfully purchased ${sweet.sweetName}!`);
    } else {
      alert(`Purchase failed: ${result.error}`);
    }
    setPurchaseLoading(false);
  };

  if (loading) return <div className="dashboard-loading">Loading sweets...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-welcome" style={{ marginBottom: '20px', padding: '0 20px' }}>
        <h2 style={{ color: '#2d3748', fontSize: '1.8rem' }}>
          Welcome, {currentUser?.name || currentUser?.username || 'Guest'}! 👋
        </h2>
        <p style={{ color: '#718096' }}>Discover our fresh collection of sweets</p>
      </div>

      {error && <div className="dashboard-error">{error}</div>}

      {/* Add Sweet Button - Admin Only */}
      {isAdmin && (
        <div className="dashboard-header">
          <button
            className="btn-add-sweet"
            onClick={() => setIsAddModalOpen(true)}
            title="Add a new sweet to the inventory"
          >
            ➕ Add New Sweet
          </button>
        </div>
      )}

      {/* Sweets Grid */}
      <div className="sweets-grid">
        {filteredSweets.length > 0 ? (
          filteredSweets.map((sweet) => (
            <SweetCard
              key={sweet.sweetId}
              sweet={sweet}
              isAdmin={isAdmin}
              onEdit={setEditingSweet}
              onDelete={(sweetId) => setDeleteConfirm(sweetId)}
              onPurchase={handlePurchase}
              onRestock={setRestockSweet}
            />
          ))
        ) : (
          <div className="no-results">
            <span className="no-results-icon">😢</span>
            <p>No sweets found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add Sweet Modal */}
      {isAddModalOpen && (
        <AddSweetModal onAdd={handleAddSweet} onClose={() => setIsAddModalOpen(false)} />
      )}

      {/* Edit Sweet Modal */}
      {editingSweet && (
        <EditSweetModal
          sweet={editingSweet}
          onUpdate={handleUpdateSweet}
          onClose={() => setEditingSweet(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          sweetId={deleteConfirm}
          sweetName={sweetsList.find((s) => s.sweetId === deleteConfirm)?.sweetName || ''}
          onConfirm={() => handleDeleteSweet(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
      {/* Restock Modal */}
      {restockSweet && (
        <RestockModal
          sweet={restockSweet}
          onUpdate={handleRestockUpdate}
          onClose={() => setRestockSweet(null)}
        />
      )}
    </div>
  );
};

// Add Sweet Modal Component
const AddSweetModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    sweetName: '',
    sweetCategory: 'Chocolate Sweets',
    sweetPrice: '',
    stockQuantity: '',
    sweetImage: '🍬',
  });
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const result = await uploadImage(file);
      if (result.success) {
        setFormData({ ...formData, sweetImage: result.url });
      } else {
        alert('Image upload failed');
      }
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.sweetName && formData.sweetPrice && formData.stockQuantity) {
      onAdd({
        ...formData,
        sweetPrice: parseFloat(formData.sweetPrice),
        stockQuantity: parseInt(formData.stockQuantity),
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Sweet</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Sweet Name *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Chocolate Truffle"
              value={formData.sweetName}
              onChange={(e) => setFormData({ ...formData, sweetName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-input"
              value={formData.sweetCategory}
              onChange={(e) => setFormData({ ...formData, sweetCategory: e.target.value })}
            >
              <option value="Traditional Sweets">Traditional Sweets</option>
              <option value="Chocolate Sweets">Chocolate Sweets</option>
              <option value="Dry Fruit Sweets">Dry Fruit Sweets</option>
              <option value="Milk-Based Sweets">Milk-Based Sweets</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                className="form-input"
                placeholder="50"
                min="0"
                step="0.01"
                value={formData.sweetPrice}
                onChange={(e) => setFormData({ ...formData, sweetPrice: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity *</label>
              <input
                type="number"
                className="form-input"
                placeholder="10"
                min="0"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Success Image</label>
            <div className="file-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <span style={{ fontSize: '0.8rem', color: '#718096', display: 'block', marginTop: '5px' }}>
                {uploading ? 'Uploading...' : 'Upload an image from your device'}
              </span>
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>Or</div>
            <input
              type="text"
              className="form-input"
              placeholder="Paste image URL (https://...)"
              value={formData.sweetImage}
              onChange={(e) => setFormData({ ...formData, sweetImage: e.target.value })}
              style={{ marginTop: '10px' }}
            />
          </div>



          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Add Sweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Sweet Modal Component
const EditSweetModal = ({ sweet, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(sweet);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const result = await uploadImage(file);
      if (result.success) {
        setFormData({ ...formData, sweetImage: result.url });
      } else {
        alert('Image upload failed');
      }
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      sweetPrice: parseFloat(formData.sweetPrice),
      stockQuantity: parseInt(formData.stockQuantity),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Sweet</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Sweet Name *</label>
            <input
              type="text"
              className="form-input"
              value={formData.sweetName}
              onChange={(e) => setFormData({ ...formData, sweetName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-input"
              value={formData.sweetCategory}
              onChange={(e) => setFormData({ ...formData, sweetCategory: e.target.value })}
            >
              <option value="Traditional Sweets">Traditional Sweets</option>
              <option value="Chocolate Sweets">Chocolate Sweets</option>
              <option value="Dry Fruit Sweets">Dry Fruit Sweets</option>
              <option value="Milk-Based Sweets">Milk-Based Sweets</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (₹) *</label>
              <input
                type="number"
                className="form-input"
                min="0"
                step="0.01"
                value={formData.sweetPrice}
                onChange={(e) => setFormData({ ...formData, sweetPrice: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity *</label>
              <input
                type="number"
                className="form-input"
                min="0"
                value={formData.stockQuantity}
                onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Success Image</label>
            <div className="file-upload-container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <span style={{ fontSize: '0.8rem', color: '#718096', display: 'block', marginTop: '5px' }}>
                {uploading ? 'Uploading...' : 'Upload an image from your device'}
              </span>
            </div>
            <div style={{ marginTop: '10px', textAlign: 'center' }}>Or</div>
            <input
              type="text"
              className="form-input"
              placeholder="Paste image URL (https://...)"
              value={formData.sweetImage}
              onChange={(e) => setFormData({ ...formData, sweetImage: e.target.value })}
              style={{ marginTop: '10px' }}
            />
          </div>

          {formData.sweetImage && formData.sweetImage !== '🍬' && (
            <div className="form-group">
              <label className="form-label">Preview</label>
              <div style={{ marginTop: '0.5rem', textAlign: 'center', backgroundColor: '#f7fafc', padding: '10px', borderRadius: '8px' }}>
                <img
                  src={formData.sweetImage}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px', objectFit: 'contain' }}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Update Sweet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ sweetName, onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content modal-confirm" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Delete Sweet</h2>
        </div>

        <div className="confirm-message">
          <span className="confirm-icon">⚠️</span>
          <p>Are you sure you want to delete <strong>{sweetName}</strong>?</p>
          <p className="confirm-subtext">This action cannot be undone.</p>
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};



// Restock Modal Component
const RestockModal = ({ sweet, onUpdate, onClose }) => {
  const [stockQuantity, setStockQuantity] = useState(sweet.stockQuantity);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...sweet,
      stockQuantity: parseInt(stockQuantity),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Restock Sweet</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <p style={{ marginBottom: '15px', color: '#4a5568' }}>
            Update quantity for <strong>{sweet.sweetName}</strong>
          </p>

          <div className="form-group">
            <label className="form-label">New Quantity *</label>
            <input
              type="number"
              className="form-input"
              min="0"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              required
              autoFocus
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
