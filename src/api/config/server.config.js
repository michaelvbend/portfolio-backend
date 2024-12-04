export const MAX_BODY_SIZE = 5000;

export const port = 3000;

export const corsOptions = {
  origin: ['https://michaelvdbend.dev', 'https://www.michaelvdbend.dev'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
