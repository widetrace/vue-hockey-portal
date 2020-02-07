import path, { dirname } from "path";

import Koa from "koa";
import Router from "koa-router";
import body from "koa-body";
import send from "koa-send";
import cors from "@koa/cors";

const app = new Koa();
const router = new Router();

app.use(require("koa-static")(`../dist`));
app.use(cors());
app.use(body());

router
  // .get('/list', async (ctx, next) => {
  //   const list = await listModel.find();
  //   ctx.body = list;
  // })

  // .post('/list/postNewTask', async (ctx, next) => {
  //   const newTask = new listModel(ctx.request.body);
  //   await newTask.save((err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  //   ctx.body = ctx.request.body;
  // })

  // .put('/updateStatus', async (ctx, next) => {
  //   await listModel.findOneAndUpdate({ _id: ctx.request.body.id }, { status: true });
  //   ctx.body = ctx.request.body;
  // })

  // .put('/list/updateTask', async (ctx, next) => {
  //   console.log(ctx.request.body);
  //   await listModel.findOneAndUpdate({ _id: ctx.request.body.id }, ctx.request.body);
  //   ctx.body = ctx.request.body;
  // })

  // .delete('/list/deleteTask', async (ctx, next) => {
  //   await listModel.findOneAndDelete({ _id: ctx.request.query.id });
  //   ctx.body = ctx.request.body;
  // })

  .get("*", async ctx => {
    send(ctx, `../dist/index.html`, {
      root: "/"
    });
  });

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4113, () => {
  console.log("I'm on port 4113");
});

mongoose.connect(config.url, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongoose default connection open");
});

db.on("error", err => {
  console.log(`Mongoose default connection error: ${err}`);
});

db.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});
