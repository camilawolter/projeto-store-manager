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

const createProduct = async (product) => {
  const newIdProduct = await productsModel.createProduct(product);
  const newProduct = await productsModel.listProductById(newIdProduct);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, productUp) => {
  const products = await productsModel.listProductById(productId);
  if (!products) return { type: 404, message: { message: 'Product not found' } };

  await productsModel.updateProduct(productId, productUp);
  return { type: null, message: { id: productId, name: productUp } };
};

module.exports = {
  listAllProducts,
  listProductById,
  createProduct,
  updateProduct,
};
