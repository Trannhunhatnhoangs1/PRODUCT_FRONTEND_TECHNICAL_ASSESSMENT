// Helper script to be used with Mockoon's databucket feature
const fs = require('fs');
const productsData = JSON.parse(fs.readFileSync('./products-data.json', 'utf8'));

module.exports = {
  getProductById: (id) => {
    const product = productsData.find(p => p.id === parseInt(id));
    return product || { error: 'Product not found' };
  }
};
