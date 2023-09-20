const express = require('express');
const router = express.Router();
const connection = require('../db');

// Crear un nuevo tipo de documento
router.post('/', (req, res) => {
  const { tdoc, desc_tdoc } = req.body;

  if (!tdoc || !desc_tdoc) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  connection.query(
    'INSERT INTO tipo_documento (tdoc, desc_tdoc) VALUES (?, ?)',
    [tdoc, desc_tdoc],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el tipo de documento' });
        return;
      }
      res.status(201).json({ message: 'Tipo de documento creado con éxito' });
    }
  );
});

// Consultar un tipo de documento por su tdoc
router.get('/:tdoc', (req, res) => {
  const { tdoc } = req.params;

  connection.query(
    'SELECT * FROM tipo_documento WHERE tdoc = ?',
    [tdoc],
    (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al obtener el tipo de documento' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      res.json(results[0]);
    }
  );
});


// Consultar todos los tipos de documento
router.get('/', (req, res) => {
  connection.query('SELECT * FROM tipo_documento', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener los tipos de documento' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'No se encontraron tipos de documento' });
      return;
    }

    res.json(results);
  });
});

// Actualizar un tipo de documento por su tdoc
router.put('/:tdoc', (req, res) => {
  const { tdoc } = req.params;
  const { desc_tdoc } = req.body;

  if (!desc_tdoc) {
    return res.status(400).json({ error: 'La descripción del tipo de documento es obligatoria' });
  }

  connection.query(
    'UPDATE tipo_documento SET desc_tdoc = ? WHERE tdoc = ?',
    [desc_tdoc, tdoc],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el tipo de documento' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      res.json({ message: 'Tipo de documento actualizado con éxito' });
    }
  );
});

// Eliminar un tipo de documento por su tdoc
router.delete('/:tdoc', (req, res) => {
  const { tdoc } = req.params;

  connection.query(
    'DELETE FROM tipo_documento WHERE tdoc = ?',
    [tdoc],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el tipo de documento' });
        return;
      }

      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Tipo de documento no encontrado' });
        return;
      }

      res.json({ message: 'Tipo de documento eliminado con éxito' });
    }
  );
});

// Eliminar todos los tipos de documento
router.delete('/', (req, res) => {
  connection.query('DELETE FROM tipo_documento', (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar todos los tipos de documento' });
      return;
    }
    res.json({ message: 'Todos los tipos de documento han sido eliminados con éxito' });
  });
});


module.exports = router;
