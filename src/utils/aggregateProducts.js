export const aggregateProducts = (branchesData) => {
  const productMap = new Map();

  branchesData.forEach((branch) => {
    const products = branch && Array.isArray(branch.products) ? branch.products : [];
    products.forEach((product) => {
      const revenue = product.unitPrice * product.sold;
      const existing = productMap.get(product.id);
      if (existing) {
        existing.totalRevenue += revenue;
      } else {
        productMap.set(product.id, {
          id: product.id,
          name: product.name,
          unitPrice:product.unitPrice,
          sold:product.sold,
          totalRevenue: revenue
        });
      }
    });
  });

  return Array.from(productMap.values()).sort((a, b) => a.name.localeCompare(b.name));
};

export const calculateTotalRevenue = (products) => {
  return products.reduce((sum, product) => sum + product.totalRevenue, 0);
};

export const filterProductsByName = (products, searchTerm) => {
  const normalizedTerm = searchTerm.trim().toLowerCase();
  if (!normalizedTerm) {
    return products;
  }
  return products.filter((product) => product.name.toLowerCase().includes(normalizedTerm));
};
