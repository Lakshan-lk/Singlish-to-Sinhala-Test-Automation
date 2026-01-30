# Playwright Translation Automation Project

## 📌 Project Overview
This project contains automated functional and UI test cases for the web-based
Singlish to Sinhala transliteration system available at:

🔗 https://www.swifttranslator.com/

The automation suite covers **35 Test Scenarios** as required by the assignment guidelines:
- **24 Positive Scenarios:** Verifying correct translation of simple/complex sentences, grammar, and mixed-language inputs.
- **10 Negative Scenarios:** Testing system robustness against typos, formatting issues, and technical terms.
- **1 UI Scenario:** Verifying real-time interface behavior.

## 🚀 Prerequisites

Before running the tests, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download Here](https://nodejs.org/)
- **NPM** (Included with Node.js)

## ⚙️ Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/sandundimantha/ITPM-Assignment-1-.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd ITPM-Assignment-1-
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
    This will install Playwright and other required packages listed in `package.json`.

## Running the Tests

To run the full test suite and generate the result CSV file:

```bash
npx playwright test
```

By default, tests are configured to run in a headed browser (visible). To run in headless mode, you can use:

```bash
npx playwright test --headed
```

## Output

The test results will be saved to `test-results.csv` in the root directory.
