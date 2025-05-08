const ReminderRepository = require('../repositories/reminder.repository');
const { validate, CreateReminderSchema, UpdateReminderSchema } = require('../utils/validation');

// Exportar funciones individuales
async function getAll(req, res) {
    try {
        const reminders = await ReminderRepository.findAll();
        res.status(200).json(reminders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los recordatorios' });
    }
}

async function create(req, res) {
    try {
        const newReminder = await ReminderRepository.create(req.body);
        res.status(201).json(newReminder);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

async function deleteReminder(req, res) {
    const { id } = req.params;
    try {
        const reminder = await ReminderRepository.findById(id);
        if (!reminder) {
            return res.status(404).json({ error: 'Recordatorio no encontrado' });
        }
        await ReminderRepository.delete(id);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el recordatorio' });
    }
}

module.exports = {
    getAll,
    create,
    deleteReminder
};