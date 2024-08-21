import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import fs from 'fs';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API RESTful - Trisog',
      version: '1.0.0',
      description: "This project involves the development of a **RESTful API using Node.js and TypeScript**, with a focus on integrating **MongoDB** for " + 
      "database management. The API is designed to manage **touristic experiences**, allowing users to interact with data related to destinations, " + 
      "activities, bookings, and reviews.\n\n" +

      "The API will enable users to perform essential operations such as creating, retrieving, updating, and deleting information about destinations " + 
      "and activities. Additionally, it will support booking management and user reviews for these experiences. Security and data privacy are key " + 
      "priorities, with robust authentication and authorization mechanisms implemented using **Firebase Authentication**.\n\n" +

      "**Firebase Storage** is utilized for managing and storing user-uploaded images associated with experiences. **Docker** and **Docker Compose** are " + 
      "employed to ensure consistent and scalable deployment across different environments. **Jest** is used for unit and integration testing, ensuring " + 
      "the reliability and quality of the API.\n\n" +

      "**Prisma** is used as the ORM tool to facilitate interaction with MongoDB, providing a robust and type-safe interface for database queries and " + 
      "data manipulation. This allows for efficient and secure data handling throughout the application.\n\n" +

      "For API documentation, **Swagger UI** is integrated with the **'swagger-ui-express'** package in conjunction with **'swagger-jsdoc'** to automatically " + 
      "generate and maintain up-to-date documentation from source code annotations. This facilitates a clear understanding and ease of use for " + 
      "developers and users interacting with the API.\n\n" +

      "Dependencies are managed with **Yarn**, providing a reliable and efficient way to handle project libraries. The project is deployed on **Vercel**, " + 
      "which ensures high performance and scalability for the API.\n\n" +

      "In summary, this software aims to deliver a **comprehensive and secure API for managing touristic experiences**, ensuring a seamless user " + 
      "experience and effective management of data related to destinations and activities.",
      license: {
        name: 'MIT License',
        url: 'https://github.com/ViniciusGR797/trisog-api/blob/master/LICENSE',
      },
    },
    components: {
      securitySchemes: {
        jwt: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
          description: "To authenticate, pass the JWT token in the format **Bearer _token_**.",
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const swaggerJsonPath = path.join(__dirname, 'swagger.json');
const swaggerSpecJson = fs.existsSync(swaggerJsonPath) ? JSON.parse(fs.readFileSync(swaggerJsonPath, 'utf8')) : null;

const customCss = fs.readFileSync(path.join(__dirname, '../.././node_modules/swagger-ui-dist/swagger-ui.css'), 'utf8');
const swaggerStyle = {
    customCss
};

export { swaggerSpec, swaggerSpecJson, swaggerStyle };