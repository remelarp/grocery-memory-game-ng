# Grocery Memory Game 🛒

A fun and interactive **memory game** built with **Angular** and **Ionic**. Test your memory by memorizing a set of grocery items and selecting them from a grid of 14 items. Perfect for kids, families, or anyone looking to sharpen their cognitive skills with a delightful grocery-themed challenge!

![Game Screenshot](path/to/screenshot.png) <!-- Replace with actual screenshot path -->

## ✨ Features

- **Adjustable Difficulty**: Choose to memorize 3 to 7 grocery items, catering to different skill levels.
- **Engaging Gameplay**:
  - **Memorize Phase**: View a selection of grocery items with vibrant SVG icons.
  - **Recall Phase**: Identify your memorized items from a randomized 5x3 grid of 14 items (memorized items + distractors).
  - No duplicate items for fair and challenging gameplay.
- **Visual Appeal**: Includes 24 grocery items (fruits, vegetables, dairy, meats, pantry staples, and household goods) with high-quality SVG images.
- **Instant Feedback**: Ionic action sheet displays "Congratulations!" for correct selections or "Try Again!" with options to **Repeat** the level or return to the **Home** page.
- **Responsive Design**: Clean 5x3 grid layout ensures a seamless experience on mobile and desktop.
- **Smooth Navigation**: Ionic’s router and `NavController` handle transitions between grocery list, memorize, and game pages, with state passing for memorized items and difficulty level.
- **Randomized Selection**: Powered by `ShoppingListService` to shuffle and select items dynamically.

## 🛠️ Tech Stack

- **Angular 18**: Standalone components for modular, modern development.
- **Ionic 8**: Provides mobile-friendly UI components like `ion-grid`, `ion-img`, and `ion-action-sheet`.
- **TypeScript**: Ensures type-safe code with interfaces for grocery items `{ id: number; name: string; image?: string }`.
- **SCSS**: Custom styles for selected item highlighting and responsive layouts.

## 📦 Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/remelarp/grocery-memory-game-ng.git
   cd grocery-memory-game-ng
2. **Install Dependencies**:
   ```bash
   npm install
3. **Run the App**:
   ```bash
   ng serve
   Open http://localhost:4200 in your browser.
4. **Build for Production**:
   ```bash
   ng build --prod
