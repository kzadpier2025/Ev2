const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas de autenticación
router.post('/login', AuthController.login); // Iniciar sesión
router.post('/logout', authMiddleware, AuthController.logout); // Cerrar sesión (protegida por autenticación)

module.exports = router;