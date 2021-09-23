const parseIntNull = (str: string | null) => {
  if (str) return parseInt(str);
  return undefined
};

export default parseIntNull;