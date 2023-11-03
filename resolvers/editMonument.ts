// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModelo from "../db/monumento.ts";
import { Monumento, Place } from "../types.ts";
import zipToPlace from "../utils/zipToPlace.ts";

const editMonument = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { nombre, descripcion, zip, iso } = req.body;
  if (!nombre || !descripcion || !zip || !iso) {
    return res.status(400).send("Falta algun campo");
  }
  try {
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
    const edited = await MonumentoModelo.findByIdAndUpdate(id, monumento, {
      new: true,
    });
    if (!edited) {
      res.status(404).send();
    } else {
      res.send(edited);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default editMonument;
