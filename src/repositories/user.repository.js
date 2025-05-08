const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
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
      where: { username }
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
    const inputHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const passwordMatch = inputHash === storedHash;

    return passwordMatch ? user : null;
  },

  async validatePassword(inputPassword, storedPassword) {
    const [salt, storedHash] = storedPassword.split(':');
    const hash = crypto.pbkdf2Sync(inputPassword, salt, 1000, 64, 'sha512').toString('hex');
    return hash === storedHash;
  },

  async createUser(username, password, name) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    const hashedPassword = `${salt}:${hash}`;

    return prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name
      }
    });
  }
};

module.exports = UserRepository;