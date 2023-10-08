import { Elysia } from "elysia";
import { HealthController } from "./controllers";

const app = new Elysia().use(HealthController).listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
