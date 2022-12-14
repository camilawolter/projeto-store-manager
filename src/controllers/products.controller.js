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

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  if (type) return res.status(type).json(message);
  res.status(201).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsService.updateProduct(id, name);
  if (type) return res.status(type).json(message);
  res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);
  if (type) return res.status(type).json(message);
  res.status(204).json(message);
};

const searchProductName = async (req, res) => {
  const { q: name } = req.query;
  const data = await productsService.searchProductName(name);
  res.status(200).json(data.message);
};

module.exports = {
  listAllProducts,
  listProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductName,
};
