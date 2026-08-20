# AEON Bank Mobile Engineer Assessment - Transaction Viewer POC

A React Native mobile application built for AEON Bank's Mobile Engineer Assessment. This app allows banking customers to view, search, filter, and inspect incoming (Income) and outgoing (Expense) transaction history, with support for sharing receipts and toggling languages.

## 🚀 Features

- **Transaction List**: Displays transfer details, recipient name, date/time, and amount formatted in Malaysian Ringgit (`MYR` / `RM`).
- **Income & Expense Colors**:
  - 🟩 **Income (Pemasukan)**: Amount highlighted in **Green** with `+` sign (e.g. `+ RM 1,500.00`).
  - 🟥 **Expense (Pengeluaran)**: Amount highlighted in **Red** with `-` sign (e.g. `- RM 500.00`).
- **Real-time Search**: Search transactions instantly by recipient name, transfer title, or Reference ID (`refId`).
- **Filter Chips**: Filter by **All / Semua**, **Income / Pemasukan**, and **Expense / Pengeluaran**.
- **Simulated BE API & Zustand Store**: Asynchronous API fetching (`fetchTransactionsFromApi`) stored statefully in **Zustand** with loading indicators and pull-to-refresh.
- **Transaction Details & Share**: Navigate to detailed view (`refId`, date, recipient name, transfer name, amount) with native external sharing (`Share.share`).
- **Bilingual Support**: Instant toggle between **English (EN)** and **Bahasa Melayu (MS)**.
- **Clean & Minimal UI**: Simple, readable, professional mobile banking design system.

---

## 🛠 Tech Stack

- **Framework**: React Native (Expo SDK 57)
- **Language**: TypeScript
- **State Management**: Zustand
- **Navigation**: React Navigation (Native Stack)
- **Formatting**: Custom Ringgit Malaysia (`MYR`) & ISO date formatters

---

## 💻 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn** / **pnpm**
- **Expo Go App** (on iOS / Android device) or **Android Studio Emulator** / **Xcode Simulator**

---

## 🏃 How to Run the App

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd aeon-bank-poc
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Expo Development Server**:
   ```bash
   npm run start
   ```
   Or run directly on platform simulators:
   - **iOS Simulator**: `npm run ios`
   - **Android Emulator**: `npm run android`
   - **Web Browser**: `npm run web`

4. **Testing on a Physical Device**:
   - Download **Expo Go** from Apple App Store or Google Play Store.
   - Scan the QR code displayed in your terminal after running `npm run start`.

---

## 🧪 Verification & Type Check

To run TypeScript type check:
```bash
npx tsc --noEmit
```

---

## 📂 Project Structure

```
├── App.tsx                        # App Entry point with Navigation Container
├── src/
│   ├── components/                # Modular UI Components
│   │   ├── FilterChips.tsx        # Income (Green) & Expense (Red) filters
│   │   ├── LanguageToggle.tsx     # EN / MS language switcher
│   │   ├── SearchBar.tsx          # Real-time search bar
│   │   └── TransactionItem.tsx    # Single transaction row item
│   ├── data/                      # Initial mock response definitions
│   ├── screens/                   # App Screen Views
│   │   ├── HomeScreen.tsx         # Main dashboard list screen
│   │   └── TransactionDetailScreen.tsx # Detail & Share receipt screen
│   ├── services/                  # Simulated Backend API Service
│   │   └── api.ts                 # getTransactions async fetch simulation
│   ├── store/                     # Zustand Global Store
│   │   └── useTransactionStore.ts # Transactions state, query, filter, language
│   ├── types/                     # TypeScript interfaces and types
│   │   └── transaction.ts
│   └── utils/                     # Formatters & Translations
│       ├── formatters.ts          # Ringgit Malaysia (MYR) & Date formatters
│       └── i18n.ts                # English & Bahasa Melayu translations
└── README.md                      # Documentation
```
