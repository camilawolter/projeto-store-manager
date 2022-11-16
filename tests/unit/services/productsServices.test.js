const { expect } = require('chai');
const sinon = require('sinon');

const productsService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');

const { allProductsResponse, productSearchNameResponse, productUpdateBody } = require('../../../__tests__/_dataMock');

const validName = require('../../../src/middlewares/validateProducts');

describe('Validando funcionamento do services dos produtos', function () {
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

  it('Retorna um erro caso receba um ID inválido', async function () {
    const result = await productsService.listProductById(10);

    expect(result.type).to.equal(404);
  });

  it('Retorna o ID do novo produto cadastrado', async function () {
    sinon.stub(productsModel, 'createProduct').resolves()([{ insertId: 1 }]);
    sinon.stub(productsModel, 'listProductById').resolves(allProductsResponse[0]);

    const result = await productsService.createProduct(validName);

    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProductsResponse[0]);
  });

  it('Atualiza um produto já existente', async function () {
    sinon.stub(productsModel, 'listProductById').resolves(productSearchNameResponse);
    sinon.stub(productsModel, 'updateProduct').resolves();

    const result = await productsService.updateProduct(1, productUpdateBody);

    expect(result.message).to.deep.equal({ id: 1, name: productUpdateBody });
  });
});