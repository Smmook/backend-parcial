// @deno-types="npm:@types/express"
import express from "npm:express@4.18.2";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import mongoose from "npm:mongoose";
import addMonumento from "./resolvers/addMonumento.ts";
import getAllMonumentos from "./resolvers/getAllMonumentos.ts";
import getMonumento from "./resolvers/getMonumento.ts";
import editMonument from "./resolvers/editMonument.ts";
import deleteMonument from "./resolvers/deleteMonument.ts";

const env = await load();
const mongoUri = env.MONGO || Deno.env.get("MONGO");
if (!mongoUri) {
  console.log("No se ha podido obtener la uri de mongodb");
  Deno.exit();
}

await mongoose.connect(mongoUri);

const app = express();

app.use(express.json());

app
  .get("/api/monumentos", getAllMonumentos)
  .get("/api/monumentos/:id", getMonumento)
  .post("/api/monumentos", addMonumento)
  .put("/api/monumentos/:id", editMonument)
  .delete("/api/monumentos/:id", deleteMonument);

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
