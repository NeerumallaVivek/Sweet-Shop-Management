import React from 'react';
import '../styles/SweetCard.css';

export const SweetCard = ({ sweet, isAdmin, onEdit, onDelete, onPurchase }) => {
  const isOutOfStock = sweet.quantity === 0;
  const isLowStock = sweet.quantity > 0 && sweet.quantity <= 5;

  return (
    <div className="sweet-card">
      {/* Icon/Image */}
      <div className="sweet-icon">
        {sweet.icon || '🍬'}
      </div>

      {/* Card Content */}
      <div className="sweet-content">
        {/* Sweet Name */}
        <h3 className="sweet-name">{sweet.name}</h3>

        {/* Category Chip */}
        <div className="category-chip">
          {sweet.category}
        </div>

        {/* Price and Stock Info */}
        <div className="sweet-info">
          <span className="sweet-price">₹{sweet.price}</span>
          <span className={`stock-badge ${isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : 'in-stock'}`}>
            {isOutOfStock ? 'Out of Stock' : isLowStock ? `Low Stock (${sweet.quantity})` : `In Stock (${sweet.quantity})`}
          </span>
        </div>

        {/* Action Button */}
        <div className="sweet-actions">
          {isAdmin ? (
            <>
              <button className="btn btn-edit" onClick={() => onEdit(sweet)}>
                ✏️ Edit
              </button>
              <button className="btn btn-delete" onClick={() => onDelete(sweet.id)}>
                🗑️ Delete
              </button>
            </>
          ) : (
            <button
              className={`btn btn-purchase ${isOutOfStock ? 'disabled' : ''}`}
              onClick={() => onPurchase(sweet)}
              disabled={isOutOfStock}
            >
              🛒 Purchase
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetCard;
