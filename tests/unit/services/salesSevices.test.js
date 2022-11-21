const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/sales.service');
const salesModel = require('../../../src/models/sales.model');

const { rightSaleBody } = require('../../../__tests__/_dataMock');

describe('Validando funcionamento do services das vendas', function () {
  afterEach(sinon.restore);

  it('Listagem completa das vendas', async function () {
    sinon.stub(salesModel, 'listAllSales').resolves(rightSaleBody);

    const result = await salesService.listAllSales();
    expect(result.message).to.be.deep.equal(rightSaleBody);
  });

  it('Busca uma venda pelo seu id', async function () {
    sinon.stub(salesModel, 'listSalesById').resolves(rightSaleBody[0]);

    const result = await salesService.listSalesById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(rightSaleBody[0]);
  });

  it('Retorna um erro caso receba um ID inválido', async function () {
    const result = await salesService.listSalesById(10);

    expect(result.type).to.equal(404);
  });

  it('Deleta uma venda', async function () {
    sinon.stub(salesModel, 'listSalesById').resolves(rightSaleBody[0]);
    sinon.stub(salesModel, 'deleteSale').resolves();

    const result = await salesService.deleteSale(1);

    expect(result.type).to.equal(null);
  });
});