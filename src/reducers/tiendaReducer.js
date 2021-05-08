const estadoInicial = {
      productos:[
            {id:1, nombre: "Producto 1"},
            {id:2, nombre: "Producto 2"},
            {id:3, nombre: "Producto 3"},
            {id:4, nombre: "Producto 4"}
      ],
    
      carrito: []

}

//Reducer es una funcion que se encarga de administrar el estado global de la app

const reducer = (estado = estadoInicial, accion) => {
      switch (accion.type){
            case 'AGREGAR_PRODUCTO_AL_CARRITO':
                  console.log(accion.nombre);
            return estado;
            default:
                  return estado;
      }


};
 
export default reducer;