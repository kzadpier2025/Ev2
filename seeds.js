const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

async function main() {
  // Eliminar el usuario existente si existe
  try {
    await prisma.user.delete({
      where: { username: 'admin' }
    });
    console.log('Usuario existente eliminado');
  } catch (error) {
    console.log('No se encontró usuario existente para eliminar');
  }

  // Generar salt y hash de la contraseña
  const salt = crypto.randomBytes(16).toString('hex');
  const password = 'certamen123'; // La contraseña correcta
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

  // Crear el usuario inicial
  const user = await prisma.user.create({
    data: {
      username: 'admin',
      name: 'Administrador',
      password: `${salt}:${hashedPassword}`, // Guardar salt y hash separados por ":"
    },
  });

  console.log('Usuario inicial creado:', user);
}

main()
  .catch((e) => {
    console.error('Error al crear el usuario inicial:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
