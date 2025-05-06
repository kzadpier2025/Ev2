const ReminderRepository = require('../repositories/reminder.repository');
const { ReminderSchema, validate } = require('../utils/validation');

const ReminderController = {
  async getAllReminders(req, res) {
    try {
      const reminders = await ReminderRepository.findAll();
      res.status(200).json(reminders);
    } catch (error) {
      console.error(error); // Registra el error en el servidor para depuración
      res.status(500).json({ error: 'Error al obtener los recordatorios' });
    }
  },

  async createReminder(req, res) {
    try {
      const validatedData = validate(ReminderSchema, req.body);
      const newReminder = await ReminderRepository.create(validatedData);
      res.status(201).json(newReminder);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message }); // Devuelve el mensaje de error de Valibot
    }
  },

  async getReminderById(req, res) {
    const { id } = req.params;
    try {
      const reminder = await ReminderRepository.findById(id);
      if (!reminder) {
        return res.status(404).json({ error: 'Recordatorio no encontrado' });
      }
      res.status(200).json(reminder);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener el recordatorio' });
    }
  },

  async updateReminder(req, res) {
    const { id } = req.params;
    try {
      const validatedData = validate(ReminderSchema, req.body);
      const updatedReminder = await ReminderRepository.update(id, validatedData);
      if (!updatedReminder) {
        return res.status(404).json({ error: 'Recordatorio no encontrado' });
      }
      res.status(200).json(updatedReminder);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message }); // Devuelve el mensaje de Valibot
    }
  },

  async deleteReminder(req, res) {
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
  },
};

module.exports = ReminderController;