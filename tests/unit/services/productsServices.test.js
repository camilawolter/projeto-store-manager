const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const { allProductsResponse } = require('../../../__tests__/_dataMock');

describe('Validando funcionamento do modeldos produtos', function () {
  afterEach(sinon.restore);
  it('Listagem completa dos produtos', async function () {
    sinon.stub(productsModel, 'listAllProducts').resolves(allProductsResponse);

    const result = await productsService.listAllProducts();
    expect(result.message).to.be.deep.equal(allProductsResponse);
  });

  it('Busca um produto pelo seu id', async function () {
    sinon.stub(productsModel, 'listProductById').resolves(allProductsResponse[0]);

    const result = await productsService.listProductById(1);
    expect(result.type).to.equal(null);
    expect(result.message).to.be.deep.equal(allProductsResponse[0]);
  });
});