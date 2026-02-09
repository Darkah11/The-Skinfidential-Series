export const formatPrice = (price: string | number) => {
  const numericPrice = Number(price);

  if (Number.isNaN(numericPrice)) {
    return "N/A";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(numericPrice);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return formatted.format(date);
};
