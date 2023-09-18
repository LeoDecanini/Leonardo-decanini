const express = require('express');
const router = express.Router();
const alumnosController = require('../controllers/alumnosController');

router.get('/', (req, res) => {
  res.send('<h1>Bienvenido al Mini Sistema de Alumnos</h1><a href="/alumnos">Lista de Alumnos</a>');
});

router.get('/alumnos', alumnosController.getAlumnos);
router.get('/alumnos/:legajo', alumnosController.getAlumnoPorLegajo);
router.post('/alumnos', alumnosController.agregarAlumno);
router.put('/alumnos/:legajo', alumnosController.actualizarAlumno);
router.delete('/alumnos/:legajo', alumnosController.eliminarAlumno);

module.exports = router;
