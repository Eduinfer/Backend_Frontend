const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const tipoDocumentoRoutes = require('./routes/tipoDocumento');
app.use('/tipoDocumento', tipoDocumentoRoutes);

const rolesRoutes = require('./routes/roles');
app.use('/roles', rolesRoutes);

const tipoProductoRoutes = require('./routes/tipoProducto');
app.use('/tipoProducto', tipoProductoRoutes);

const productoRoutes = require('./routes/producto');
app.use('/producto', productoRoutes)

const facturaRouter = require('./routes/factura');
app.use('/factura', facturaRouter);

const facturaProductoRouter = require('./routes/facturaProducto');
app.use('/factura-producto', facturaProductoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
