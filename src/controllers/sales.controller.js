const salesService = require('../services/sales.service');

const listAllSales = async (_req, res) => {
  const { type, message } = await salesService.listAllSales();
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const listSalesById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.listSalesById(id);
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

module.exports = {
  listAllSales,
  listSalesById,
};
