const express = require('express');
const router = express.Router();
const connection = require('../db');

// Consultar un registro de factura_producto por su n_factura y su id_prod
router.get('/:n_factura/:id_prod', (req, res) => {
  const { n_factura, id_prod } = req.params;

  connection.query(
    'SELECT * FROM factura_producto WHERE n_factura = ? AND id_prod = ?',
    [n_factura, id_prod],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el registro de factura_producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Registro de factura_producto no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});


// Consultar todos los registros de factura_producto
router.get('/', (req, res) => {
  connection.query('SELECT * FROM factura_producto', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los registros de factura_producto' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron registros de factura_producto' });
      return;
    }

    res.json(results);
  });
});

// Crear un nuevo registro de factura_producto
router.post('/', (req, res) => {
  const { n_factura, id_prod, cant_prod, valor_prod_cant } = req.body;
  connection.query(
    'INSERT INTO factura_producto (n_factura, id_prod, cant_prod, valor_prod_cant) VALUES (?, ?, ?, ?)',
    [n_factura, id_prod, cant_prod, valor_prod_cant],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ error: 'El registro ya existe' });
        } else {
          console.error(err);
          res.status(500).json({ error: 'Error al crear el registro de factura_producto' });
        }
        return;
      }
      res.status(201).json({ message: 'Registro de factura_producto creado con éxito' });
    }
  );
});


// Actualizar un registro de factura_producto por n_factura e id_prod
router.put('/:n_factura/:id_prod', (req, res) => {
  const { n_factura, id_prod } = req.params;
  const { cant_prod, valor_prod_cant } = req.body;

  // Primero, verifica si el registro de factura_producto existe
  connection.query(
    'SELECT * FROM factura_producto WHERE n_factura = ? AND id_prod = ?',
    [n_factura, id_prod],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el registro de factura_producto' });
        return;
      }

      // Comprueba si se encontraron resultados (si el registro de factura_producto existe)
      if (results.length === 0) {
        res.status(404).json({ error: 'Registro de factura_producto no encontrado' });
        return;
      }

      // Si el registro de factura_producto existe, procede a actualizarlo
      connection.query(
        'UPDATE factura_producto SET cant_prod = ?, valor_prod_cant = ? WHERE n_factura = ? AND id_prod = ?',
        [cant_prod, valor_prod_cant, n_factura, id_prod],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar el registro de factura_producto' });
            return;
          }
          res.json({ message: 'Registro de factura_producto actualizado con éxito' });
        }
      );
    }
  );
});

// Eliminar un registro de factura_producto por n_factura e id_prod
router.delete('/:n_factura/:id_prod', (req, res) => {
  const { n_factura, id_prod } = req.params;

  // Primero, verifica si el registro de factura_producto existe
  connection.query(
    'SELECT * FROM factura_producto WHERE n_factura = ? AND id_prod = ?',
    [n_factura, id_prod],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el registro de factura_producto' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Registro de factura_producto no encontrado' });
        return;
      }

      // Si el registro de factura_producto existe, procede a eliminarlo
      connection.query(
        'DELETE FROM factura_producto WHERE n_factura = ? AND id_prod = ?',
        [n_factura, id_prod],
        (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el registro de factura_producto' });
            return;
          }
          res.json({ message: 'Registro de factura_producto eliminado con éxito' });
        }
      );
    }
  );
});

module.exports = router;
