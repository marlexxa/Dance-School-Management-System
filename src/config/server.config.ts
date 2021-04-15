const isProductionEnv = process.env.NODE_ENV === 'production';

export const cookieOptions = () => {
  if (!isProductionEnv)
    return {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    };
  return {
    origin: 'https://my-dance-school.herokuapp.com',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };
};
