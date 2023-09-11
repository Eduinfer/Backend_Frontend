const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

// Generar una contraseña aleatoria
const generateRandomPassword = () => {
  const randomPassword = Math.random().toString(36).substring(2, 10); // Genera una contraseña de 8 caracteres
  return randomPassword;
};

// Crear un nuevo empleado
router.post('/', (req, res) => {
  const { tdoc_empleado, id_empleado, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, salario, pass_empleado } = req.body;

  // Generar una contraseña aleatoria
  const passEmpleado = generateRandomPassword();

  if (!tdoc_empleado || !id_empleado || !nombre_1 || !apellido_1 || !direccion || !rol || typeof estado !== 'boolean' || !salario) {
    return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes y el campo estado debe ser booleano' });
  }

  // Validar que el tipo de documento exista
  connection.query(
    'SELECT * FROM tipo_documento WHERE tdoc = ?',
    [tdoc_empleado],
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

      // Validar que el rol exista y sea "empleado"
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ? AND desc_rol = "empleado"',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado o no es "empleado"' });
            return;
          }

          // Si el tipo de documento y el rol existen, procede a crear el empleado
          connection.query(
            'INSERT INTO empleado (tdoc_empleado, id_empleado, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, salario, pass_empleado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [tdoc_empleado, id_empleado, nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, salario, passEmpleado],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear el empleado' });
                return;
              }
              res.status(201).json({ message: 'Empleado creado con éxito', password: passEmpleado });
            }
          );
        }
      );
    }
  );
});

// Consultar un empleado por su tdoc_empleado e id_empleado
router.get('/:tdoc_empleado/:id_empleado', (req, res) => {
  const { tdoc_empleado, id_empleado } = req.params;

  connection.query(
    'SELECT * FROM empleado WHERE tdoc_empleado = ? AND id_empleado = ?',
    [tdoc_empleado, id_empleado],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el empleado' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Empleado no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Consultar todos los empleados
router.get('/', (req, res) => {
  connection.query('SELECT * FROM empleado', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los empleados' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron empleados' });
      return;
    }

    res.json(results);
  });
});

// Actualizar un empleado (excluyendo pass_empleado)
router.put('/:tdoc_empleado/:id_empleado', (req, res) => {
  const { tdoc_empleado, id_empleado } = req.params;
  const { nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, salario } = req.body;

  if (!nombre_1 || !apellido_1 || !direccion || typeof estado !== 'boolean' || !salario) {
    return res.status(400).json({ error: 'Los campos obligatorios deben estar presentes y el campo estado debe ser booleano' });
  }

  // Validar que el empleado exista
  connection.query(
    'SELECT * FROM empleado WHERE tdoc_empleado = ? AND id_empleado = ?',
    [tdoc_empleado, id_empleado],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al verificar el empleado' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Empleado no encontrado' });
        return;
      }

      // Validar que el rol exista y sea "empleado"
      connection.query(
        'SELECT * FROM roles WHERE id_rol = ? AND desc_rol = "empleado"',
        [rol],
        (err, results) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al verificar el rol' });
            return;
          }

          if (results.length === 0) {
            res.status(404).json({ error: 'Rol no encontrado o no es "empleado"' });
            return;
          }

          // Si el empleado existe y el rol existe, procede a actualizar los demás campos
          connection.query(
            'UPDATE empleado SET nombre_1 = ?, nombre_2 = ?, apellido_1 = ?, apellido_2 = ?, direccion = ?, rol = ?, estado = ?, salario = ? WHERE tdoc_empleado = ? AND id_empleado = ?',
            [nombre_1, nombre_2, apellido_1, apellido_2, direccion, rol, estado, salario, tdoc_empleado, id_empleado],
            (err, result) => {
              if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar el empleado' });
                return;
              }
              res.json({ message: 'Empleado actualizado con éxito' });
            }
          );
        }
      );
    }
  );
});

// Eliminar un empleado por su tdoc_empleado e id_empleado
router.delete('/:tdoc_empleado/:id_empleado', (req, res) => {
  const { tdoc_empleado, id_empleado } = req.params;

  connection.query(
    'DELETE FROM empleado WHERE tdoc_empleado = ? AND id_empleado = ?',
    [tdoc_empleado, id_empleado],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el empleado' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Empleado no encontrado' });
        return;
      }

      res.json({ message: 'Empleado eliminado con éxito' });
    }
  );
});

// Eliminar todos los empleados
router.delete('/', (req, res) => {
  connection.query('DELETE FROM empleado', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los empleados' });
      return;
    }

    res.json({ message: 'Todos los empleados han sido eliminados con éxito' });
  });
});


module.exports = router;