import { aggregateProducts, calculateTotalRevenue, filterProductsByName } from './aggregateProducts';

describe('aggregateProducts', () => {
  test('merges duplicate products across branches and sums revenue', () => {
    const branchesData = [
      { products: [{ id: 'P1', name: 'Widget', unitPrice: 10, sold: 5 }] },
      { products: [{ id: 'P1', name: 'Widget', unitPrice: 10, sold: 3 }] }
    ];
    const result = aggregateProducts(branchesData);
    expect(result).toHaveLength(1);
    expect(result[0].totalRevenue).toBe(80);
  });

  test('sorts products alphabetically by name', () => {
    const branchesData = [
      {
        products: [
          { id: 'P2', name: 'Zebra', unitPrice: 1, sold: 1 },
          { id: 'P1', name: 'Apple', unitPrice: 1, sold: 1 }
        ]
      }
    ];
    const result = aggregateProducts(branchesData);
    expect(result.map((product) => product.name)).toEqual(['Apple', 'Zebra']);
  });

  test('handles branches with no products gracefully', () => {
    const result = aggregateProducts([{ products: [] }, { products: [] }]);
    expect(result).toEqual([]);
  });
});

describe('calculateTotalRevenue', () => {
  test('sums the totalRevenue field across products', () => {
    const products = [{ totalRevenue: 10 }, { totalRevenue: 15 }];
    expect(calculateTotalRevenue(products)).toBe(25);
  });

  test('returns zero for an empty list', () => {
    expect(calculateTotalRevenue([])).toBe(0);
  });
});

describe('filterProductsByName', () => {
  const products = [
    { id: 'P1', name: 'Wireless Mouse', totalRevenue: 100 },
    { id: 'P2', name: 'Mechanical Keyboard', totalRevenue: 200 }
  ];

  test('filters case-insensitively', () => {
    const result = filterProductsByName(products, 'mouse');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Wireless Mouse');
  });

  test('returns all products when search term is empty', () => {
    expect(filterProductsByName(products, '')).toEqual(products);
  });

  test('returns an empty array when nothing matches', () => {
    expect(filterProductsByName(products, 'nonexistent')).toEqual([]);
  });
});
