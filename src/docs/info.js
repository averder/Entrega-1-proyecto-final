export const info = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Carrito y Productos",
      description: "API para gestionar carritos de compra y productos",
      version: "1.0.0",
      contact: {
        name: "Agustin Verdera",
        email: "tuemail@dominio.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
      // {
      //     url: 'https://.......'
      // }
    ],
  },
  apis: ["./src/docs/*.yml"],
};
