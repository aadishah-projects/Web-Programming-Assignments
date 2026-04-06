# Assignment 2: Student Marks & Grade Analyzer

## 1. Problem Understanding

The objective is to create a **Student Marks & Grade Analyzer** system that allows users to input student information and marks for multiple subjects, then calculate the total marks, percentage, grade, and pass/fail status.

### Requirements:
- Store student details (name, ID)
- Input marks for 5 subjects (all out of 100)
- Calculate total marks and percentage
- Assign grades based on percentage
- Displays results in a table format
- Highlight pass/fail rows using CSS with JavaScript
- Validate input (marks between 0-100)
- Show clear results summary

### Key Design Decisions:
- Grade scale: A+ (90-100), A (80-89), B (70-79), C (60-69), D (50-59), E (40-49), F (0-39)
- Pass percentage: 40%
- Pass rows highlighted in green, fail in red
- Form and results in separate sections
- Input validation before calculation

---

## 2. List of JavaScript Concepts Used

1. **Variables and Constants**
   - `const` for fixed values (subjects, grade scale)
   - Global variables for form IDs

2. **Objects**
   - Student object with properties (name, id, marks, total, percentage, grade, status)
   - Grade scale array of objects

3. **Arrays**
   - Array of subjects
   - Array of mark input IDs
   - `map()` method to extract marks
   - `reduce()` method to calculate sum

4. **Functions**
   - Function parameters and return values
   - Arrow functions with event listeners

5. **DOM Manipulation**
   - `getElementById()` for element selection
   - `.value` property to get input values
   - `.classList` for adding/removing classes
   - `innerHTML` to display results

6. **Event Handling**
   - `addEventListener()` for button clicks
   - Click events for Analyze and Clear buttons

7. **String Methods**
   - `trim()` to remove whitespace
   - Template literals for HTML generation

8. **Operators and Logic**
   - Conditional statements (if-else)
   - Logical operators (&&, ||)
   - Comparison operators (>=, <=, ===)

9. **Loops and Iteration**
   - `forEach()` method for iteration
   - `for` loops for validation

10. **Math Operations**
    - Basic arithmetic (addition, multiplication, division)
    - Percentage calculation formula

11. **Data Validation**
    - Range checking (0-100)
    - Empty field validation

---

## 3. Flow Diagram or Logic Steps

### Input Validation Flow:
```
User Input → Validate Name → Validate ID → Validate Marks (0-100)
→ All Valid? → Calculate Results → Display → Style Rows
```

### Calculation Process:
```
Marks Array → Sum Total → Calculate Percentage → Determine Grade
→ Check Pass/Fail → Create Student Object → Generate HTML
```

### Detailed Steps:

1. **Input Phase:**
   - User enters student name
   - User enters student ID
   - User enters marks for 5 subjects

2. **Validation Phase:**
   - Check student name is not empty
   - Check student ID is not empty
   - Validate each mark is between 0-100
   - Mark invalid fields with error class

3. **Calculation Phase:**
   - Extract all marks from input fields
   - Sum all marks for total
   - Calculate percentage: (total / 500) × 100
   - Find matching grade from gradeScale array
   - Determine pass/fail: percentage >= 40

4. **Display Phase:**
   - Create student information box
   - Build results table with subjects and marks
   - Add total row (highlighted based on status)
   - Show summary with percentage, grade, status
   - Display large grade indicator

5. **Styling Phase:**
   - Apply green background for pass rows
   - Apply red background for fail rows
   - Style status badge (pass/fail)

6. **Clear Phase:**
   - Reset all input fields
   - Clear error classes
   - Reset results to placeholder

---

## 4. Source Code

