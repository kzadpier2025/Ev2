const ReminderRepository = require('../repositories/reminder.repository');
const { ReminderSchema, validate } = require('../utils/validation');

const ReminderService = {
    async getAllReminders() {
        try {
            const reminders = await ReminderRepository.findAll();
            return reminders;
        } catch (error) {
            throw new Error('Error al obtener los recordatorios');
        }
    },

    async getReminderById(id) {
        try {
            const reminder = await ReminderRepository.findById(id);
            if (!reminder) {
                throw new Error('Recordatorio no encontrado');
            }
            return reminder;
        } catch (error) {
             throw new Error(`Error al obtener el recordatorio con ID ${id}: ${error.message}`);
        }
    },

    async createReminder(reminderData) {
        try {
            const validatedData = validate(ReminderSchema, reminderData);
            const newReminder = await ReminderRepository.create(validatedData);
            return newReminder;
        } catch (error) {
            throw new Error(`Error al crear el recordatorio: ${error.message}`);
        }
    },

    async updateReminder(id, reminderData) {
        try {
            const validatedData = validate(ReminderSchema, reminderData);
            const updatedReminder = await ReminderRepository.update(id, validatedData);
            if (!updatedReminder) {
                throw new Error('Recordatorio no encontrado');
            }
            return updatedReminder;
        } catch (error) {
          throw new Error(`Error al actualizar el recordatorio con ID ${id}: ${error.message}`);
        }
    },

    async deleteReminder(id) {
        try {
            const reminder = await ReminderRepository.findById(id);
              if (!reminder) {
                throw new Error('Recordatorio no encontrado');
            }
            await ReminderRepository.delete(id);
        } catch (error) {
             throw new Error(`Error al eliminar el recordatorio con ID ${id}: ${error.message}`);
        }
    },
};

module.exports = ReminderService;
