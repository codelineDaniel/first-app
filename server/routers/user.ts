import { Router } from "express";
import { UserRecord } from "../records/user.record";

export const userRouter = Router();

userRouter
  .get("/", async (req, res) => {
    const userList = await UserRecord.listAll();
    res.send(userList);
  })
  .post("/addUser", async (req, res) => {
    const newUser = new UserRecord(req.body);
    await newUser.insert();
    res.send(newUser);
  })
  .patch("/updateUser", async (req, res) => {
    const newUser = new UserRecord(req.body);
    await newUser.updateOne();
    res.send(newUser);
  });


