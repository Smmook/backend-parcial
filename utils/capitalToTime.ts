export default async (continente: string, capital: string): Promise<Date> => {
  const url = `http://worldtimeapi.org/api/timezone/${continente}/${capital}`;

  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error("Error al obtener la hora");
  }
  const { utc_datetime } = await res.json();

  const date = new Date(utc_datetime);

  return date;
};
