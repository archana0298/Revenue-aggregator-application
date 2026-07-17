import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const branch1 = {
  products: [
    { id: 'P1', name: 'Wireless Mouse', unitPrice: 10, sold: 5 },
    { id: 'P2', name: 'Mechanical Keyboard', unitPrice: 50, sold: 2 }
  ]
};

const branch2 = {
  products: [{ id: 'P1', name: 'Wireless Mouse', unitPrice: 10, sold: 3 }]
};

const branch3 = {
  products: [{ id: 'P3', name: 'USB Cable', unitPrice: 5, sold: 10 }]
};

const mockSuccessfulFetch = () => {
  global.fetch = jest.fn((url) => {
    const responseMap = {
      '/api/branch1.json': branch1,
      '/api/branch2.json': branch2,
      '/api/branch3.json': branch3
    };
    return Promise.resolve({
      ok: true,
      url,
      json: () => Promise.resolve(responseMap[url])
    });
  });
};

afterEach(() => {
  jest.restoreAllMocks();
});

test('shows a loading state before data resolves', () => {
  mockSuccessfulFetch();
  const { unmount } = render(<App />);
  expect(screen.getByText(/loading revenue data/i)).toBeInTheDocument();
  unmount();
});

test('renders aggregated products sorted alphabetically once loaded', async () => {
  mockSuccessfulFetch();
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
  });

  const rows = screen.getAllByRole('row').slice(1, -1);
  const rowNames = rows.map((row) => row.querySelector('td').textContent);
  expect(rowNames).toEqual(['Mechanical Keyboard', 'USB Cable', 'Wireless Mouse']);
});

test('merges duplicate products and sums their revenue', async () => {
  mockSuccessfulFetch();
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
  });

  const row = screen.getByText('Wireless Mouse').closest('tr');
  expect(row).toHaveTextContent('$80.00');
});

test('filters the table by product name as the user types', async () => {
  mockSuccessfulFetch();
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('Wireless Mouse')).toBeInTheDocument();
  });

  const searchInput = screen.getByLabelText(/search/i);
  await userEvent.type(searchInput, 'keyboard');

  expect(screen.getByText('Mechanical Keyboard')).toBeInTheDocument();
  expect(screen.queryByText('Wireless Mouse')).not.toBeInTheDocument();
  expect(screen.queryByText('USB Cable')).not.toBeInTheDocument();
});

test('shows an error state when a branch request fails', async () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({ ok: false, url: '/api/branch1.json', json: () => Promise.resolve({}) })
  );
  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/unable to load revenue data/i)).toBeInTheDocument();
  });
});
