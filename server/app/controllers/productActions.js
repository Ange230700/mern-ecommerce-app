// Import access to database tables
const tables = require("../../database/tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const products = await tables.product.readAll();

    // Respond with the items in JSON format
    response.status(200).json(products);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const read = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const product = await tables.product.read(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (product == null) {
      response.sendStatus(404);
    } else {
      response.json(product);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (request, response, next) => {
  // Extract the item ID from the request parameters
  const { id } = request.params;

  // Extract the item data from the request body
  const product = request.body;

  try {
    // Update the item in the database
    await tables.product.update(id, product);

    // Respond with HTTP 200 (OK)
    response.sendStatus(200);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (request, response, next) => {
  // Extract the item data from the request body
  const product = request.body;

  try {
    // Insert the item into the database
    const id = await tables.product.create(product);

    // Respond with the ID of the newly created item
    response.json({ id });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy = async (request, response, next) => {
  try {
    // Delete the item from the database
    await tables.product.delete(request.params.id);

    // Respond with HTTP 204 (No Content)
    response.sendStatus(204);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Export the functions to be used as middleware
module.exports = { browse, read, edit, add, destroy };