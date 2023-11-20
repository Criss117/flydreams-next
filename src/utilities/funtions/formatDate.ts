export const formatDate = (date: string) => {
  const dateString: string = date;
  const newDate: Date = new Date(dateString);

  // Formatear la fecha según tus preferencias
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  const dateFormatted: string = newDate.toLocaleDateString("es-ES", options);

  return dateFormatted;
};

export function convertDateToDB(date: string): string {
  // Dividir la cadena de fecha en día, mes y año
  const parts = date.split("-");

  if (parts.length === 3) {
    // Reorganizar las partes en el nuevo formato
    const newDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
    return newDate;
  } else {
    // En caso de que la cadena no tenga el formato esperado
    console.error("Formato de fecha no válido.");
    return date; // Devuelve la cadena original si no se puede convertir
  }
}
