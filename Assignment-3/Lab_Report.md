# Assignment 3: Dynamic To-Do List with Status Filter

## 1. Problem Understanding

The objective is to create a **Dynamic To-Do List** application that allows users to add tasks, mark them as completed, delete them, and filter tasks based on their status (All, Pending, Completed).

### Requirements:
- Add new tasks to the list
- Delete tasks from the list
- Mark tasks as completed
- Filter tasks (All / Completed / Pending)
- Display count of completed tasks
- Dynamic UI updates
- No page refresh required

### Key Features:
- Enter new tasks via input field
- Checkbox to mark tasks complete
- Delete button for each task
- Three filter options
- Real-time counter updates
- Visual indication of completed tasks
- XSS prevention with HTML escaping

---

## 2. List of JavaScript Concepts Used

1. **Arrays**
   - `unshift()` - Add to beginning
   - `filter()` - Filter tasks
   - `find()` - Find single task

2. **Objects**
   - Task object with properties (id, text, completed, createdAt)

3. **Functions**
   - Array methods (filter, find)
   - Higher-order functions

4. **DOM Manipulation**
   - `getElementById()`, `querySelector()`
   - Create and append elements
   - `innerHTML` property

5. **Event Handling**
   - Click events
   - Keypress events (Enter key)
   - Change events for checkboxes

6. **String Methods**
   - `trim()` for input validation
   - Template literals for HTML

7. **Operators**
   - Ternary operator
   - Logical operators (&&, ||)

8. **Conditional Logic**
   - Switch statement for filtering
   - If-else for validation

9. **Array Iteration**
   - `forEach()` for displaying tasks
   - `filter()` for status filtering

10. **Date Object**
    - `Date.now()` for unique IDs
    - `toLocaleString()` for timestamps

---

## 3. Flow Diagram or Logic Steps

```
User Input → Validate → Create Task → Add to Array
           → Display Tasks → Update Counter
           
Filter Button Click → Update Filter Variable → Filter Array
                   → Display Filtered Tasks

Checkbox Click → Toggle Completed Status → Update Display
              → Update Counter

Delete Button Click → Remove from Array → Update Display
                   → Update Counter
```

---

## 4. Source Code

### HTML: Input field, filter buttons, task list, counter display
### CSS: Gradient design, task items with hover effects, active filters, responsive layout
### JavaScript: Task management, filtering, DOM updates, event handling

---

## 5. Output Screenshots

### Screenshot 1: Empty To-Do List
- Input field for new tasks
- Filter buttons (All, Pending, Completed)
- Empty message: "No tasks yet"
- Counters showing 0 tasks

### Screenshot 2: Tasks Added
- Multiple tasks in the list
- Checkbox for each task
- Delete button visible
- Counter updated: Total 5 tasks

### Screenshot 3: Tasks Completed
- Some tasks marked with checkboxes
- Completed tasks shown with strikethrough
- Different styling for completed items
- Counter: 2/5 completed

### Screenshot 4: Pending Filter
- Only pending (uncompleted) tasks shown
- Completed tasks hidden
- Pending button highlighted in blue

### Screenshot 5: Completed Filter
- Only completed tasks displayed
- All show strikethrough text
- Completed button highlighted

### Screenshot 6: All Filter
- All tasks displayed regardless of status
- All button highlighted
- Mix of completed and pending tasks

### Screenshot 7: Delete Task
- Click delete button
- Task removed from list
- Counter updated
- Remaining tasks displayed

### Screenshot 8: Responsive Design
- Works on mobile devices
- Input field full width
- Filter buttons stack properly
- Tasks readable on small screens

---

## Features Implemented

✅ Add new tasks with Enter key or button click
✅ Delete tasks individually
✅ Mark tasks as completed
✅ Filter tasks (All / Pending / Completed)
✅ Real-time task counters
✅ Visual feedback for completed tasks
✅ Empty state handling
✅ XSS prevention with HTML escaping
✅ Responsive design
✅ Keyboard support (Enter key)

---

## Conclusion

The Dynamic To-Do List demonstrates effective use of arrays, filtering, DOM manipulation, and event handling. All requirements have been successfully implemented using Vanilla JavaScript, providing a fully functional task management application.
