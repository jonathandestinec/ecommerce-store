const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1, // Number of decimal places (e.g., 1.5k instead of 1.53k)
  }).format(num);
};

export {formatNumber}