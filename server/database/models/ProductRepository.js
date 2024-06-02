const AbstractRepository = require("./AbstractRepository");

class ProductRepository extends AbstractRepository {
  constructor() {
    super({ table: "product" });
  }

  async create({ title, price, image_url }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (title, price, image_url) VALUES (?, ?, ?)`,
      [title, price, image_url]
    );

    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    return rows;
  }

  async update(id, { title, price, image_url }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET title = ?, price = ?, image_url = ? WHERE id = ?`,
      [title, price, image_url, id]
    );

    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    return result.affectedRows;
  }
}

module.exports = ProductRepository;
