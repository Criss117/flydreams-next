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
    timeZoneName: "short",
  };

  const dateFormatted: string = newDate.toLocaleDateString("es-ES", options);

  return dateFormatted;
};
