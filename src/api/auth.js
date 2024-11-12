import instance from "./axios"

//GESTION USUARIO

const tiempoEspera = 10000;

export const registerRequest = user => instance.post(`/clientReg`, user)
export const loginRequest = user => instance.post(`/login`, user, {
    withCredentials: true
});

export const logoutRequest = () => instance.post('/logout')
export const obtenerRequest = () => {
    return instance.get('/obtener', {
        withCredentials: true,
        timeout: tiempoEspera
    })
};
export const verityTokenResquest = (token) => instance.get('/verify', {
    headers: {
        Authorization: `Bearer ${token}`
    }
});
export const actualizarUsuario = user => instance.patch(`/usuario/actualizar`, {
    data: user,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const eliminarUsuario = id => instance.delete('/usuario/del', {
    data: { data: { id } },
    headers: {
        'Content-Type': 'application/json',
    },
})


// GESTION PROVEEDOR

export const registrarProveedorRequest = user => instance.post(`/proveedor`, user);
export const extraerID = user => instance.post(`/proveedor/ex`, user);
export const eliminarProveedor = id => instance.delete(`/proveedor/delete`, {
    data: { data: { id } }, // Asegúrate de que el ID esté dentro del objeto 'data'
    headers: {
        'Content-Type': 'application/json',
    },
});

export const actualizarProveedores = user => instance.patch(`/proveedor/update`, {
    data: user,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const obtenerRequestProveedor = () => { return instance.get(`/proveedor`, { withCredentials: true }) };


//Gestion Empleado

export const registerEmpleado = user => instance.post(`/empleadoreg`, user)

//Gestion Categoria

export const insertarCategoriaPadre = user => instance.post(`/categoriaPadre`, {
    data: user,
    headers: {
        'Content-Type': 'application/json',
    }
})
export const insertarCategoriaHija = user => instance.post(`/categoriaHija`, {
    data: user,
    headers: {
        'Content-Type': 'application/json',
    }
})
export const actualizarCategoria = user => instance.patch('/catmodificar', user);
export const obtenerCategorias = () => { return instance.get(`/getCategoria`); };
export const eliminarCategorias = user => instance.delete(`/DeleteCategoria`, {
    data: user,
    headers: {
        'Content-Type': 'application/json',
    }
});


//GESTION PRODUCTO
export const insertarProducto = user => instance.post(`/productoReg`, {
    data: user,
    headers: {
        'Content-Type': 'application/json',
    },
});



export const obtenerProductos = () => { return instance.get(`/producto`) };

export const actualizarProducto = user => instance.patch(`/producto/actualizar`, {
    data: user,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const eliminarProducto = id => instance.delete('/producto/delete', {
    data: { data: { id } },
    headers: {
        'Content-Type': 'application/json',
    },
})


// BITACORA 

export const bitacoraa = () => { return instance.get(`/bitacora`) };


//PRIVILEGIOS O PERMISO

export const permisos = () => { return instance.get(`/permisos`) };

export const actualizarPermisos = (privilegios, rolSeleccionado) => instance.patch(`/updaPermisos2`, {
    data: {                    // Enviando ambos como un objeto dentro de "data"
        privilegios,           // Privilegios
        rol: rolSeleccionado   // Rol seleccionado (Admi, client, emplead)
    },
    headers: {
        'Content-Type': 'application/json',
    }
});



//COMBOS!!!!

export const insertarCombo = (data) => instance.post(`/combos`, {
    data,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const obtenerCombos = () => {return instance.get(`getcombos`)};
export const actualizarEstadoCombo = (data) => instance.patch(`/updateCombos`,{
    data,
    headers: {
        'Content-Type': 'application/json',
    }
})

// COMPRAS!!
export const insertaCompra = (data) => instance.post(`/compras`,{
    data,
    headers:{
        'Content-Type': 'application/json',
    }
})

//LOTES !!
export const insertarLotes = (data) => instance.post(`/lote`,{
    data,
    headers:{
        'Content-Type': 'application/json',
    }
})

export const obtenerLotes = () => {return instance.get(`/lote`)};

//OBTENCIOS DE LOS ROLES
export const obtenerRoles = () => {return  instance.get(`/obtRol`)};


//MARCAS 

export const insertarMarca = (data) => instance.post(`/createMarca`,{
    data,
    headers:{
        'Content-Type': 'application/json',
    }
}) 

export const obtenerMarca = () => {return instance.get(`/obtMarca`)};

//ESTANTE
export const insertarEstante = (data) => instance.post(`/crearEst`,{
    data,
    headers:{
        'Content-Type': 'application/json',
    }
}) 

export const obtenerEstante = () => {return instance.get(`/obtEst`)};


//Volumen
export const insertarVolumen = (data) => instance.post(`/regVolumen`,{
    data,
    headers:{
        'Content-Type': 'application/json',
    }
}) 

export const obtenerVolumen = () =>{return instance.get(`/getVolumen`)};


//PAGO ONLINE TARJETA

export const insertarPago = (id,amount) => instance.post(`/pagoTarget`,{
    id,
    amount,
    headers:{
        'Content-Type': 'application/json',
    }
})


//APERTURA

export const insertarNuevaApertura = (data) => instance.post(`/apertura`,{
    data,
    headers:{
        'Content-Type': 'application/json',
    }
});

export const obtenerApertura = () => {return instance.get(`/getapertura`)};

export const cerrarAperturaAbierta = (data) => instance.patch(`/cierre`,{
    data,
    headers:{
        'Content-Type': 'application/json',
    }
});


//VENTAS

export const insertarFactura = (data) => instance.post(`/Factura`,{
    data,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const obtenerTipoVenta = () => {return instance.get(`/getVentas`)}