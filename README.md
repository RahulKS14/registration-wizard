# Registration Wizard

A multi-step onboarding form built with **React**, **React Hook Form** and **Zod**. It collects user details across three views, validates input in real time, and keeps the data intact while moving between steps.

**Live Demo:** https://registration-wizard-rho.vercel.app/

## Features

- **3-step flow:** Personal Info, Account Details, Review & Submit
- **Real-time validation** on every keystroke (no waiting for submit)
  - Email must match a valid format (contains `@`)
  - Password must be at least 8 characters
  - Confirm Password must match Password
  - Date of birth cannot be in the future
- **Next button stays disabled** until all fields in the current step are valid
- **Data persists** when navigating Back and Next
- **Show/Hide password** toggle
- **Progress indicator** ("Step 2 of 3") with an animated progress bar
- **Review screen** summarising all entered data (password masked)
- **Success state** after submit, with the final payload logged to the console
- **Fully responsive** from small phones to desktops

## Tech Stack

| Tool | Purpose |
| --- | --- |
| React (Vite) | UI and conditional rendering |
| React Hook Form | Performant, uncontrolled form state |
| Zod | Schema-based validation |
| @hookform/resolvers | Connects Zod with React Hook Form |
| CSS (clamp, media queries) | Responsive styling |
| Vercel | Deployment |

## Getting Started

```bash
# clone the repository
git clone https://github.com/YOUR-USERNAME/registration-wizard.git
cd registration-wizard

# install dependencies
npm install

# start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser.

Build for production:

```bash
npm run build
```

## Project Structure

```
src/
├── App.jsx
├── index.css
├── main.jsx
└── components/
    ├── Wizard.jsx        # Parent: form state, schemas, step logic (RHF + Zod)
    ├── ProgressBar.jsx   # Step indicator
    ├── StepOne.jsx       # Phase 1-2 version (useState)
    ├── StepTwo.jsx       # Phase 1-2 version (useState)
    └── StepThree.jsx     # Phase 1-2 version (useState)
```

## How It Works

- **Single source of truth:** `useForm` in `Wizard.jsx` holds all form values, so they survive when steps change.
- **Conditional rendering:** `{step === 1 && ...}` toggles the visible view on a single route.
- **Validation:** Zod schemas define the rules once. `zodResolver` applies them in `onChange` mode. Each step is also checked against its own schema to enable or disable the Next button.
- **Submit:** On the final step, the validated payload is logged with `console.log()` and the Success screen is shown.

## Development Phases

1. **Phase 1:** Base MVP with `useState` and lifted state
2. **Phase 2:** Regex validation, conditional disabling, password toggle, progress bar
3. **Phase 3:** Migration to React Hook Form with Zod schema validation

AI-assisted debugging sessions are documented in [Prompts.md](./Prompts.md).

## Author

**Rahul Saini**
GitHub: [RahulKS14] (https://github.com/RahulKS14)