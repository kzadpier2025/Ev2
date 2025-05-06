/**
 * Modelo para los usuarios.
 * @typedef {object} User
 * @property {string} username - Nombre de usuario (identificador único).
 * @property {string} name - Nombre completo del usuario.
 * @property {string} password - Contraseña del usuario (hasheada).
 * @property {string} token - Token de autenticación del usuario.
 */
const User = {
    username: '',
    name: '',
    password: '',
    token: '',
};

module.exports = User;