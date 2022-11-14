const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../src/models/sales.model');

const connection = require('../../../src/models/connection');
const { rightSaleBody } = require('../../../__tests__/_dataMock');

describe('Validando funcionamento do model das vendas', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([rightSaleBody]);

    const result = await salesModel.listAllSales();
    expect(result).to.be.deep.equal(rightSaleBody);
  });

  it('Recuperando somente uma venda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([rightSaleBody[0]]);

    const result = await salesModel.listAllSales(1);
    expect(result).to.be.deep.equal(rightSaleBody[0]);
  });
});