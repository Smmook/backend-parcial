// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2";
import { Monumento, Place } from "../types.ts";
import zipToPlace from "../utils/zipToPlace.ts";

const addMonumento = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, zip, iso } = req.body;
    if (!nombre || !descripcion || !zip || !iso) {
      return res.status(400).send("Falta algun campo");
    }

    const place: Place = await zipToPlace(iso, zip);

    const monumento = {
      nombre,
      descripcion,
      zip,
      ciudad: place.ciudad,
      pais: place.pais,
      continente: place.continente,
    };

    res.send(monumento);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default addMonumento;
