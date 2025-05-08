const express = require('express');
const router = express.Router();
const { reminderSchema } = require('../utils/validation');
const { validate } = require('../utils/validation');
const { create, getAll, deleteReminder } = require('../controllers/reminder.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Middleware de validación
function validateReminder(req, res, next) {
    try {
        req.body = validate(reminderSchema, req.body);
        next();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Rutas de recordatorios
router.post('/', authMiddleware, validateReminder, create);
router.get('/', authMiddleware, getAll);
router.delete('/:id', authMiddleware, deleteReminder);

module.exports = router;