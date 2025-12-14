import React from 'react';
import '../styles/SweetCard.css';

// Image mapping using Vite's new URL syntax - more reliable for asset bundling
const sweetImageMap = {
  1: new URL('../assets/Images/Kajukatli.jfif', import.meta.url).href,
  2: new URL('../assets/Images/Boondhi_laddu.jfif', import.meta.url).href,
  5: new URL('../assets/Images/Chocolate_Barfi.jfif', import.meta.url).href,
  6: new URL('../assets/Images/Chocolate_fudge.jfif', import.meta.url).href,
  9: new URL('../assets/Images/Anjeer_Barfi.jfif', import.meta.url).href,
  10: new URL('../assets/Images/DryFruit_Laddu.jfif', import.meta.url).href,
  13: new URL('../assets/Images/Rasmalai.jfif', import.meta.url).href,
  14: new URL('../assets/Images/Gulabjamun.jfif', import.meta.url).href,
};

export const SweetCard = ({ sweet, isAdmin, onEdit, onDelete, onPurchase, onRestock }) => {
  const isOutOfStock = sweet.stockQuantity === 0;
  const isLowStock = sweet.stockQuantity > 0 && sweet.stockQuantity <= 10;
  // Use image from backend if available, otherwise check map, otherwise default
  const sweetImage = sweet.sweetImage || sweetImageMap[sweet.sweetId];

  return (
    <div className="sweet-card">
      {/* Image Section */}
      <div className="sweet-image-section">
        <div className="sweet-image-placeholder">
          {sweetImage && sweetImage !== '🍬' ? (
            <img
              src={sweetImage}
              alt={sweet.sweetName}
              className="sweet-image"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          ) : (
            <span className="image-icon">🍬</span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="sweet-content">
        {/* Sweet Name */}
        <h3 className="sweet-name">{sweet.sweetName}</h3>

        {/* Category Chip */}
        <div className="category-chip">
          {sweet.sweetCategory}
        </div>

        {/* Price and Stock Info */}
        <div className="sweet-info">
          <span className="sweet-price">₹{sweet.sweetPrice}</span>
          <span className={`stock-badge ${isOutOfStock ? 'out-of-stock' : isLowStock ? 'low-stock' : 'in-stock'}`}>
            {isOutOfStock ? 'Out of Stock' : isLowStock ? `Low Stock (${sweet.stockQuantity})` : `In Stock (${sweet.stockQuantity})`}
          </span>
        </div>

        {/* Action Button */}
        <div className="sweet-actions">
          {isAdmin ? (
            <>
              <button className="btn btn-edit" onClick={() => onEdit(sweet)}>
                ✏️ Edit
              </button>
              <button className="btn btn-restock" onClick={() => onRestock(sweet)} style={{ backgroundColor: '#2b6cb0', color: 'white' }}>
                📦 Restock
              </button>
              <button className="btn btn-delete" onClick={() => onDelete(sweet.sweetId)}>
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
