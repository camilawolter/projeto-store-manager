const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const salesController = require('../../../src/controllers/sales.controller');
const salesService = require('../../../src/services/sales.service');
const { rightSaleBody } = require('../../../__tests__/_dataMock');

describe('Validando funcionamento do controller das vendas', function () {
  afterEach(sinon.restore);

  it('Listando as vendas', async function () {
    const res = {};
    const req = {};
    const salesList = [rightSaleBody]

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'listAllSales')
      .resolves({ type: null, message: salesList });

    await salesController.listAllSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesList);
  });

  it('Listando somente uma venda pelo seu id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'listSalesById')
      .resolves({ type: null, message: rightSaleBody });

    await salesController.listSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(rightSaleBody);
  });
});