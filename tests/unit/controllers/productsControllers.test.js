const chai = require('chai');
const { expect } = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const productsController = require('../../../src/controllers/products.controller');
const productsService = require('../../../src/services/products.service');
const { allProductsResponse, productCreateResponse } = require('../../../__tests__/_dataMock');

describe('Validando funcionamento do controller dos produtos', function () {
  afterEach(sinon.restore);

  it('Listando os produtos', async function () {
    const res = {};
    const req = {};
    const productList = [allProductsResponse]

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'listAllProducts')
      .resolves({ type: null, message: productList });

    await productsController.listAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productList);
  });

  it('Listando somente um produto pelo seu id', async function () {
    const res = {};
    const req = {
      params: { id: 1 },
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'listProductById')
      .resolves({ type: null, message: allProductsResponse });
    
    await productsController.listProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(allProductsResponse);
  });

  it('Criando um novo produto', async function () {
    const res = {};
    const req = {
      body: productCreateResponse,
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'createProduct')
      .resolves({ type: null, message: productCreateResponse });
    
    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(productCreateResponse);
  });
});