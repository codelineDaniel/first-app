const { pool } = require("../utils/db");
const { ValidationError, isExistedError } = require("../utils/error");
const { v4: uuid } = require("uuid");

class UserRecord {
  constructor(obj) {
    if (!obj.user || obj.user.length < 3 || obj.user.length > 25) {
      throw new ValidationError("Imię musi mieć od 3 do 25 znaków.");
    }

    this.id = obj.id;
    this.user = obj.user;
    this.score = obj.score;
  }

  async insert() {
    const [result] = await pool.execute("SELECT * FROM `scores`");
    const existed = result.filter((item) => item.user === this.user);
    if (existed.length > 0) {
      throw new isExistedError("Podana nazwa użytkownika jest już zajęta");
    }

    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      "INSERT INTO `scores` (`id`, `user`, `score`) VALUES (:id, :user, :score)",
      {
        id: this.id,
        user: this.user,
        score: this.score,
      }
    );
    return this.id;
  }

  static async listAll() {
    const [results] = await pool.execute(
      "SELECT * FROM `scores` ORDER BY `score` DESC"
    );
    return results.map((item) => new UserRecord(item));
    // return results;
  }

  async updateOne() {
    await pool.execute(
      "UPDATE `scores` SET `user` = :user, `score` = :score WHERE `user` = :user",
      {
        user: this.user,
        score: this.score,
      }
    );
  }
  static async getOne() {
    const [results] = await pool.execute(
      "SELECT * FROM `scores` WHERE `user` = :user",
      {
        user: this.user,
      }
    );
    return results.length > 0 ? null : results;
  }
}

module.exports = {
  UserRecord,
};
