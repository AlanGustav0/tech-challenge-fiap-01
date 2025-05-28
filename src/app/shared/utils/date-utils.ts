export function getformattedDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}

export function getMonthName(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date).charAt(0).toUpperCase() +
         new Intl.DateTimeFormat("pt-BR", options).format(date).slice(1);
}
