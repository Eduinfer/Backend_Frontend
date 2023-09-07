const express = require('express');
const controlador = express.Router();

// Listar administradores
controlador.get('/administradores', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('SELECT * FROM administrador', (err, administradores) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al obtener la lista de administradores' });
                return;
            }
            res.status(200).json(administradores);
        });
    });
});

// Listar empleados
controlador.get('/empleados', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('SELECT * FROM empleado', (err, empleados) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al obtener la lista de empleados' });
                return;
            }
            res.status(200).json(empleados);
        });
    });
});

// Crear administrador (para administradores)
controlador.post('/administradores', (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('INSERT INTO administrador (tipo_documento_id, numero_documento, nombre1, nombre2, apellido1, apellido2, telefono, direccion, contrasena) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.tipo_documento_id, data.numero_documento, data.nombre1, data.nombre2, data.apellido1, data.apellido2, data.telefono, data.direccion, data.contrasena], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear el administrador' });
                return;
            }
            res.status(201).json({ message: 'Administrador creado correctamente' });
        });
    });
});

// Crear empleado (para administradores)
controlador.post('/empleados', (req, res) => {
    const data = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('INSERT INTO empleado SET ?', [data], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al crear el empleado' });
                return;
            }
            res.status(201).json({ message: 'Empleado creado correctamente' });
        });
    });
});

// Editar administrador (para administradores)
controlador.get('/administradores/:id/editar', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('SELECT * FROM administrador WHERE id_admin = ?', [id], (err, administrador) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al obtener el administrador' });
                return;
            }
            if (administrador.length === 0) {
                res.status(404).json({ error: 'Administrador no encontrado' });
                return;
            }
            res.status(200).json(administrador[0]);
        });
    });
});

// Editar empleado (para administradores)
controlador.get('/empleados/:id/editar', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('SELECT * FROM empleado WHERE id_empleado = ?', [id], (err, empleado) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al obtener el empleado' });
                return;
            }
            if (empleado.length === 0) {
                res.status(404).json({ error: 'Empleado no encontrado' });
                return;
            }
            res.status(200).json(empleado[0]);
        });
    });
});

// Actualizar administrador (para administradores)
controlador.put('/administradores/:id', (req, res) => {
    const { id } = req.params;
    const nuevoAdministrador = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('UPDATE administrador SET ? WHERE id_admin = ?', [nuevoAdministrador, id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar el administrador' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Administrador no encontrado' });
                return;
            }
            res.status(200).json({ message: 'Administrador actualizado correctamente' });
        });
    });
});

// Actualizar empleado (para administradores)
controlador.put('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const nuevoEmpleado = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('UPDATE empleado SET ? WHERE id_empleado = ?', [nuevoEmpleado, id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al actualizar el empleado' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Empleado no encontrado' });
                return;
            }
            res.status(200).json({ message: 'Empleado actualizado correctamente' });
        });
    });
});

// Eliminar administrador (para administradores)
controlador.delete('/administradores/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('DELETE FROM administrador WHERE id_admin = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al eliminar el administrador' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Administrador no encontrado' });
                return;
            }
            res.status(200).json({ message: 'Administrador eliminado correctamente' });
        });
    });
});

// Eliminar empleado (para administradores)
controlador.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error en la conexión a la base de datos' });
            return;
        }

        conn.query('DELETE FROM empleado WHERE id_empleado = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Error al eliminar el empleado' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).json({ error: 'Empleado no encontrado' });
                return;
            }
            res.status(200).json({ message: 'Empleado eliminado correctamente' });
        });
    });
});

module.exports = controlador;
