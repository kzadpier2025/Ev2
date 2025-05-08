const { object, string, boolean, minLength, maxLength, parse } = require('valibot');

/**
 * Esquema para el login
 */
const loginSchema = object({
  username: string([minLength(1, 'El nombre de usuario es requerido')]),
  password: string([minLength(1, 'La contraseña es requerida')])
});

/**
 * Esquema para los recordatorios
 */
const reminderSchema = object({
  content: string([
    minLength(1, 'El contenido es requerido'),
    maxLength(120, 'El contenido no puede tener más de 120 caracteres')
  ]),
  important: boolean()
});

/**
 * Función de Validación
 */
function validate(schema, data) {
  try {
    return parse(schema, data);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  loginSchema,
  reminderSchema,
  validate
};
