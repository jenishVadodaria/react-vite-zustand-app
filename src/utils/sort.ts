export const Sort = <T>(
  data: T[],
  sortColumn: keyof T,
  sortDirection: "asc" | "desc" | string
): T[] => {
  return data.slice().sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    const isNumeric = (value: any) => {
      return !isNaN(parseFloat(value)) && isFinite(value);
    };

    if (isNumeric(aValue) && isNumeric(bValue)) {
      const parsedA = parseFloat(aValue as string);
      const parsedB = parseFloat(bValue as string);
      return sortDirection === "asc" ? parsedA - parsedB : parsedB - parsedA;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (Array.isArray(aValue) && Array.isArray(bValue)) {
      return sortDirection === "asc"
        ? aValue.length - bValue.length
        : bValue.length - aValue.length;
    }

    return 0;
  });
};
