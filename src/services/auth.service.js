const UserRepository = require('../repositories/user.repository');
const { generateToken, verifyToken } = require('../utils/auth');
const { LoginSchema, validate } = require('../utils/validation');

const AuthService = {
    async login(loginData) {
        try {
            const validatedData = validate(LoginSchema, loginData);
            const user = await UserRepository.validateCredentials(validatedData.username, validatedData.password);
            if (!user) {
                throw new Error('Credenciales inválidas');
            }
            const token = generateToken(user);
            await UserRepository.updateToken(validatedData.username, token);
            return {
                username: user.username,
                token: token,
                name: user.name,
            };
        } catch (error) {
            throw new Error(`Error al iniciar sesión: ${error.message}`);
        }
    },

    async logout(username) {
        try {
            await UserRepository.updateToken(username, null);
        } catch (error) {
            throw new Error('Error al cerrar sesión');
        }
    },

    async verifyToken(token) {
      try {
        const decoded = verifyToken(token);
        const user = await UserRepository.findByUsername(decoded.username);
        if (!user) {
          throw new Error("Token inválido: Usuario no encontrado");
        }
        return user;
      } catch (error) {
        throw new Error(`Error al verificar el token: ${error.message}`);
      }
    },
};

module.exports = AuthService;