import instance from "./axios"

//GESTION USUARIO

const tiempoEspera = 10000;

export const registerRequest = user => instance.post(`/clientReg`,user) 
export const loginRequest = user => instance.post(`/login`,user ,{
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
});

export const logoutRequest= ()=>instance.post('/logout')
export const obtenerRequest = () => { return instance.get('/obtener',{
    withCredentials: true,
    timeout: tiempoEspera 
})};
export const verityTokenResquest = () => instance.get('/verify')
export const actualizarUsuario = user => instance.patch(`/usuario/actualizar`,{data :user ,
    headers: {
        'Content-Type': 'application/json', 
    },
});
export const eliminarUsuario = user => instance.delete('/usuario/del',{ data : user,
    headers: {
        'Content-Type': 'application/json', 
    },
})


// GESTION PROVEEDOR

export const registrarProveedorRequest = user => instance.post(`/proveedor`,user);
export const extraerID = user => instance.post(`/proveedor/ex`,user);
export const eliminarProveedor = user => instance.delete(`/proveedor/delete`,{ data : user, 
    headers: {
        'Content-Type': 'application/json', 
    },
});
export const actualizarProveedores = user => instance.patch(`/proveedor/update`,{data :user ,
    headers: {
        'Content-Type': 'application/json', 
    },
});
export const obtenerRequestProveedor = () => {return instance.get(`/proveedor`,{withCredentials: true})};


//Gestion Empleado

export const registerEmpleado = user => instance.post(`/empleadoreg`,user)

//Gestion Categoria

export const insertarCategoriaPadre = user => instance.post(`/categoriaPadre`,{ data: user,
    headers:{
        'Content-Type': 'application/json', 
    }
})
export const insertarCategoriaHija = user => instance.post(`/categoriaHija`,{ data: user,
    headers:{
        'Content-Type': 'application/json', 
    }
})
export const actualizarCategoria = user => instance.patch('/catmodificar',user);
export const obtenerCategorias = () => {return instance.get(`/getCategoria`);};
export const eliminarCategorias = user => instance.delete(`/DeleteCategoria`,{data : user,
    headers :{
        'Content-Type': 'application/json', 
    }
});


//GESTION PRODUCTO
export const insertarProducto = user => instance.post(`/productoReg`, { data: user ,
    headers:{
        'Content-Type': 'application/json', 
    },
});



export const obtenerProductos = () => {return instance.get(`/producto`)};

export const actualizarProducto = user => instance.patch(`/producto/actualizar`,{data :user ,
    headers:{
        'Content-Type': 'application/json', 
    },
});


// BITACORA 
/* export const bitacoraa = user => axios.post(`/crearbitacora`, { data: user ,
    headers:{
        'Content-Type': 'application/json', 
    },
}) */;

export const bitacoraa = () => {return instance.get(`/bitacora`)}; 