const { PrismaClient } = require('@prisma/client');
const { scryptSync, randomBytes } = require('crypto');

const prisma = new PrismaClient();

async function main() {
  // Generar salt y hash de la contraseña
  const salt = randomBytes(16).toString('hex');
  const password = 'password'; // La contraseña por defecto es "password"
  const hashedPassword = scryptSync(password, salt, 64).toString('hex');

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
