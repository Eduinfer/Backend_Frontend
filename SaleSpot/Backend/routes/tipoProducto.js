const express = require('express');
const router = express.Router();
const connection = require('../db');

// Consultar un tipo de producto por su id_tipo_prod
router.get('/:id', (req, res) => {
  const { id } = req.params;

  connection.query('SELECT * FROM tipo_producto WHERE id_tipo_prod = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener el tipo de producto' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Tipo de producto no encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

// Consultar todos los tipos de producto
router.get('/', (req, res) => {
  connection.query('SELECT * FROM tipo_producto', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los tipos de producto' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron tipos de producto' });
      return;
    }

    res.json(results);
  });
});

// Crear un nuevo tipo de producto
router.post('/', (req, res) => {
  const { tipo_prod } = req.body;
  connection.query(
    'INSERT INTO tipo_producto (tipo_prod) VALUES (?)',
    [tipo_prod],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el tipo de producto' });
        return;
      }
      res.status(201).json({ message: 'Tipo de producto creado con éxito' });
    }
  );
});

// Actualizar un tipo de producto
router.put('/:id', (req, res) => {
  const { tipo_prod } = req.body;
  const { id } = req.params;

  // Primero, verifica si el tipo de producto existe
  connection.query(
    'SELECT * FROM tipo_producto WHERE id_tipo_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el tipo de producto' });
        return;
      }

      // Comprueba si se encontraron resultados (si el tipo de producto existe)
      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
        return;
      }

      // Si el tipo de producto existe, procede a actualizarlo
      connection.query(
        'UPDATE tipo_producto SET tipo_prod = ? WHERE id_tipo_prod = ?',
        [tipo_prod, id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar el tipo de producto' });
            return;
          }
          res.json({ message: 'Tipo de producto actualizado con éxito' });
        }
      );
    }
  );
});

// Eliminar un tipo de producto por su id_tipo_prod
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'SELECT * FROM tipo_producto WHERE id_tipo_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el tipo de producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de producto no encontrado' });
        return;
      }

      // Si el tipo de producto existe, procede a eliminarlo
      connection.query(
        'DELETE FROM tipo_producto WHERE id_tipo_prod = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el tipo de producto' });
            return;
          }
          res.json({ message: 'Tipo de producto eliminado con éxito' });
        }
      );
    }
  );
});

// Eliminar todos los tipos de productos
router.delete('/', (req, res) => {
  connection.query('DELETE FROM tipo_producto', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los tipos de producto' });
      return;
    }
    res.json({ message: 'Todos los tipos de productos han sido eliminados con éxito' });
  });
});


module.exports = router;
