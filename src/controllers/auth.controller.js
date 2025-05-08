const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

/**
 * Controlador de Autenticación
 */
const AuthController = {
  /**
   * Inicia sesión de un usuario.
   * @param {express.Request} req - El objeto de la solicitud de Express.
   * @param {express.Response} res - El objeto de la respuesta de Express.
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;
      
      const user = await prisma.user.findUnique({
        where: { username }
      });

      if (!user) {
        return res.status(401).json({
          error: 'Credenciales inválidas'
        });
      }

      const [salt, storedHash] = user.password.split(':');
      const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

      if (hash !== storedHash) {
        return res.status(401).json({
          error: 'Credenciales inválidas'
        });
      }

      const token = crypto.randomBytes(48).toString('hex');
      
      await prisma.user.update({
        where: { username },
        data: { token }
      });

      res.json({
        username: user.username,
        token,
        name: user.name
      });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  /**
   * Cierra la sesión de un usuario.
   * @param {express.Request} req - El objeto de la solicitud de Express.
   * @param {express.Response} res - El objeto de la respuesta de Express.
   */
  async logout(req, res) {
    res.status(200).json({ message: 'Sesión cerrada exitosamente' });
  },
};

module.exports = AuthController;
