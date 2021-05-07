const estadoInicial = {
      productos:[
            {id:1, nombre: "Producto A"},
            {id:2, nombre: "Producto B"},
            {id:3, nombre: "Producto C"},
            {id:4, nombre: "Producto D"}
      ],
    
      carrito: [1,2,3]

}



const reducer = (estado=estadoInicial, accion) => {
      return estado;


};
 
export default reducer;