import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Simbiose API",
      version: "1.0.0",
      description: "Documentação da API Simbiose",
    },

    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        LoginRequest: {
          type: "object",
          required: ["email", "senha"],
          properties: {
            email: {
              type: "string",
              example: "admin@email.com",
            },
            senha: {
              type: "string",
              example: "123456",
            },
          },
        },

        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
              example:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            },
          },
        },

        Usuario: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6846ab123456789abcdef123",
            },
            nome: {
              type: "string",
              example: "Mateus Oliveira",
            },
            email: {
              type: "string",
              example: "mateus@email.com",
            },
            role: {
              type: "string",
              example: "admin",
            },
          },
        },

        CriarUsuario: {
          type: "object",
          required: ["nome", "email", "senha"],
          properties: {
            nome: {
              type: "string",
              example: "Mateus Oliveira",
            },
            email: {
              type: "string",
              example: "mateus@email.com",
            },
            senha: {
              type: "string",
              example: "123456",
            },
            role: {
              type: "string",
              example: "user",
            },
          },
        },

        Especie: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "6846ab123456789abcdef123",
            },
            nome: {
              type: "string",
              example: "Lobo Guará",
            },
            tempoVida: {
              type: "number",
              example: 15,
            },
            descricao: {
              type: "string",
              example:
                "Mamífero típico do cerrado brasileiro",
            },
            habitat: {
              type: "string",
              example: "Cerrado",
            },
            arquivo: {
              type: "string",
              example: "lobo-guara.jpg",
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            erro: {
              type: "string",
              example: "Token inválido",
            },
          },
        },

        SuccessResponse: {
          type: "object",
          properties: {
            mensagem: {
              type: "string",
              example: "Operação realizada com sucesso",
            },
          },
        },
      },
    },

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    "./src/routes/*.ts",
    "./src/controllers/*.ts",
  ],
};

export const swaggerSpec = swaggerJsdoc(options);