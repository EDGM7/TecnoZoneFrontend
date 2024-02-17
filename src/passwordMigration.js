const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Importamos el modelo de usuario


async function migratePasswords() {
  try {
    // Conectarse a la base de datos
    await mongoose.connect('mongodb://localhost:27017/tecnozonedb');

    // Obtener todos los usuarios
    const users = await User.find();

    // Iterar sobre cada usuario y hashear su contraseña
 
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword; // Actualizar la contraseña hasheada en el campo 'password'
        delete user.hashedPassword; // Eliminar el campo 'hashedPassword'
        await user.save();
    }
  

    console.log('Migración completa');
  } catch (error) {
    console.error('Error durante la migración:', error);
  } finally {
    // Desconectarse de la base de datos
    await mongoose.disconnect();
  }
}

// Ejecutar el script de migración
migratePasswords();
