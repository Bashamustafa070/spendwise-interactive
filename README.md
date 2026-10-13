# SpendWise Interactive (PLP JavaScript Week 6 Project)

## Description
SpendWise Interactive is a dynamic frontend budgeting web application that transforms static data management into an interactive experience using modern JavaScript DOM manipulation, event listeners, arrays, and conditional decision-making.

## Files Included
* **index.html** — The core structure of the web dashboard.
* **style.css** — Custom responsive styling and clean card layouts.
* **script.js** — JavaScript logic handling state management, loops, events, and dynamic DOM rendering.

## Project Reflection & Implementation Details

### 1. What improvements were made to SpendWise this week?
SpendWise evolved from a static console-logging utility into a fully interactive web application. Users can now set custom budgets, dynamically add and delete expense items through web forms, and receive automated financial alerts rendered directly on the browser screen.

### 2. How conditionals are used in the project?
Conditionals (`if`, `else if`, `else`) are utilized inside the `evaluateBudgetStatus` function to evaluate user spending behavior against their set monthly budget. They dynamically switch alert banners between success, warning, and danger states depending on whether the user is within limits or has exceeded their target threshold.

### 3. How arrays are used to store data?
An array named `expenses` acts as the single source of truth for the application's records. Each item is stored as an object containing `name` and `amount` properties, allowing items to be dynamically added via `.push()` and removed via `.splice()`.

### 4. How the DOM is updated?
JavaScript interacts with the Document Object Model to dynamically manipulate elements. Summary text nodes (`textContent`) update balances instantly, while `document.createElement()` and `innerHTML` construct item listings inside the UI list dynamically on every state change.

### 5. How user interactions are handled through events?
Event listeners (`addEventListener`) listen for form submissions on the expense tracker and click events on the budget configuration button, instantly routing actions to execution functions without needing page reloads.

### 6. Challenges and Resolutions
* **Challenge:** Maintaining accurate calculations when items were deleted out of order from the list.
* **Resolution:** Handled dynamic index passing via `splice(index, 1)` coupled with a complete state refresh through `updateDashboard()`, ensuring list elements and calculations stay perfectly synchronized.
