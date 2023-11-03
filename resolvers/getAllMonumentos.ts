// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModelo from "../db/monumento.ts";

const getAllMonumentos = async (req: Request, res: Response) => {
  const mons = await MonumentoModelo.find({});

  const monumentos = mons.map((mon) => {
    return {
      id: mon._id,
      nombre: mon.nombre,
      pais: mon.pais,
    };
  });

  res.send(monumentos);
};

export default getAllMonumentos;
