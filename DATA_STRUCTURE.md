# Complete JSON Data Structure

## Frontend - sweets.json
Located at: `Frontend/src/data/sweets.json`

```json
{
  "sweets": [
    {
      "id": 1,
      "name": "Kaju Katli",
      "category": "Traditional Sweets",
      "price": 60,
      "quantity": 20,
      "icon": "🟨"
    },
    {
      "id": 2,
      "name": "Laddu (Boondi Laddu)",
      "category": "Traditional Sweets",
      "price": 45,
      "quantity": 25,
      "icon": "🔴"
    },
    {
      "id": 3,
      "name": "Rasgulla",
      "category": "Traditional Sweets",
      "price": 50,
      "quantity": 18,
      "icon": "⚪"
    },
    {
      "id": 4,
      "name": "Jalebi",
      "category": "Traditional Sweets",
      "price": 40,
      "quantity": 22,
      "icon": "🟠"
    },
    {
      "id": 5,
      "name": "Chocolate Barfi",
      "category": "Chocolate Sweets",
      "price": 70,
      "quantity": 15,
      "icon": "🟫"
    },
    {
      "id": 6,
      "name": "Chocolate Fudge",
      "category": "Chocolate Sweets",
      "price": 55,
      "quantity": 12,
      "icon": "🍫"
    },
    {
      "id": 7,
      "name": "Chocolate Laddu",
      "category": "Chocolate Sweets",
      "price": 50,
      "quantity": 18,
      "icon": "⚫"
    },
    {
      "id": 8,
      "name": "Chocolate Truffle Bite",
      "category": "Chocolate Sweets",
      "price": 65,
      "quantity": 14,
      "icon": "🍮"
    },
    {
      "id": 9,
      "name": "Anjeer Barfi",
      "category": "Dry Fruit Sweets",
      "price": 85,
      "quantity": 10,
      "icon": "🟫"
    },
    {
      "id": 10,
      "name": "Dry Fruit Laddu",
      "category": "Dry Fruit Sweets",
      "price": 75,
      "quantity": 16,
      "icon": "🟤"
    },
    {
      "id": 11,
      "name": "Badam Barfi",
      "category": "Dry Fruit Sweets",
      "price": 80,
      "quantity": 12,
      "icon": "🟨"
    },
    {
      "id": 12,
      "name": "Pistachio Roll (Pista Roll)",
      "category": "Dry Fruit Sweets",
      "price": 90,
      "quantity": 8,
      "icon": "💚"
    },
    {
      "id": 13,
      "name": "Rasmalai",
      "category": "Milk-Based Sweets",
      "price": 55,
      "quantity": 16,
      "icon": "🤍"
    },
    {
      "id": 14,
      "name": "Milk Cake",
      "category": "Milk-Based Sweets",
      "price": 60,
      "quantity": 14,
      "icon": "🟨"
    },
    {
      "id": 15,
      "name": "Kalakand",
      "category": "Milk-Based Sweets",
      "price": 50,
      "quantity": 20,
      "icon": "⚫"
    },
    {
      "id": 16,
      "name": "Peda",
      "category": "Milk-Based Sweets",
      "price": 45,
      "quantity": 24,
      "icon": "🟤"
    }
  ]
}
```

## Backend - sweets.json
Located at: `backend/sweets.json`

Same structure as frontend + `description` field for each sweet.

---

## Auto-Generated Categories

The following categories are automatically extracted from the data:

```javascript
const categories = ['All', ...new Set(sweets.map((sweet) => sweet.category))]
```

**Result**: `['All', 'Traditional Sweets', 'Chocolate Sweets', 'Dry Fruit Sweets', 'Milk-Based Sweets']`

---

## How It Works in App.jsx

```javascript
import sweetsData from './data/sweets.json'

// Load sweets from JSON
const [sweets] = useState(sweetsData.sweets)

// Auto-generate categories from data
const categories = ['All', ...new Set(sweets.map((sweet) => sweet.category))]

// Passed to Navbar and Dashboard
<Navbar 
  categories={categories}
  searchQuery={searchQuery}
  onSearchChange={setSearchQuery}
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
/>

<Dashboard 
  sweets={sweets}
  searchQuery={searchQuery}
  selectedCategory={selectedCategory}
/>
```

---

## Data Flow

```
sweets.json
    ↓
App.jsx (imports and manages state)
    ↓
    ├→ Navbar (shows search + category dropdown)
    │   └→ Categories auto-generated from data
    │
    └→ Dashboard (filters and displays sweets)
        └→ SweetCard (renders each sweet)
```

---

## Fields Explanation

- **id**: Unique identifier (1-16)
- **name**: Sweet product name
- **category**: Category name (4 unique categories)
- **price**: Price in Rupees (₹)
- **quantity**: Stock count
- **icon**: Emoji representation
- **description** (backend only): Product description

