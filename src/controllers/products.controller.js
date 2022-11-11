const productsService = require('../services/products.service');

const listAllProducts = async (_req, res) => {
  const { type, message } = await productsService.listAllProducts();
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const listProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.listProductById(id);
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

module.exports = {
  listAllProducts,
  listProductById,
};
