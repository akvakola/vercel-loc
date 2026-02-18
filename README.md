# QA Test Automation - User Registration

Automated test suite for User Registration functionality using Playwright and TypeScript with Page Object Model design pattern.

## 📋 Project Overview

This project contains automated tests for the user registration feature at [https://qa-test-web-app.vercel.app](https://qa-test-web-app.vercel.app).

**Application Under Test:** QA Test Web Application - User Registration  
**Framework:** Playwright + TypeScript  
**Design Pattern:** Page Object Model (POM)  
**CI/CD:** GitHub Actions

---

## 🚀 Quick Start

### Prerequisites

- Node.js (LTS version)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/akvakola/vercel-loc.git
cd vercel-loc

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/registration/input-validation/first-name.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium

# View HTML report
npx playwright show-report
```

---

## 📁 Project Structure

```
vercel-loc/
├── .github/
│   └── workflows/
│       └── playwright.yml           # CI/CD pipeline
├── data/
│   └── userData.ts                  # Test data constants
├── fixtures/
│   └── basePage.ts                  # Test fixtures
├── helpers/
│   └── helpers.ts                   # Utility functions
├── pages/
│   ├── login.page.ts                # Login page object
│   └── registration.page.ts         # Registration page object
├── tests/
│   └── registration/
│       ├── input-validation/        # Field validation tests
│       │   ├── first-name.spec.ts
│       │   ├── last-name.spec.ts
│       │   ├── email.spec.ts
│       │   ├── phone.spec.ts
│       │   ├── street.spec.ts
│       │   ├── city.spec.ts
│       │   ├── zip-code.spec.ts
│       │   ├── passwords.spec.ts
│       │   └── terms-and-conditions.spec.ts
│       ├── security/                # Security tests
│       │   ├── sql-injection.spec.ts
│       │   ├── xss-prevention.spec.ts
│       │   ├── password-masking.spec.ts
│       │   └── sensitive-data-url.spec.ts
│       ├── ui-ux/                   # UI/UX tests
│       │   └── form-submission.spec.ts
│       ├── e2e/                     # End-to-end tests
│       │   └── endToEnd.spec.ts
│       ├── browser-compatibility/   # Cross-browser tests
│       │   ├── chrome.spec.ts
│       │   ├── firefox.spec.ts
│       │   ├── safari.spec.ts
│       │   └── edge.spec.ts
│       └── responsive-design/       # Responsive tests
│           ├── mobile.spec.ts
│           ├── tablet.spec.ts
│           └── desktop.spec.ts
├── playwright.config.ts             # Playwright configuration
├── package.json
└── README.md
```

---

## 📊 Test Coverage

### Test Categories

| Category              | Test Cases | Status       |
| --------------------- | ---------- | ------------ |
| Input Validation      | 74         | ✅ Automated |
| Security              | 8          | ✅ Automated |
| UI/UX                 | 7          | ✅ Automated |
| E2E                   | 3          | ✅ Automated |
| Browser Compatibility | 4          | ✅ Automated |
| Responsive Design     | 6          | ✅ Automated |

**Total Automated Tests:** 102

---

## 🛠️ Technologies Used

- **Test Framework:** [Playwright](https://playwright.dev/) v1.58.2 (latest)
- **Language:** TypeScript
- **Node.js:** Latest LTS
- **Design Pattern:** Page Object Model (POM)
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Reporter

---

## 🔄 CI/CD Pipeline

Tests run automatically on:

- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch
- Manual trigger via GitHub Actions UI

**View Latest Test Report:**  
[GitHub Pages Test Report](https://akvakola.github.io/vercel-loc/)

---

## 🧪 Running Specific Test Suites

```bash
# Input validation tests only
npx playwright test tests/registration/input-validation/

# Security tests only
npx playwright test tests/registration/security/

# E2E tests only
npx playwright test tests/registration/e2e/

# Browser compatibility tests
npx playwright test tests/registration/browser-compatibility/

# Responsive design tests
npx playwright test tests/registration/responsive-design/
```

---

## 🐛 Debugging Tests

```bash
# Run tests in debug mode
npx playwright test --debug

# Run specific test in debug mode
npx playwright test first-name.spec.ts --debug

# Run with UI mode
npx playwright test --ui
```

---

## 📈 Test Reporting

### HTML Report

After test execution, view the HTML report:

```bash
npx playwright show-report
```

### CI/CD Report

Every CI/CD run generates a report automatically deployed to GitHub Pages:

- [View Latest Report](https://akvakola.github.io/vercel-loc/)

---

## 🎯 Key Features

✅ **Page Object Model (POM)** - Maintainable and reusable test code  
✅ **TypeScript** - Type-safe test implementation  
✅ **Cross-browser Testing** - Chrome, Firefox, Safari, Edge  
✅ **Responsive Testing** - Mobile, Tablet, Desktop viewports  
✅ **Security Testing** - SQL injection, XSS validation  
✅ **CI/CD Integration** - Automated test execution on push  
✅ **Comprehensive Reporting** - HTML reports with screenshots  
✅ **Test Data Management** - Centralized test data

---

## 📝 Configuration

### Playwright Config

- **Base URL:** https://qa-test-web-app.vercel.app/
- **Parallel Execution:** Enabled
- **Retries on CI:** 0
- **Workers on CI:** 1 (serial execution)
- **Trace:** Always on
- **Screenshots:** On failure only

---

## 👤 Author

**Viktor Novacki**  
QA Engineer  
[GitHub Profile](https://github.com/akvakola)

---

## 📅 Project Info

- **Purpose:** QA Engineer Job Application
- **Duration:** 10 days
- **Location:** Split, Croatia

---

**Last Updated:** February 18, 2026
