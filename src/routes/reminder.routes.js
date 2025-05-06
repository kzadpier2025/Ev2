const express = require('express');
const router = express.Router();
const ReminderController = require('../controllers/reminder.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Rutas de recordatorios
router.get('/', authMiddleware, ReminderController.getAllReminders); // Obtener todos los recordatorios
router.get('/:id', authMiddleware, ReminderController.getReminderById); // Obtener un recordatorio por ID
router.post('/', authMiddleware, ReminderController.createReminder); // Crear un nuevo recordatorio
router.patch('/:id', authMiddleware, ReminderController.updateReminder); // Actualizar un recordatorio
router.delete('/:id', authMiddleware, ReminderController.deleteReminder); // Eliminar un recordatorio

module.exports = router;