# Assignment 7: Dynamic Table Generator - Lab Report

## 1. Objective
The objective of this assignment was to create a dynamic table generator application that allows users to specify the number of rows and columns, then manipulate the table through various operations including adding rows, deleting rows, and highlighting even-numbered rows. This demonstrates DOM manipulation skills and dynamic element creation.

## 2. Features Implemented
- **Dynamic Table Generation:** Users input desired number of rows and columns, and the table is generated dynamically
- **Row Numbering:** First column displays sequential row numbers for easy reference
- **Add Row Functionality:** Button to append a new row to the existing table
- **Delete Row Functionality:** Button to remove the last row from the table
- **Even Row Highlighting:** Toggle button to highlight all even-numbered rows with a yellow background
- **Data Cell Labeling:** Each cell displays its position (e.g., R1C1 for Row 1, Column 1)
- **Input Validation:** Validates user inputs with maximum limits (50 rows, 20 columns)

## 3. Technical Implementation
### HTML Structure
- Input fields for rows and columns with number type and validation constraints
- Generate button to create the initial table
- Control buttons for Add Row, Delete Row, and Highlight operations
- Table with thead and tbody for semantic HTML structure

### CSS Styling
- Professional gradient background with purple tones matching the design pattern
- Responsive table wrapper with horizontal scroll capability
- Header styling with gradient background matching theme
- Row number column styled with bold text and purple background
- Even row highlighting with distinct background color (light yellow)
- Hover effects for better interactivity
- Grid layout for buttons with responsive adjustments

### JavaScript Logic
- `createHeader()`: Dynamically creates table header with column labels
- `generateTableBody()`: Generates table rows and cells with proper labeling
- `generateTable()`: Main function to create entire table with input validation
- `addRow()`: Appends new row with correct numbering and data pattern
- `deleteRow()`: Removes the last row from the table body
- `applyHighlighting()`: Highlights even-numbered rows with CSS class
- `toggleHighlighting()`: Manages highlight state and button UI updates
- DOM manipulation using `createElement()` and `appendChild()` methods

## 4. Challenges and Solutions
| Challenge | Solution |
|-----------|----------|
| Maintaining row numbers when adding/deleting | Store and update `currentRows` variable, regenerate numbering on each operation |
| Highlighting even rows when table changes | Track `isHighlighted` state and reapply styling after modifications |
| Cell labeling accuracy | Use nested loops with row and column indices to create R#C# pattern |
| Input validation limits | Implement conditional checks with user alerts for invalid inputs |
| Responsive table display | Use overflow-x: auto wrapper and responsive grid layouts |

## 5. Learning Outcomes
- Mastered DOM element creation using `createElement()` and `appendChild()`
- Learned to manage table state with variables tracking row and column counts
- Practiced nested loops for generating multi-dimensional table structures
- Developed skills in dynamic element manipulation and styling toggling
- Understood input validation and user feedback mechanisms
- Learned to work with table-specific HTML elements (thead, tbody, tr, td, th)
- Practiced responsive design for tabular data display
- Improved understanding of CSS selectors for nth-child highlighting

## Testing Results
✓ Table generates correctly with specified rows and columns
✓ Row numbers display accurately in first column
✓ Add Row functionality increases row count and maintains structure
✓ Delete Row removes last row and updates display
✓ Highlight toggle correctly applies and removes yellow background on even rows
✓ Cell labels (R#C#) display correctly
✓ Input validation prevents invalid table dimensions
✓ Application maintains responsive design on smaller screens

## Conclusion
This assignment successfully demonstrated advanced DOM manipulation techniques and dynamic table generation. The application handles table creation, modification, and styling effectively. Users can easily manage table structure and apply visual enhancements. The responsive design ensures functionality across all device sizes and the input validation maintains data integrity.
