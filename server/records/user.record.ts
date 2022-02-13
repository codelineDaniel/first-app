import { pool } from "../utils/db";
import { ValidationError, isExistedError } from "../utils/error";
import { v4 as uuid } from "uuid";
import {FieldPacket} from "mysql2";

type UserRecordResults = [UserRecord[], FieldPacket[]];

export class UserRecord {
  public id?: string;
  public user: string;
  public score: number;

  constructor(obj: UserRecord) {
    if (!obj.user || obj.user.length < 3 || obj.user.length > 25) {
      throw new ValidationError("Imię musi mieć od 3 do 25 znaków.");
    }

    this.id = obj.id;
    this.user = obj.user;
    this.score = obj.score;
  }

  async insert(): Promise<string> {
    const [result] = (await pool.execute("SELECT * FROM `scores`")) as UserRecordResults;
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

  static async listAll(): Promise<UserRecord[]> {
    const [results] = (await pool.execute(
      "SELECT * FROM `scores` ORDER BY `score` DESC"
    )) as UserRecordResults;
    return results.map((item) => new UserRecord(item));
    // return results;
  }

  async updateOne(): Promise<void> {
    await pool.execute(
      "UPDATE `scores` SET `user` = :user, `score` = :score WHERE `user` = :user",
      {
        user: this.user,
        score: this.score,
      }
    );
  }
}

