import { Place } from "../types.ts";

export default async (iso: string, zip: number): Promise<Place> => {
  const urlCiudad = `https://zip-api.eu/api/v1/info/${iso}-${zip}`;
  const urlPais = `https://restcountries.com/v3.1/alpha/${iso}`;

  const resCiudad = await fetch(urlCiudad);
  const resPais = await fetch(urlPais);
  if (resCiudad.status !== 200 || resPais.status !== 200) {
    throw new Error("La informacion introducida no es valida.");
  }
  const { place_name } = await resCiudad.json();

  const data = await resPais.json();
  const pais = data[0].name.common;
  const continente = data[0].region;

  const place: Place = {
    ciudad: place_name,
    pais,
    continente,
  };

  return place;
};
