const express = require('express');
const router = express.Router();
const { loginSchema } = require('../utils/validation');
const { validate } = require('../utils/validation');
const { login } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Middleware de validación
function validateLogin(req, res, next) {
    try {
        req.body = validate(loginSchema, req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Rutas de autenticación
router.post('/login', validateLogin, login);
router.post('/logout', authMiddleware, (req, res) => {
    res.status(204).end();
});

module.exports = router;