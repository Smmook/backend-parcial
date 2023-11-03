export default async (lat: number, lon: number): Promise<string> => {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,`;

  const res = await fetch(url);
  if (res.status !== 200) {
    throw new Error("No se ha podido obtener la temperatura.");
  }
  const data = await res.json();
  const temperatura = data.current.temperature_2m + " grados";
  return temperatura;
};
