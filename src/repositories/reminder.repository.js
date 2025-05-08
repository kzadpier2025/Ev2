const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Repositorio de Recordatorios
 */
const ReminderRepository = {
  /**
   * Lista todos los recordatorios.
   * @returns {Promise<Reminder[]>} - Un array de todos los recordatorios.
   */
  async findAll() {
    return prisma.reminder.findMany({
      orderBy: [
        { important: 'desc' },
        { createdAt: 'desc' }
      ]
    });
  },

  /**
   * Obtiene un recordatorio por su ID.
   * @param {string} id - El ID del recordatorio.
   * @returns {Promise<Reminder | null>} - El recordatorio encontrado, o null si no existe.
   */
  async findById(id) {
    return prisma.reminder.findUnique({
      where: { id: String(id) }
    });
  },

  /**
    * Crea un nuevo recordatorio.
    * @param {object} data - Los datos del nuevo recordatorio.
    * @param {string} data.content - El contenido del recordatorio.
    * @param {boolean} data.important - Indica si el recordatorio es importante.
    * @returns {Promise<Reminder>} - El nuevo recordatorio creado.
    */
  async create(data) {
    return prisma.reminder.create({
      data: {
        content: data.content,
        important: data.important || false
      }
    });
  },

  /**
   * Actualiza parcialmente un recordatorio por su ID.
   * @param {string} id - El ID del recordatorio a actualizar.
   * @param {object} data - Los datos a actualizar del recordatorio.
   * @param {string} [data.content] - El nuevo contenido del recordatorio (opcional).
   * @param {boolean} [data.important] - La nueva importancia del recordatorio (opcional).
   * @returns {Promise<Reminder>} - El recordatorio actualizado.
   */
  async update(id, data) {
    return prisma.reminder.update({
      where: { id: String(id) },
      data: {
        content: data.content,
        important: data.important
      }
    });
  },

  /**
   * Elimina un recordatorio por su ID.
   * @param {string} id - El ID del recordatorio a eliminar.
   * @returns {Promise<void>}
   */
  async delete(id) {
    return prisma.reminder.delete({
      where: { id: String(id) }
    });
  },
};

module.exports = ReminderRepository;