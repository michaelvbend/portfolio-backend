export const MAX_BODY_SIZE = 5000;

export const port = 3000;

export const corsOptions = {
  origin: 'https://portfolio-six-wine-65.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
