import { useAuth } from '../../context/AuthContext';
import '../../css/AdmiUsuarioCss/UsuarioPage.css';
import { useState, useEffect } from 'react';
import { actualizarUsuario, eliminarUsuario } from '../../api/auth';
import jsPDF from 'jspdf'; // Importa jsPDF
import 'jspdf-autotable'; // Importa la funcionalidad para tablas

function UsuarioPages() {
  const { tableUser, user, roles } = useAuth();

  const [datos, setDatos] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState('');
  const nuevosRoles = roles;
  console.log("desde usu",roles);
  conconsle.log(nuevosRoles);
  const [filtroInicial, setFiltroInicial] = useState('');
  const [filtroRol, setFiltroRol] = useState('');
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarActualizar, setMostrarActualizar] = useState(false);
  const [formActualizar, setFormActualizar] = useState({
    id: '',
    usuario: '',
    correo: '',
    telefono: '',
    genero: '',
    fechaNacimiento: '',
    rol: '',
    salario: '',
    horarioInicio: '',
    horarioFin: ''
  });

  // Cargar datos al inicio
  useEffect(() => {
    setDatos(tableUser);
  }, [tableUser]);

  // Filtrar los datos en tiempo real
  const datosFiltrados = datos.filter((dato) => {
    const nombreMatch = dato.usuario.toLowerCase().includes(filtroNombre.toLowerCase());
    const inicialMatch = filtroInicial ? dato.usuario.charAt(0).toLowerCase() === filtroInicial.toLowerCase() : true;
    const rolMatch = filtroRol ? dato.rol.toLowerCase() === filtroRol.toLowerCase() : true;
    return nombreMatch && inicialMatch && rolMatch;
  });

  const eliminarDato = (id) => {
    setUsuarioSeleccionado(id);
    setMostrarEliminar(true); // Mostrar la ventana modal de confirmación
  };

  const confirmarEliminar = async () => {
    try {
      await eliminarUsuario(usuarioSeleccionado);
      setDatos(datos.filter(dato => dato.id !== usuarioSeleccionado));
      setMostrarEliminar(false); // Ocultar la ventana modal después de eliminar
    } catch (error) {
      console.log(error);
    }
  };

  const actualizarDato = (id) => {
    const usuario = datos.find(dato => dato.id === id);
    setFormActualizar(usuario);
    setMostrarActualizar(true); // Mostrar la ventana modal de actualización
  };

  const manejarCambio = (e) => {
    setFormActualizar({
      ...formActualizar,
      [e.target.name]: e.target.value
    });
  };

  const confirmarActualizar = async () => {
    try {
      await actualizarUsuario(formActualizar);
      setDatos(datos.map(dato => (dato.id === formActualizar.id ? formActualizar : dato)));
      setMostrarActualizar(false); // Ocultar la ventana modal después de actualizar
    } catch (error) {
      console.log(error);
    }
  };

  // Función para generar el PDF
  const generarReportePDF = () => {
    const doc = new jsPDF();

    // Añadir un título al PDF
    doc.text('Reporte de Usuarios', 14, 20);

    // Convertir los datos de la tabla en un formato que jsPDF pueda interpretar
    const columnas = ['Documento', 'Usuario', 'Correo', 'Teléfono', 'Género', 'Rol'];
    const filas = datosFiltrados.map((dato) => [
      dato.id,
      dato.usuario,
      dato.correo,
      dato.telefono,
      dato.genero,
      dato.rol
    ]);

    // Generar la tabla con los datos
    doc.autoTable({
      head: [columnas],
      body: filas,
      startY: 30
    });

    // Descargar el PDF con el nombre reporte_usuarios.pdf
    doc.save('reporte_usuarios.pdf');
  };

  return (
    <div className="containerUsuario">
      <div className='ventanaUser'>
        <h1 id='title'>Usuarios</h1>
        <div className="inputUser-group">
          <input
            placeholder='Nombre'
            className="inputUser-box"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}  // Filtrar por nombre en tiempo real
          />
        </div>
        <div className="inputUser-group">
          <select
            className="inputUser-box"
            value={filtroInicial}
            onChange={(e) => setFiltroInicial(e.target.value)}  // Filtrar por inicial
          >
            <option value="">Listar por Iniciales</option>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letra => (
              <option key={letra} value={letra}>{letra}</option>
            ))}
          </select>
          <select
            className="inputUser-box"
            value={filtroRol}
            onChange={(e) => setFiltroRol(e.target.value)}  // Filtrar por rol
          >
            <option value="">Listar por Rol</option>
            {nuevosRoles.map((rol, index) => (
              <option key={index} value={rol.RolID}>{rol.Nombre}</option>
            ))}
          </select>
          <button className="btn" onClick={() => setFiltroNombre('')}>Listar Todos</button>
        </div>
        <div className='listaUsuarios'>
          <table className="table">
            <thead>
              <tr>
                <th className='table-item'>Documento</th>
                <th className='table-item'>Usuario</th>
                <th className='table-item'>Correo</th>
                <th className='table-item'>Teléfono</th>
                <th className='table-item'>Género</th>
                <th className='table-item'>Rol</th>
                <th className='table-item'>Actividad</th>
              </tr>
            </thead>
            <tbody>
              {datosFiltrados.map((dato) => (
                <tr key={dato.id} id='table-user'>
                  <td className='table-item2'>{dato.id}</td>
                  <td className='table-item2'>{dato.usuario}</td>
                  <td className='table-item2'>{dato.correo}</td>
                  <td className='table-item2'>{dato.telefono}</td>
                  <td className='table-item2'>{dato.genero}</td>
                  <td className='table-item2'>{dato.rol}</td>
                  <td className='table-item2' id='option'>

                    {
                      user?.user.permisos.some(
                        (permiso) => permiso.Descripcion === "poder eliminar usuarios") &&
                      (<button className="buttonOpcion" onClick={() => eliminarDato(dato.id)}>Eliminar</button>)
                    }
                    {
                      user?.user.permisos.some(
                        (permiso) => permiso.Descripcion === "poder actualizar usuarios") &&
                      <button className="buttonOpcion" onClick={() => actualizarDato(dato.id)}>Actualizar</button>
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botón para generar el PDF */}
        <button className="btn" onClick={generarReportePDF}>Generar Reporte en PDF</button>

      </div>

      {/* Modal para Confirmar Eliminación */}
      {mostrarEliminar && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro que quieres eliminar este usuario?</h3>
            <button className="btn" onClick={confirmarEliminar}>Sí, eliminar</button>
            <button className="btn" onClick={() => setMostrarEliminar(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal para Actualizar Usuario */}
      {mostrarActualizar && (
        <div className="modal">
          <div className="modal-content">
            <h3>Actualizar Usuario</h3>
            <label htmlFor="usuario">Nombre</label>
            <input
              name="usuario"
              value={formActualizar.usuario}
              onChange={manejarCambio}
              placeholder="Usuario"
            />
            <label htmlFor="correo">Correo</label>
            <input
              name="correo"
              value={formActualizar.correo}
              onChange={manejarCambio}
              placeholder="Correo"
            />
            <label htmlFor="telefono">Teléfono</label>
            <input
              name="telefono"
              value={formActualizar.telefono}
              onChange={manejarCambio}
              placeholder="Teléfono"
            />
            <label htmlFor="fechaNacimiento">Fecha Nacimiento</label>
            <input
              type='date'
              name="fechaNacimiento"
              value={formActualizar.fechaNacimiento}
              onChange={manejarCambio}
            />
            <select name="genero" value={formActualizar.genero} onChange={manejarCambio}>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
            <select name="rol" value={formActualizar.rol} onChange={manejarCambio}>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
              <option value="Cliente">Cliente</option>
            </select>
            <button className="btn" onClick={confirmarActualizar}>Aceptar</button>
            <button className="btn" onClick={() => setMostrarActualizar(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsuarioPages;
