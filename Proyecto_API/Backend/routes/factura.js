const express = require('express');
const router = express.Router();
const connection = require('../db');

// Consultar una factura por su n_factura
router.get('/:n_factura', (req, res) => {
  const { n_factura } = req.params;

  connection.query(
    'SELECT * FROM factura WHERE n_factura = ?',
    [n_factura],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener la factura' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }

      res.json(results[0]);
    }
  );
});

// Consultar todas las facturas
router.get('/', (req, res) => {
  connection.query('SELECT * FROM factura', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener las facturas' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron facturas' });
      return;
    }

    res.json(results);
  });
});

// Crear una nueva factura
router.post('/', (req, res) => {
  const { fecha_factura, subtotal, iva, total_factura } = req.body;
  connection.query(
    'INSERT INTO factura (fecha_factura, subtotal, iva, total_factura) VALUES (?, ?, ?, ?)',
    [fecha_factura, subtotal, iva, total_factura],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la factura' });
        return;
      }
      res.status(201).json({ message: 'Factura creada con éxito' });
    }
  );
});

// Actualizar una factura por su n_factura
router.put('/:n_factura', (req, res) => {
  const { fecha_factura, subtotal, iva, total_factura } = req.body;
  const { n_factura } = req.params;

  // Primero, verifica si la factura existe
  connection.query(
    'SELECT * FROM factura WHERE n_factura = ?',
    [n_factura],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la factura' });
        return;
      }

      // Comprueba si se encontraron resultados (si la factura existe)
      if (results.length === 0) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }

      // Si la factura existe, procede a actualizarla
      connection.query(
        'UPDATE factura SET fecha_factura = ?, subtotal = ?, iva = ?, total_factura = ? WHERE n_factura = ?',
        [fecha_factura, subtotal, iva, total_factura, n_factura],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar la factura' });
            return;
          }
          res.json({ message: 'Factura actualizada con éxito' });
        }
      );
    }
  );
});

// Eliminar una factura por su n_factura
router.delete('/:n_factura', (req, res) => {
  const { n_factura } = req.params;

  connection.query(
    'SELECT * FROM factura WHERE n_factura = ?',
    [n_factura],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la factura' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Factura no encontrada' });
        return;
      }

      // Si la factura existe, procede a eliminarla
      connection.query(
        'DELETE FROM factura WHERE n_factura = ?',
        [n_factura],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar la factura' });
            return;
          }
          res.json({ message: 'Factura eliminada con éxito' });
        }
      );
    }
  );
});

// Eliminar todas las facturas
router.delete('/', (req, res) => {
  connection.query('DELETE FROM factura', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todas las facturas' });
      return;
    }
    res.json({ message: 'Todas las facturas han sido eliminadas con éxito' });
  });
});


module.exports = router;
