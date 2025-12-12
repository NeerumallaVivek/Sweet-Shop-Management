import React, { useState, useMemo } from 'react';
import SweetCard from './SweetCard';
import '../styles/Dashboard.css';

export const Dashboard = ({ isAdmin, onNavigate, searchQuery = '', selectedCategory = 'All', sweets = [] }) => {
  const [editingSweet, setEditingSweet] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [sweetsList, setSweetsList] = useState(sweets);

  // Filter sweets based on search and category
  const filteredSweets = useMemo(() => {
    return sweetsList.filter((sweet) => {
      const matchesSearch = sweet.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || sweet.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [sweetsList, searchQuery, selectedCategory]);

  const handleAddSweet = (newSweet) => {
    setSweetsList([...sweetsList, { ...newSweet, id: Math.max(...sweetsList.map((s) => s.id), 0) + 1 }]);
    setIsAddModalOpen(false);
  };

  const handleUpdateSweet = (updatedSweet) => {
    setSweetsList(sweetsList.map((sweet) => (sweet.id === updatedSweet.id ? updatedSweet : sweet)));
    setEditingSweet(null);
  };

  const handleDeleteSweet = (sweetId) => {
    setSweetsList(sweetsList.filter((sweet) => sweet.id !== sweetId));
    setDeleteConfirm(null);
  };

  const handlePurchase = (sweet) => {
    console.log(`Purchased: ${sweet.name}`);
    // Add your purchase logic here
  };

  return (
    <div className="dashboard">
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
              key={sweet.id}
              sweet={sweet}
              isAdmin={isAdmin}
              onEdit={setEditingSweet}
              onDelete={(sweetId) => setDeleteConfirm(sweetId)}
              onPurchase={handlePurchase}
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
          sweetName={sweetsList.find((s) => s.id === deleteConfirm)?.name || ''}
          onConfirm={() => handleDeleteSweet(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

// Add Sweet Modal Component
const AddSweetModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Chocolate',
    price: '',
    quantity: '',
    icon: '🍬',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.price && formData.quantity) {
      onAdd({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Icon</label>
            <input
              type="text"
              className="form-input"
              placeholder="🍬"
              maxLength="2"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Sweet
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
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
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              className="form-input"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantity *</label>
              <input
                type="number"
                className="form-input"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Icon</label>
            <input
              type="text"
              className="form-input"
              maxLength="2"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Update Sweet
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

export default Dashboard;
