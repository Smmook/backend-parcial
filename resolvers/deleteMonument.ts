// @deno-types="npm:@types/express"
import { Request, Response } from "npm:express@4.18.2";
import MonumentoModelo from "../db/monumento.ts";

const deleteMonument = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const deleted = await MonumentoModelo.findByIdAndDelete(id);
    if (!deleted) {
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default deleteMonument;
