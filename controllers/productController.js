const productService = require('../services/productService');
const { invalidateCache } = require('../middleware/cacheMiddleware');

async function getAll(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function create(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);
    invalidateCache();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function update(req, res) {
  try {
    const { id } = req.params;
    const updated = await productService.updateProduct(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    invalidateCache();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function patch(req, res) {
  try {
    const { id } = req.params;
    const patched = await productService.patchProduct(id, req.body);
    if (!patched) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    invalidateCache();
    res.json(patched);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);
    if (!deleted) {
      return res.status(404).json({ message: `Product with ID ${id} not found` });
    }
    invalidateCache();
    res.json({ message: 'Product deleted successfully', product: deleted });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  patch,
  remove
};
