const AbstractSeeder = require("./AbstractSeeder");

const ProductSeeder = require("./ProductSeeder");
const OrderSeeder = require("./OrderSeeder");

class ProductOrderSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({
      table: "product_order",
      truncate: true,
      dependencies: [ProductSeeder, OrderSeeder],
    });
  }

  // $ The run method - Populate the 'product_order' table with fake data

  run() {
    // Generate and insert fake data into the 'product_order' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake product_order data
      const fakeProductOrder = {
        productId: this.faker.number.int({ min: 1, max: 10 }), // Generate a random product ID
        orderId: this.faker.number.int({ min: 1, max: 10 }), // Generate a random order ID
      };

      this.insert(fakeProductOrder);
    }
  }
}

module.exports = ProductOrderSeeder;