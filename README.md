# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





## Challenge

Your challenge is to build out this entertainment web application and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data in a local data.json file, so use that to populate the content on the first load.

Your users should be able to:

View the optimal layout for the app depending on their device's screen size
See hover states for all interactive elements on the page
Navigate between Home, Movies, TV Series, and Bookmarked Shows pages
Add/Remove bookmarks from all movies and TV series
Search for relevant shows on all pages
Have a sign-up screen design to create users and write them to json file, login to check if user logged in, then redirect to Home page
Expected Behaviour
General
The navigation menu should be fixed to the left for larger screens. Use the "Desktop - Home" page in the design as a visual reference.
Home
The trending section should scroll sideways to reveal other trending shows
Any search input should search through all shows (i.e. all movies and TV series)
Movies
This page should only display shows with the "Movie" category
Any search input should search through all movies
TV Series
This page should only display shows with the "TV Series" category
Any search input should search through all TV series
Bookmarked Shows
This page should display all bookmarked shows from both categories
Any search input should search through all bookmarked shows
Have fun building! 🚀