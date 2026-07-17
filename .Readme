# Revenue Aggregator

A React application that fetches product sales data from three branch APIs, merges duplicate products across branches, and displays combined revenue in a searchable, sortable table.

## Features

- Concurrent fetching of three branch data sources using `Promise.all()`
- Merges the same product appearing in multiple branches and sums revenue across them
- Alphabetically sorted product table with two columns: Product Name and Total Revenue
- Inline search input that filters the table by product name (case-insensitive)
- Live total revenue for the currently filtered/displayed products
- Clean loading and error states
- No external UI/state libraries — plain React, JavaScript, CSS, and the Fetch API

## Tech Stack

- React 18
- Create React App (`react-scripts`)
- Jest + React Testing Library (testing only)

## Project Structure


revenue-aggregator/
├── package.json
├── public/
│   ├── index.html
│   └── api/
│       ├── branch1.json
│       ├── branch2.json
│       └── branch3.json
└── src/
    ├── index.js
    ├── App.js
    ├── App.css
    ├── App.test.js
    ├── setupTests.js
    ├── components/
    │   ├── SearchBar.js
    │   └── RevenueTable.js
    └── utils/
        ├── formatNumber.js
        ├── formatNumber.test.js
        ├── aggregateProducts.js
        └── aggregateProducts.test.js


## Getting Started

### Install dependencies


npm install


### Run the app locally


npm start


The app runs at [http://localhost:3000](http://localhost:3000) and loads branch data from `public/api/branch1.json`, `branch2.json`, and `branch3.json`.

### Run tests


npm test


### Build for production


npm run build


The optimized build is output to the `build/` folder.

> Note: the build script sets `DISABLE_ESLINT_PLUGIN=true` to work around a known version mismatch between `react-scripts@5.0.1` and `eslint-plugin-jest` that otherwise fails CRA's production lint pass. This does not affect `npm test` or app behavior.

## Data Flow

1. Fetch `branch1.json`, `branch2.json`, and `branch3.json` concurrently with `Promise.all()`.
2. For every product in every branch, compute `revenue = unitPrice * sold`.
3. Merge products sharing the same `id`, summing revenue across branches.
4. Sort the merged product list alphabetically by name (done once, after fetching).
5. Store the aggregated list in state.
6. Derive the filtered list and filtered total revenue from the search term using `useMemo`.
7. Render the table and the running total.

## Performance Notes

- Branch data is fetched exactly once (`useEffect` with an empty dependency array).
- Aggregation and sorting happen once, right after the data arrives — not on every render.
- Filtering and the filtered total are derived with `useMemo`, recomputed only when the product list or search term changes.
- `SearchBar` and `RevenueTable` are wrapped in `React.memo`; the search handler is wrapped in `useCallback` so the memoized `SearchBar` doesn't re-render unnecessarily.
- No debouncing or virtualization — the dataset is small, so both would add complexity without any real benefit.

## Customizing the Data

Replace the contents of `public/api/branch1.json`, `branch2.json`, and `branch3.json` with your own data. Each file should follow this shape:

json
{
  "branch": "Branch Name",
  "products": [
    { "id": "P001", "name": "Product Name", "unitPrice": 10.5, "sold": 20 }
  ]
}


## Deployment

### Netlify


npm run build
netlify deploy --prod --dir=build


Or drag and drop the `build/` folder into the Netlify dashboard.