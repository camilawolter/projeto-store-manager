const connection = require('./connection');

const listAllProducts = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return result;
};

const listProductById = async (productsID) => {
  const [[products]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productsID],
  );
  return products;
};

const createProduct = async (newProduct) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUE (?)',
    [newProduct],
  );
  return insertId;
};

module.exports = {
  listAllProducts,
  listProductById,
  createProduct,
};
