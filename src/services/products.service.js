const productsModel = require('../models/products.model');

const listAllProducts = async () => {
  const products = await productsModel.listAllProducts();
  return { type: null, message: products };
};

const listProductById = async (productsID) => {
  const products = await productsModel.listProductById(productsID);
  if (products) return { type: null, message: products };
  return { type: 404, message: { message: 'Product not found' } };
};

module.exports = {
  listAllProducts,
  listProductById,
};
