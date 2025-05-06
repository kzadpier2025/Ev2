const UserRepository = require('../repositories/user.repository');

/**
 * Middleware de Autenticación
 */
const authMiddleware = async (req, res, next) => {
  const token = req.get('X-Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No se ha proporcionado un token de autorización' });
  }

  try {
    const user = await UserRepository.findByToken(token);
    if (!user) {
      return res.status(401).json({ error: 'El token es inválido' });
    }
    req.user = user; // Agrega la información del usuario a la solicitud para que esté disponible en los controladores
    next();
  } catch (error) {
    return res.status(500).json({ error: 'Error al verificar el token' });
  }
};

module.exports = authMiddleware;