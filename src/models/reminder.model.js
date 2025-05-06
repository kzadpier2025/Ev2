/**
 * Modelo para los recordatorios.
 * @typedef {object} Reminder
 * @property {number} id - Identificador único del recordatorio.
 * @property {string} content - Contenido del recordatorio (máximo 120 caracteres).
 * @property {string} createdAt - Fecha de creación del recordatorio (timestamp).
 * @property {boolean} important - Indica si el recordatorio es importante.
 */
const Reminder = {
    id: undefined,
    content: '',
    createdAt: '',
    important: false,
};

module.exports = Reminder;