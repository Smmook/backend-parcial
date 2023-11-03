// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2";
import { Monumento, Place } from "../types.ts";
import zipToPlace from "../utils/zipToPlace.ts";
import MonumentoModelo from "../db/monumento.ts";

const addMonumento = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, zip, iso } = req.body;
    if (!nombre || !descripcion || !zip || !iso) {
      return res.status(500).send("Falta algun campo");
    }

    const mismoZipNombre = await MonumentoModelo.find({ zip, nombre });
    if (mismoZipNombre.length > 0) {
      return res.status(400).send(
        "Ya hay un monumento con ese nombre con el zip " + zip,
      );
    }

    const place: Place = await zipToPlace(iso, zip);

    const monumento: Monumento = {
      nombre,
      descripcion,
      zip,
      ciudad: place.ciudad,
      pais: place.pais,
      continente: place.continente,
      capital: place.capital,
      latitude: place.latitude,
      longitude: place.longitude,
    };

    const saved = await new MonumentoModelo(monumento).save();
    res.status(201).send(saved);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default addMonumento;
