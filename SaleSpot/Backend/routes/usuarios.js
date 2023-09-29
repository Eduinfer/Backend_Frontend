const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

// Generar una contraseña aleatoria
const generateRandomPassword = () => {
  const randomPassword = Math.random().toString(36).substring(2, 10); // Genera una contraseña de 8 caracteres
  return randomPassword;
};

// Crear un nuevo usuario (que puede ser administrador o empleado) con contraseña generada automáticamente
router.post('/', (req, res) => {
  const { tdoc_user, id_user, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado } = req.body;

  // Generar una contraseña aleatoria
  const pass_user = generateRandomPassword();

  if (!tdoc_user || !id_user || !nombre_1 || !apellido_1 || !direccion || typeof estado !== 'boolean') {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes, y el campo estado debe ser booleano' });
  }

  // Validar que el tipo de documento exista
  connection.query(
    'SELECT * FROM tipo_documento WHERE tdoc = ?',
    [tdoc_user],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al verificar el tipo de documento' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      // Validar que el rol exista y sea "administrador" o "empleado"
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ? AND (desc_rol = "administrador" OR desc_rol = "empleado")',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado o no es un rol válido' });
            return;
          }

          // Si el tipo de documento, el rol y el estado son válidos, procede a crear el usuario
          connection.query(
            'INSERT INTO usuario (tdoc_user, id_user, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, pass_user) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [tdoc_user, id_user, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, pass_user],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear el usuario' });
                return;
              }
              res.status(201).json({ message: 'Usuario creado con éxito', password: pass_user });
            }
          );
        }
      );
    }
  );
});

// Consultar un usuario por su tdoc_user e id_user
router.get('/:tdoc_user/:id_user', (req, res) => {
  const { tdoc_user, id_user } = req.params;

  connection.query(
    'SELECT * FROM usuario WHERE tdoc_user = ? AND id_user = ?',
    [tdoc_user, id_user],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el usuario' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Consultar todos los usuarios
router.get('/', (req, res) => {
  connection.query('SELECT * FROM usuario', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los usuarios' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron usuarios' });
      return;
    }

    res.json(results);
  });
});

// Actualizar un usuario (excluyendo pass_user)
router.put('/:tdoc_user/:id_user', (req, res) => {
  const { tdoc_user, id_user } = req.params;
  const { nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado } = req.body;

  if (!nombre_1 || !apellido_1 || !direccion || typeof estado !== 'boolean') {
    return res.status(400).json({ error: 'Los campos obligatorios deben estar presentes y el campo estado debe ser booleano' });
  }

  // Validar que el usuario exista
  connection.query(
    'SELECT * FROM usuario WHERE tdoc_user = ? AND id_user = ?',
    [tdoc_user, id_user],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al verificar el usuario' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      // Validar que el rol exista y sea "administrador" o "empleado"
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ? AND (desc_rol = "administrador" OR desc_rol = "empleado")',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado o no es un rol válido' });
            return;
          }

          // Si el usuario existe, el rol es válido y el estado es booleano, procede a actualizar los demás campos
          connection.query(
            'UPDATE usuario SET nombre_1 = ?, nombre_2 = ?, apellido_1 = ?, apellido_2 = ?, direccion = ?, rol = ?, estado = ? WHERE tdoc_user = ? AND id_user = ?',
            [nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, tdoc_user, id_user],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar el usuario' });
                return;
              }
              res.json({ message: 'Usuario actualizado con éxito' });
            }
          );
        }
      );
    }
  );
});

// Eliminar un usuario por su tdoc_user e id_user
router.delete('/:tdoc_user/:id_user', (req, res) => {
  const { tdoc_user, id_user } = req.params;

  connection.query(
    'DELETE FROM usuario WHERE tdoc_user = ? AND id_user = ?',
    [tdoc_user, id_user],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        return;
      }

      res.json({ message: 'Usuario eliminado con éxito' });
    }
  );
});

// Eliminar todos los usuarios
router.delete('/', (req, res) => {
  connection.query('DELETE FROM usuario', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los usuarios' });
      return;
    }
    res.json({ message: 'Todos los usuarios han sido eliminados con éxito' });
  });
});


module.exports = router;

