import mongoose from "npm:mongoose";
import { Monumento } from "../types.ts";

const MonumentoSchema = new mongoose.Schema<Monumento>({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  zip: { type: Number, required: true },
  ciudad: { type: String, required: true },
  capital: { type: String, required: true },
  pais: { type: String, required: true },
  continente: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

MonumentoSchema.set("toJSON", {
  transform: (_documento, monumento) => {
    monumento.id = monumento._id;
    delete monumento.capital;
    delete monumento.latitude;
    delete monumento.longitude;
    delete monumento._id;
    delete monumento.__v;
  },
});

const MonumentoModelo = mongoose.model<Monumento>("Monumento", MonumentoSchema);

export default MonumentoModelo;
