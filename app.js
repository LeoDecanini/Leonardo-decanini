const express = require('express');
const app = express();
const port = 2023;

app.use(express.json());

const alumnosRoutes = require('./routes/alumnosRoutes');
app.use('/', alumnosRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
