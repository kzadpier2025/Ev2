const UserRepository = require('../repositories/user.repository');
const { generateToken } = require('../utils/auth'); // Importa la función generateToken
const { LoginSchema } = require('../utils/validation');
const { validate } = require('../utils/validation'); // Importa la función validate

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
      // Validar la entrada usando Valibot
      const { username, password } = validate(LoginSchema, req.body);
      const user = await UserRepository.validateCredentials(username, password);
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      const token = generateToken(user); // Genera el token
      await UserRepository.updateToken(username, token);
      res.json({
        username: user.username,
        token: token,
        name: user.name,
      });
    } catch (error) {
      res.status(400).json({ error: error.message }); // Devuelve el mensaje de error de Valibot
    }
  },

  /**
   * Cierra la sesión de un usuario.
   * @param {express.Request} req - El objeto de la solicitud de Express.
   * @param {express.Response} res - El objeto de la respuesta de Express.
   */
  async logout(req, res) {
    try {
      const { username } = req.user; // Obtiene el nombre de usuario del usuario autenticado
      await UserRepository.updateToken(username, null); // Elimina el token
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error al cerrar sesión' });
    }
  },
};

module.exports = AuthController;
