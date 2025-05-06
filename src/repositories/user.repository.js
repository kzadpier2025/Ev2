//const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('../src/generated/prisma');
const { scryptSync } = require('crypto');
const prisma = new PrismaClient();

/**
 * Repositorio de Usuarios
 */
const UserRepository = {
  /**
   * Obtiene un usuario por su nombre de usuario.
   * @param {string} username - El nombre de usuario del usuario.
   * @returns {Promise<User | null>} - El usuario encontrado, o null si no existe.
   */
  async findByUsername(username) {
    return prisma.user.findUnique({
      where: { username: username },
    });
  },

  /**
   * Obtiene un usuario por su token.
   * @param {string} token - El token del usuario.
   * @returns {Promise<User | null>} - El usuario encontrado, o null si no existe.
   */
  async findByToken(token) {
    return prisma.user.findUnique({
      where: { token: token },
    });
  },

  /**
   * Actualiza el token de un usuario.
   * @param {string} username - El nombre de usuario del usuario a actualizar.
   * @param {string | null} token - El nuevo token del usuario, o null para eliminarlo.
   * @returns {Promise<User>} - El usuario actualizado.
   */
  async updateToken(username, token) {
    return prisma.user.update({
      where: { username: username },
      data: { token: token },
    });
  },

  /**
   * Valida las credenciales de un usuario (nombre de usuario y contraseña).
   * @param {string} username - El nombre de usuario del usuario.
   * @param {string} password - La contraseña del usuario.
   * @returns {Promise<User | null>} - El usuario si las credenciales son válidas, o null si no lo son.
   */
  async validateCredentials(username, password) {
    const user = await this.findByUsername(username);
    if (!user) {
      return null;
    }

    const [salt, storedHash] = user.password.split(':');
    const inputHash = scryptSync(password, salt, 64).toString('hex');
    const passwordMatch = inputHash === storedHash;

    return passwordMatch ? user : null;
  },
};

module.exports = UserRepository;