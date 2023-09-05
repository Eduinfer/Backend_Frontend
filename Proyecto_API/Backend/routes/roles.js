const express = require('express');
const router = express.Router();
const connection = require('../db');

// Crear un nuevo rol
router.post('/', (req, res) => {
  const { desc_rol } = req.body;

  if (!desc_rol) {
    return res.status(400).json({ error: 'La descripción del rol es obligatoria' });
  }

  connection.query(
    'INSERT INTO roles (desc_rol) VALUES (?)',
    [desc_rol],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el rol' });
        return;
      }
      res.status(201).json({ message: 'Rol creado con éxito' });
    }
  );
});

// Consultar un rol por su id_rol
router.get('/:id_rol', (req, res) => {
  const { id_rol } = req.params;

  connection.query(
    'SELECT * FROM roles WHERE id_rol = ?',
    [id_rol],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el rol' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});


// Consultar todos los roles
router.get('/', (req, res) => {
  connection.query('SELECT * FROM roles', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los roles' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron roles' });
      return;
    }

    res.json(results);
  });
});

// Actualizar un rol por su id_rol
router.put('/:id_rol', (req, res) => {
  const { id_rol } = req.params;
  const { desc_rol } = req.body;

  if (!desc_rol) {
    return res.status(400).json({ error: 'La descripción del rol es obligatoria' });
  }

  connection.query(
    'UPDATE roles SET desc_rol = ? WHERE id_rol = ?',
    [desc_rol, id_rol],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el rol' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      res.json({ message: 'Rol actualizado con éxito' });
    }
  );
});

// Eliminar un rol por su id_rol
router.delete('/:id_rol', (req, res) => {
  const { id_rol } = req.params;

  connection.query(
    'DELETE FROM roles WHERE id_rol = ?',
    [id_rol],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el rol' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Rol no encontrado' });
        return;
      }

      res.json({ message: 'Rol eliminado con éxito' });
    }
  );
});

// Eliminar todos los roles
router.delete('/', (req, res) => {
  connection.query('DELETE FROM roles', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los roles' });
      return;
    }
    res.json({ message: 'Todos los roles han sido eliminados con éxito' });
  });
});


module.exports = router;
