# 📱 Senior React Native Task — Product List App

## 📨 Introduction

Dear Reviewer,

I hope this email finds you well.

As part of the interview process, this repository contains the implementation of the **Product List App** — a React Native assignment that demonstrates responsive layouts, search, sorting, and multi-selection functionalities.

---

## 🚀 Task Overview

The goal of this task is to develop a React Native application that displays products from a provided array, supporting the following features:

---

## 🧩 Features Implemented

### 🔹 Responsive Layout

- **Portrait Mode:** Displays items in a single column.
- **Landscape Mode:** Displays items in two columns.
- Layout automatically adjusts based on device orientation.

### 🔹 Sorting by Price

- A **“Sort by Price”** button cycles through:
  1. Ascending order (Low → High)
  2. Descending order (High → Low)
  3. Reset to original order

### 🔹 Real-Time Search

- Includes a search bar to filter items based on:
  - Product **title**
  - Any value inside **tags**
- The search triggers only when at least **3 letters** are entered.
- Works dynamically on the current (possibly filtered or deleted) list.

### 🔹 Multi-Select & Delete

- Allows selecting multiple items via checkboxes or toggles.
- Includes a **“Delete Selected”** button to remove selected items.
- After deletion, the remaining list continues to work seamlessly with search and sort functionalities.

---

## ⚙️ Technical Details

### 🧱 Built With

- **React Native**
- **React Hooks**   **Custom Hooks** (`useState`, `useEffect`, `useMemo`)
- **@legendapp/list** **flashList** for efficient list rendering
- **Dimensions / useWindowDimensions** for orientation detection
- **Fuse.js** for efficient fuzzy searching
- **lodash/orderBy** for clean sorting logic

### 🧠 State Management

- Local component states using React hooks.
- Derived states for sorting, searching, and selection handling.

### ⚡ Performance Optimizations

- Used memoization for filtered and sorted data.
- Optimized FlatList with proper keys and rendering logic.

---

## ▶️ How to Run the App

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/product-list-app.git
cd product-list-app
```


## Available Scripts

- to initialize the app

```shell
    npm run install
```

- to build the app for android

```shell
    npm run android
```

- to build the app for ios

```shell
    cd ios && pod install && cd ..
    npm run ios
```