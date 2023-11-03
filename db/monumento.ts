import mongoose from "npm:mongoose";
import { Monumento } from "../types.ts";

const MonumentoSchema = new mongoose.Schema<Monumento>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  codigoPostal: { type: Number, required: true },
  ciudad: { type: String, required: true },
  pais: { type: String, required: true },
  continente: { type: String, required: true },
});

MonumentoSchema.set("toJSON", {
  transform: (_documento, monumento) => {
    monumento.id = monumento._id;
    delete monumento._id;
    delete monumento.__v;
  },
});

const MonumentoModelo = mongoose.model<Monumento>("Monumento", MonumentoSchema);

export default MonumentoModelo;
