# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

flowchart TD
    A[User] --> B[Search Destinations]
    A --> C[Plan Itinerary]
    A --> D[Book Travel & Hotels]
    A --> E[View Recommendations]

    B --> B1[Cities / Tourist Spots / Cultural Info]
    C --> C1[Day-wise Trip Planner]
    C --> C2[Route Suggestions]

    D --> D1[Flights / Hotels / Packages]
    D --> D2[Booking Confirmation]

    E --> E1[Personalized AI Recommendations]
    E --> E2[Travel Tips & Alerts]

    B1 --> F[Destination Data]
    C1 --> F
    C2 --> F
    D1 --> F
    D2 --> F
    E1 --> F
    E2 --> F

    F[Backend / Database] --> G[AI & ABDM Module]
    G --> E1
