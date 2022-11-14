const connection = require('./connection');

const listAllSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, sa.date
     FROM StoreManager.sales_products AS sp
     INNER JOIN StoreManager.sales AS sa
     ON sa.id = sp.sale_id
     ORDER BY saleId, productId`,
  );
  return result;
};

const listSalesById = async (saleID) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id AS productId, sp.quantity
   FROM StoreManager.sales_products AS sp
   INNER JOIN StoreManager.sales AS sa
   ON sa.id = sp.sale_id AND sa.id = ?
   ORDER BY sa.id, sp.product_id`,
    [saleID],
  );
  return result;
};

module.exports = {
  listAllSales,
  listSalesById,
};
