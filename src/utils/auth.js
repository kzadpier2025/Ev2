const { randomBytes } = require('crypto');

/**
 * Genera un token aleatorio para la autenticación
 * @returns {string} Token generado
 */
const generateToken = () => {
  return randomBytes(48).toString('hex');
};

module.exports = {
  generateToken
}; 