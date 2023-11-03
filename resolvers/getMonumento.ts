// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModelo from "../db/monumento.ts";
import capitalToTime from "../utils/capitalToTime.ts";
import { Monumento } from "../types.ts";
import placeToTemperature from "../utils/placeToTemperature.ts";

const getMonumento = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const monumento = await MonumentoModelo.findById(id);
    if (!monumento) {
      return res.status(400).send(
        "No se ha encontrado el monumento solicitado",
      );
    }

    const date: Date = await capitalToTime(
      monumento.continente,
      monumento.capital,
    );
    const hora = `${date.getHours()}:${date.getMinutes()}`;

    const temperatura: string = await placeToTemperature(
      monumento.latitude,
      monumento.longitude,
    );

    const monumentoFinal:
      & Omit<Monumento, "capital" | "latitude" | "longitude">
      & { id: string; hora: string; temperatura: string } = {
        nombre: monumento.nombre,
        descripcion: monumento.descripcion,
        zip: monumento.zip,
        ciudad: monumento.ciudad,
        pais: monumento.pais,
        continente: monumento.continente,
        hora,
        temperatura,
        id: monumento._id.toString(),
      };

    res.send(monumentoFinal);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default getMonumento;
