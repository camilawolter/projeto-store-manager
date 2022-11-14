const salesModel = require('../models/sales.model');

const listAllSales = async () => {
  const sales = await salesModel.listAllSales();
  return { type: null, message: sales };
};

const listSalesById = async (salesID) => {
  const sales = await salesModel.listSalesById(salesID);
  if (!sales || sales.length === 0) return { type: 404, message: { message: 'Sale not found' } };
  return { type: null, message: sales };
};

module.exports = {
  listAllSales,
  listSalesById,
};
