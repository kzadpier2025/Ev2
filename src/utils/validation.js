const { object, string, boolean } = require('valibot');

/**
 * Esquema de Validación para Recordatorios
 */
const ReminderSchema = object({
  content: string({
    required_error: 'El contenido es requerido',
    max_length: 120,
  }),
  important: boolean(),
});

/**
 * Esquema de Validación para el Login
 */
const LoginSchema = object({
    username: string({
        required_error: "El nombre de usuario es requerido",
        min_length: 3,
    }),
    password: string({
        required_error: "La contraseña es requerida",
        min_length: 6,
    }),
});

/**
 * Función de Validación Genérica
 */
const validate = (schema, data) => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(result.error.message);
  }
  return result.data;
};

module.exports = {
  ReminderSchema,
  LoginSchema,
  validate,
};
