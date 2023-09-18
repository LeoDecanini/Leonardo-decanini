const fs = require('fs');
const path = require('path');

const alumnosFilePath = path.join(__dirname, '..', 'data', 'alumnos.json');

exports.getAlumnos = (req, res) => {
    const alumnosData = JSON.parse(fs.readFileSync(alumnosFilePath, 'utf8'));
    let listaAlumnosHTML = '<h2>Lista de Alumnos</h2><ul>';
  
    alumnosData.forEach((alumno) => {
      const legajo = alumno.legajo;
      const nombreCompleto = `${alumno.nombre} ${alumno.apellido}`;
      listaAlumnosHTML += `<li><a href="/alumnos/${legajo}">${nombreCompleto}</a></li>`;
    });
  
    listaAlumnosHTML += '</ul>';
    res.send(listaAlumnosHTML);
  };

exports.getAlumnoPorLegajo = (req, res) => {
  const legajo = parseInt(req.params.legajo);
  const alumnosData = JSON.parse(fs.readFileSync(alumnosFilePath, 'utf8'));
  const alumno = alumnosData.find(a => a.legajo === legajo);

  if (alumno) {
    res.json(alumno);
  } else {
    res.status(404).json({ error: 'Alumno no encontrado' });
  }
};

exports.agregarAlumno = (req, res) => {
  const alumnosData = JSON.parse(fs.readFileSync(alumnosFilePath, 'utf8'));
  const nuevoAlumno = req.body;
  alumnosData.push(nuevoAlumno);

  fs.writeFileSync(alumnosFilePath, JSON.stringify(alumnosData, null, 2));

  res.json({ message: 'Alumno agregado correctamente' });
};

exports.actualizarAlumno = (req, res) => {
  const legajo = parseInt(req.params.legajo);
  const alumnosData = JSON.parse(fs.readFileSync(alumnosFilePath, 'utf8'));
  const index = alumnosData.findIndex(a => a.legajo === legajo);

  if (index !== -1) {
    const alumnoActualizado = req.body;
    alumnosData[index] = { ...alumnosData[index], ...alumnoActualizado };

    fs.writeFileSync(alumnosFilePath, JSON.stringify(alumnosData, null, 2));

    res.json({ message: 'Datos del alumno actualizados correctamente' });
  } else {
    res.status(404).json({ error: 'Alumno no encontrado' });
  }
};

exports.eliminarAlumno = (req, res) => {
  const legajo = parseInt(req.params.legajo);
  const alumnosData = JSON.parse(fs.readFileSync(alumnosFilePath, 'utf8'));
  const index = alumnosData.findIndex(a => a.legajo === legajo);

  if (index !== -1) {
    alumnosData.splice(index, 1);

    fs.writeFileSync(alumnosFilePath, JSON.stringify(alumnosData, null, 2));

    res.json({ message: 'Alumno eliminado correctamente' });
  } else {
    res.status(404).json({ error: 'Alumno no encontrado' });
  }
};
