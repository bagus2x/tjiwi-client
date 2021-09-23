const isProductionMode = () => {
  return process.env.NODE_ENV === 'production';
};

export default isProductionMode;
