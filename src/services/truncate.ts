const trunc = (str: string, num: number, end?: string) => {
  if (str.length > num) return str.slice(0, num) + end ?? '';
  else return str;
};

export default trunc;
