const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

// Generar una contraseña aleatoria
const generateRandomPassword = () => {
  const randomPassword = Math.random().toString(36).substring(2, 10); // Genera una contraseña de 8 caracteres
  return randomPassword;
};

// Crear un nuevo administrador con contraseña generada automáticamente
router.post('/', (req, res) => {
  const { tdoc_admin, id_admin, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado } = req.body;

  // Generar una contraseña aleatoria
  const pass_admin = generateRandomPassword();

  if (!tdoc_admin || !id_admin || !nombre_1 || !apellido_1 || !direccion || typeof estado !== 'boolean') {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes y el campo estado debe ser booleano' });
  }

  // Validar que el tipo de documento exista
  connection.query(
    'SELECT * FROM tipo_documento WHERE tdoc = ?',
    [tdoc_admin],
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

      // Validar que el rol exista y sea "administrador"
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ? AND desc_rol = "administrador"',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado o no es un rol de administrador' });
            return;
          }

          // Si el tipo de documento y el rol existen y el rol es "administrador", procede a crear el administrador
          connection.query(
            'INSERT INTO administrador (tdoc_admin, id_admin, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, pass_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [tdoc_admin, id_admin, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, pass_admin],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear el administrador' });
                return;
              }
              res.status(201).json({ message: 'Administrador creado con éxito', password: pass_admin });
            }
          );
        }
      );
    }
  );
});



// Consultar un administrador por su tdoc_admin e id_admin
router.get('/:tdoc_admin/:id_admin', (req, res) => {
  const { tdoc_admin, id_admin } = req.params;

  connection.query(
    'SELECT * FROM administrador WHERE tdoc_admin = ? AND id_admin = ?',
    [tdoc_admin, id_admin],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el administrador' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Administrador no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Consultar todos los administradores
router.get('/', (req, res) => {
  connection.query('SELECT * FROM administrador', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los administradores' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron administradores' });
      return;
    }

    res.json(results);
  });
});


// Actualizar un administrador (excluyendo pass_admin)
router.put('/:tdoc_admin/:id_admin', (req, res) => {
  const { tdoc_admin, id_admin } = req.params;
  const { nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado } = req.body;

  if (!nombre_1 || !apellido_1 || !direccion) {
    return res.status(400).json({ error: 'Los campos obligatorios deben estar presentes y el campo estado debe ser booleano' });
  }

  // Validar que el administrador exista
  connection.query(
    'SELECT * FROM administrador WHERE tdoc_admin = ? AND id_admin = ?',
    [tdoc_admin, id_admin],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al verificar el administrador' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Administrador no encontrado' });
        return;
      }

      // Validar que el rol exista
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ?',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado' });
            return;
          }

          // Si el administrador existe y el rol existe, procede a actualizar los demás campos
          connection.query(
            'UPDATE administrador SET nombre_1 = ?, nombre_2 = ?, apellido_1 = ?, apellido_2 = ?, direccion = ?, rol = ?, estado = ? WHERE tdoc_admin = ? AND id_admin = ?',
            [nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, tdoc_admin, id_admin],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar el administrador' });
                return;
              }
              res.json({ message: 'Administrador actualizado con éxito' });
            }
          );
        }
      );
    }
  );
});

// Eliminar un administrador por su tdoc_admin e id_admin
router.delete('/:tdoc_admin/:id_admin', (req, res) => {
  const { tdoc_admin, id_admin } = req.params;

  connection.query(
    'DELETE FROM administrador WHERE tdoc_admin = ? AND id_admin = ?',
    [tdoc_admin, id_admin],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el administrador' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Administrador no encontrado' });
        return;
      }

      res.json({ message: 'Administrador eliminado con éxito' });
    }
  );
});

// Eliminar todos los administradores
router.delete('/', (req, res) => {
  connection.query('DELETE FROM administrador', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los administradores' });
      return;
    }
    res.json({ message: 'Todos los administradores han sido eliminados con éxito' });
  });
});


module.exports = router;

