# Portfolio Backend

This is the backend for the portfolio website of Michael van der Bend. It is built using Express.js and provides APIs for handling various functionalities such as sending emails.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/michaelvbend/portfolio-backend.git
   cd portfolio-backend

   ```

2. Install the dependencies:

   ```sh
   npm install

   ```

3. Configuration
   Create a .env file in the root directory and add the following environment variables:

   ```sh
   MONGODB_URI=your_mongodb_uri
   PORT=3000
   ```

   Update the src/config/email-transport.config.js file with your email service configuration:

   ```sh
   export const TransportConfig = {
   host: 'smtp.example.com',
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
    user: 'your-email@example.com',
    pass: 'your-email-password',
   },
   };
   ```

## Running the application

```sh
npm run dev
npm test
```
