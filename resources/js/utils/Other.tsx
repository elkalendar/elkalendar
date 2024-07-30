export const hasValues = (obj: any): boolean => {
  return Object.values(obj).some(v => v !== null && typeof v !== "undefined")
};


