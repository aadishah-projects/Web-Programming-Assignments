# Assignment 8: Simple E-Commerce Cart System - Lab Report

## 1. Objective
The objective of this assignment was to create a functional e-commerce shopping cart system using object-oriented JavaScript. The application demonstrates data management with product objects, cart state manipulation, dynamic UI updates, and real-time calculations of totals and item counts.

## 2. Features Implemented
- **Product Catalog:** Display 8 products with id, name, and price as JavaScript objects
- **Add to Cart:** Button for each product to add it to the shopping cart
- **Cart Display:** Table showing all cart items with details and controls
- **Quantity Management:** Increase/decrease buttons and direct input for quantity modification
- **Remove Items:** Delete button for each cart item
- **Clear Cart:** Button to empty the entire shopping cart with confirmation
- **Dynamic Totals:** Real-time calculation of total items and total price
- **Item Counter:** Badge showing current number of items in cart
- **Responsive Grid:** Product display adapts to screen size

## 3. Technical Implementation
### HTML Structure
- Products grid for displaying product cards
- Cart table with columns for product name, price, quantity, total, and actions
- Cart summary section showing total items and total price
- Control buttons for cart management

### CSS Styling
- Product cards with gradient backgrounds and hover effects
- Responsive grid layout for products (adjusts columns based on screen size)
- Professional table styling with gradient header
- Quantity control buttons with inline layout
- Color-coded buttons (green for add, red for remove, orange for clear)
- Responsive design with breakpoints for tablets and mobile

### JavaScript Logic
- `products`: Array of product objects each containing id, name, and price
- `cart`: Array storing cart items (extends product data with quantity)
- `addToCart()`: Adds product or increments quantity if already in cart
- `removeFromCart()`: Removes item by product id using array filtering
- `updateQuantity()`: Updates quantity with validation (minimum 1)
- `calculateTotalPrice()`: Uses `reduce()` to sum (price × quantity) for all items
- `calculateTotalItems()`: Uses `reduce()` to sum all quantities
- `renderCartTable()`: Dynamically generates table rows from cart array
- `updateCartDisplay()`: Master function that updates all cart-related displays

## 4. Challenges and Solutions
| Challenge | Solution |
|-----------|----------|
| Managing cart state with multiple items | Used array of objects with product id and quantity fields |
| Updating totals dynamically | Implemented `reduce()` method for efficient calculations |
| Add existing product increment vs. new | Used `find()` to check for existing cart items |
| Quantity validation (minimum 1) | Added conditional checks and user alerts for invalid quantities |
| Displaying large price numbers | Used `toFixed(2)` for consistent currency formatting |
| Mobile/tablet responsiveness | Implemented CSS media queries for different screen sizes |
| Preventing accidental cart clearing | Added confirmation dialog before clearing entire cart |

## 5. Learning Outcomes
- Mastered JavaScript object arrays for storing structured data
- Learned array methods: `find()`, `filter()`, `reduce()` for data manipulation
- Practiced dynamic table generation from JavaScript data
- Developed skills in state management for e-commerce applications
- Understood event delegation and onclick handlers
- Learned real-time calculation and display updates
- Practiced input validation and error handling
- Improved understanding of responsive design patterns for e-commerce

## Testing Results
✓ Products display correctly in a responsive grid
✓ Adding product to empty cart creates new cart item
✓ Adding same product again increases quantity
✓ Quantity can be changed via input field and +/- buttons
✓ Remove button deletes item from cart
✓ Cart total calculates correctly with multiple items
✓ Item count updates in real-time
✓ Clear cart removes all items with confirmation
✓ Cart displays empty state message when no items
✓ Price formatting shows two decimal places
✓ Application is responsive on all device sizes

## Conclusion
This assignment successfully implemented a complete e-commerce cart system with professional features. The application effectively manages product data, cart state, and provides real-time updates. The use of JavaScript objects and arrays demonstrates proper data structure management, and the dynamic UI updates provide an excellent user experience. The responsive design ensures functionality across all device sizes, making it a practical foundation for actual e-commerce applications.
