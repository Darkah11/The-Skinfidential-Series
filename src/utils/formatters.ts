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