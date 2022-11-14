const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../src/models/products.model');

const connection = require('../../../src/models/connection');
const { allProductsResponse, productCreateResponse } = require('../../../__tests__/_dataMock');

describe('Validando funcionamento do model dos produtos', function () {
  afterEach(sinon.restore);

  it('Recuperando a lista de todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([allProductsResponse]);

    const result = await productsModel.listAllProducts();
    expect(result).to.be.deep.equal(allProductsResponse);
  });
  
  it('Recuperando somente um produto a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProductsResponse[0]]]);

    const result = await productsModel.listProductById(1);
    expect(result).to.be.deep.equal(allProductsResponse[0]);
  });

  it('Cadastrando um novo produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    
    const result = await productsModel.createProduct(productCreateResponse);
    expect(result).to.equal(4);
  });
});