# Playwright Translation Automation Project

This project contains Playwright scripts to automate translation testing on `swifttranslator.com`. It generates a CSV report of the test results.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

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
