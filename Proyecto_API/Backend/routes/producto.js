const express = require('express');
const router = express.Router();
const connection = require('../db');

// Obtener todos los productos
router.get('/', (req, res) => {
  connection.query('SELECT * FROM producto', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los productos' });
      return;
    }
    res.json(results);
  });
});

// Obtener un producto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM producto WHERE id_prod = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener el producto' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    res.json(results[0]);
  });
});

// Crear un nuevo producto
router.post('/', (req, res) => {
  const { desc_prod, tipo_prod, valor_prod, estado_prod } = req.body;

  // Validar los campos requeridos
  if (!desc_prod || !tipo_prod || valor_prod === undefined || estado_prod === undefined) {
    res.status(400).json({ error: 'Todos los campos son requeridos' });
    return;
  }

  // Validar que estado_prod sea un valor booleano (true o false)
  if (typeof estado_prod !== 'boolean') {
    res.status(400).json({ error: 'El campo estado_prod debe ser booleano (true o false)' });
    return;
  }

  connection.query(
    'INSERT INTO producto (desc_prod, tipo_prod, valor_prod, estado_prod) VALUES (?, ?, ?, ?)',
    [desc_prod, tipo_prod, valor_prod, estado_prod],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el producto' });
        return;
      }
      res.status(201).json({ message: 'Producto creado con éxito' });
    }
  );
});


// Actualizar un producto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { desc_prod, tipo_prod, valor_prod, estado_prod } = req.body;

  // Primero, verifica si el producto existe
  connection.query(
    'SELECT * FROM producto WHERE id_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      // Si el producto existe, procede a actualizarlo

      // Validar que estado_prod sea un valor booleano (true o false)
      if (estado_prod !== undefined && typeof estado_prod !== 'boolean') {
        res.status(400).json({ error: 'El campo estado_prod debe ser booleano (true o false)' });
        return;
      }

      // Construye la consulta de actualización según los campos proporcionados en la solicitud
      const updateQuery = 'UPDATE producto SET desc_prod = ?, tipo_prod = ?, valor_prod = ?, estado_prod = ? WHERE id_prod = ?';

      connection.query(
        updateQuery,
        [desc_prod, tipo_prod, valor_prod, estado_prod, id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar el producto' });
            return;
          }
          res.json({ message: 'Producto actualizado con éxito' });
        }
      );
    }
  );
});


// Eliminar un producto por su id_prod
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  connection.query(
    'SELECT * FROM producto WHERE id_prod = ?',
    [id],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Producto no encontrado' });
        return;
      }

      // Si el producto existe, procede a eliminarlo
      connection.query(
        'DELETE FROM producto WHERE id_prod = ?',
        [id],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
            return;
          }
          res.json({ message: 'Producto eliminado con éxito' });
        }
      );
    }
  );
});

// Eliminar todos los productos
router.delete('/', (req, res) => {
  connection.query('DELETE FROM producto', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los productos' });
      return;
    }
    res.json({ message: 'Todos los productos han sido eliminados con éxito' });
  });
});

module.exports = router;

