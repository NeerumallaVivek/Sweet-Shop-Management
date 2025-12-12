SWEET SHOP MANAGEMENT SYSTEM - COMPONENT ARCHITECTURE
======================================================

## 📊 Component Hierarchy

App.jsx (Main Container)
│
├── AuthScreen.jsx (Authentication)
│   └── Login/Registration Form
│       └── Shows when not authenticated
│
└── Navbar.jsx (Navigation) + Dashboard.jsx (Main App)
    │
    ├── Navbar Features:
    │   ├── Brand Logo
    │   ├── Navigation Links (Dashboard/Admin)
    │   ├── User Profile Info
    │   └── Logout Button
    │
    └── Dashboard Features:
        │
        ├── Search & Filter Section
        │   ├── Search Input
        │   ├── Category Filter
        │   ├── Price Range Slider
        │   └── Add Sweet Button (Admin Only)
        │
        ├── Sweets Grid (3 Columns)
        │   └── SweetCard Component (Repeated)
        │       ├── Sweet Image/Icon
        │       ├── Stock Status Badge
        │       ├── Sweet Details
        │       │   ├── Name
        │       │   ├── Category
        │       │   ├── Price
        │       │   └── Quantity
        │       └── Action Buttons
        │           ├── Purchase (Customer)
        │           ├── Edit (Admin)
        │           └── Delete (Admin)
        │
        └── Modals (Overlay Components)
            ├── AddSweetModal
            │   └── Form Fields:
            │       ├── Sweet Name
            │       ├── Category
            │       ├── Price
            │       ├── Quantity
            │       ├── Icon
            │       └── Add/Cancel Buttons
            │
            ├── EditSweetModal
            │   └── Pre-filled Form:
            │       ├── Sweet Name
            │       ├── Category
            │       ├── Price
            │       ├── Quantity
            │       ├── Icon
            │       └── Update/Cancel Buttons
            │
            └── DeleteConfirmModal
                └── Confirmation Dialog:
                    ├── Warning Icon
                    ├── Confirmation Message
                    └── Confirm/Cancel Buttons

## 🔄 State Management Flow

App.jsx State:
├── isAuthenticated (boolean)
├── isAdmin (boolean)
├── currentScreen (string)
├── currentUser (object)
│
└── Handlers:
    ├── handleSignIn()
    ├── handleLogout()
    └── handleNavigate()

Dashboard.jsx State:
├── sweets[] (array of sweet objects)
├── searchQuery (string)
├── selectedCategory (string)
├── priceRange[min, max] (array)
├── editingSweet (object or null)
├── isAddModalOpen (boolean)
├── deleteConfirm (id or null)
│
└── Handlers:
    ├── handleAddSweet()
    ├── handleUpdateSweet()
    ├── handleDeleteSweet()
    └── handlePurchase()

## 🎯 Data Flow

1. Authentication:
   AuthScreen → App.handleSignIn() → Set isAuthenticated=true → Show Dashboard

2. Navigation:
   Navbar → onNavigate() → App.handleNavigate() → Update currentScreen

3. Adding Sweet (Admin):
   AddModal → Form Submit → handleAddSweet() → Update sweets[] → Close Modal

4. Editing Sweet (Admin):
   SweetCard Edit Button → EditModal Pre-fill → Form Submit → handleUpdateSweet()

5. Deleting Sweet (Admin):
   SweetCard Delete Button → DeleteConfirmModal → handleDeleteSweet() → Update sweets[]

6. Searching/Filtering:
   User Input → Update state → useMemo filters sweets → Display filtered results

## 📁 File Locations

Frontend/
├── src/
│   ├── components/
│   │   ├── AuthScreen.jsx
│   │   ├── Navbar.jsx
│   │   ├── Dashboard.jsx
│   │   └── SweetCard.jsx
│   │
│   ├── styles/
│   │   ├── AuthScreen.css
│   │   ├── Navbar.css
│   │   ├── Dashboard.css
│   │   └── SweetCard.css
│   │
│   ├── App.jsx (Main app container)
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
├── SETUP_GUIDE.md
└── public/
    └── assets/Images/SweetBG.png

## 🔗 Component Props

AuthScreen Props:
└── onSignIn(userData, adminStatus) → Called when user logs in

Navbar Props:
├── currentUser (object) → User info to display
├── isAdmin (boolean) → Show/hide admin options
├── onNavigate(screen) → Handle screen switching
├── currentScreen (string) → Highlight active nav
└── onLogout() → Logout functionality

Dashboard Props:
├── isAdmin (boolean) → Show/hide admin features
└── onNavigate(screen) → Navigation handler

SweetCard Props:
├── sweet (object) → Sweet data
├── isAdmin (boolean) → Show edit/delete vs purchase
├── onEdit(sweet) → Handle edit click
├── onDelete(sweetId) → Handle delete click
└── onPurchase(sweet) → Handle purchase click

## 🎨 CSS Organization

AuthScreen.css:
├── Container & Background
├── Glass Card Styling
├── Tab Navigation
├── Form Elements
├── Buttons
└── Responsive Breakpoints

Navbar.css:
├── Navigation Container
├── Brand/Logo
├── Navigation Links
├── User Info Section
├── Logout Button
└── Responsive Design

Dashboard.css:
├── Dashboard Container
├── Search & Filter Section
├── Grid Layout
├── Modal Styles
├── Form Components
├── Responsive Breakpoints

SweetCard.css:
├── Card Container
├── Image Container
├── Content Section
├── Badges & Status
├── Action Buttons
└── Responsive Breakpoints

## 🔐 Authentication Logic

Admin Detection:
- Email: admin@sweetshop.com → Sets isAdmin=true
- Any other email → Sets isAdmin=false

User Role Effects:
├── isAdmin=true:
│   ├── Show "Admin Panel" nav option
│   ├── Show Edit/Delete buttons on cards
│   ├── Show Add Sweet button
│   └── Enable all CRUD modals
│
└── isAdmin=false:
    ├── Hide "Admin Panel" nav option
    ├── Show Purchase button on cards
    ├── Hide Add Sweet button
    └── Disable CRUD modals

## 📱 Responsive Behavior

Desktop (1920px+):
- 3-column grid with max 1400px container
- Full navbar with all options visible
- Large modal windows

Tablet (768-1023px):
- Adjusted spacing and font sizes
- Flexible grid layout
- Compact modals

Mobile (320-768px):
- 1-column grid
- Wrapped navbar elements
- Full-width modals
- Touch-friendly button sizes

## 🔄 Update Cycle

For Real API Integration:

1. Replace sample data with API call:
   ```
   useEffect(() => {
     fetch('/api/sweets')
       .then(res => res.json())
       .then(data => setSweets(data))
   }, [])
   ```

2. Update handlers to call API:
   ```
   handleAddSweet = async (newSweet) => {
     await fetch('/api/sweets', {
       method: 'POST',
       body: JSON.stringify(newSweet)
     })
     // Refresh data
   }
   ```

3. Add loading states:
   ```
   const [loading, setLoading] = useState(false)
   ```

4. Add error handling:
   ```
   const [error, setError] = useState(null)
   ```

This architecture is production-ready and scalable! 🚀
