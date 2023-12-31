const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Project 2 API",
        description: "Project 2 API Information",
        version: "1.0.0"
    },
    host: "project2-am6a.onrender.com",
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);