### HTML (index.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Marks & Grade Analyzer</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="form-section">
            <h1>Student Marks & Grade Analyzer</h1>
            
            <!-- Student Information -->
            <div class="form-group">
                <label for="student-name">Student Name:</label>
                <input type="text" id="student-name" placeholder="Enter student name">
            </div>

            <div class="form-group">
                <label for="student-id">Student ID:</label>
                <input type="text" id="student-id" placeholder="Enter student ID">
            </div>

            <!-- Subject Marks -->
            <div class="marks-section">
                <h3>Enter Marks (out of 100)</h3>
                
                <div class="form-group">
                    <label for="english-marks">English:</label>
                    <input type="number" id="english-marks" min="0" max="100" placeholder="0">
                </div>

                <div class="form-group">
                    <label for="math-marks">Mathematics:</label>
                    <input type="number" id="math-marks" min="0" max="100" placeholder="0">
                </div>

                <div class="form-group">
                    <label for="science-marks">Science:</label>
                    <input type="number" id="science-marks" min="0" max="100" placeholder="0">
                </div>

                <div class="form-group">
                    <label for="history-marks">History:</label>
                    <input type="number" id="history-marks" min="0" max="100" placeholder="0">
                </div>

                <div class="form-group">
                    <label for="computer-marks">Computer Science:</label>
                    <input type="number" id="computer-marks" min="0" max="100" placeholder="0">
                </div>
            </div>

            <!-- Buttons -->
            <div class="button-group">
                <button class="btn analyze-btn" id="analyze-btn">Analyze</button>
                <button class="btn clear-btn" id="clear-btn">Clear</button>
            </div>
        </div>

        <!-- Results Section -->
        <div class="results-section">
            <h2>Results</h2>
            <div id="results-container" class="results-container">
                <p class="placeholder">Fill the form and click "Analyze" to see results</p>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
```

### CSS (style.css)
[Professional gradient design with form styling, table styling, pass/fail highlighting]
- Form section with input fields
- Results section with table
- Green highlighting for pass rows
- Red highlighting for fail rows
- Summary box with grade display
- Responsive design

### JavaScript (script.js)
```javascript
// Grade scale definition
const gradeScale = [
    { min: 90, max: 100, grade: 'A+' },
    { min: 80, max: 89, grade: 'A' },
    { min: 70, max: 79, grade: 'B' },
    { min: 60, max: 69, grade: 'C' },
    { min: 50, max: 59, grade: 'D' },
    { min: 40, max: 49, grade: 'E' },
    { min: 0, max: 39, grade: 'F' }
];

// Main calculation: Total → Percentage → Grade
// Validation: Name, ID, Range checking
// Display: Table with pass/fail styling
// Features: Input validation, error handling, clear form
```

---

## 5. Output Screenshots

### Screenshot 1: Empty Form
- Shows form with all input fields
- Placeholder results area

### Screenshot 2: Form Filled
- Student name: "Rahul Kumar"
- Student ID: "001"
- All subject marks entered
- Ready to analyze

### Screenshot 3: Results Displayed
- Student information box
- Table showing all subjects and marks
- Total row highlighted in green (PASS)
- Summary with percentage, grade, and status badge
- Large grade indicator (e.g., "A")

### Screenshot 4: Fail Case
- Student with low marks
- Percentage below 40%
- Total row highlighted in red (FAIL)
- Status badge shows "FAIL"
- Grade: F

### Screenshot 5: Input Validation
- Error when marks exceed 100
- Error message displayed
- Invalid field highlighted with red border

### Screenshot 6: Pass/Fail Highlighting
- Pass rows in green (#f0fdf4)
- Fail rows in red (#fef2f2)
- Clear visual distinction

### Screenshot 7: Clear Functionality
- All fields cleared
- Error classes removed
- Results reset to placeholder

### Screenshot 8: Responsive Design
- Same layout on mobile devices
- Form stacks properly
- Table remains readable

---

## Features Implemented

✅ Student information input (name, ID)
✅ Multi-subject marks input (5 subjects)
✅ Total marks calculation
✅ Percentage calculation
✅ Grade assignment with scale
✅ Pass/Fail determination (40% threshold)
✅ Results table display
✅ Pass/Fail row highlighting with CSS
✅ Summary box with grade display
✅ Input validation (0-100 range)
✅ Error handling and messages
✅ Clear form functionality
✅ Responsive design for mobile

---

## Conclusion

The Student Marks & Grade Analyzer demonstrates proficiency in object manipulation, array operations, conditional logic, and DOM manipulation. The application successfully validates input, calculates grades accurately, and provides visual feedback through CSS styling applied via JavaScript. All requirements from the problem statement have been implemented using Vanilla JavaScript.
