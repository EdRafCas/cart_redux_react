const agregarProductoAlCarrito = (idProductoAAgregar, nombre) => {
      //If the shopping cart is empty, add  element.
      if(carrito.length === 0){
        cambiarCarrito([{id:idProductoAAgregar, nombre: nombre, cantidad: 1}]);
      } else  {
        //if there is something on the cart, you have to check that the thing you are adding is different from the one in the cart
        //if there is something on the cart, and is the same that you are adding you have to update his value
        //if the product is new, then add it
  
        //To edit the cart you first have to clone it, you made the changes in this clone, and when is finished, you push it back, replacing the old cart
        const nuevoCarrito =[...carrito];
  
        //first check if the cart already contains the id of the product you are adding
       const yaEstaenCarrito = nuevoCarrito.filter((productoDeCarrito)=>{
          return productoDeCarrito.id === idProductoAAgregar
        }).length > 0;
  
        //if the product is already in the cart, then update it
        if(yaEstaenCarrito){
          //to update, you first have to search which position that product is taking, to search you use map
          nuevoCarrito.forEach((productoDeCarrito, index)=>{
            if(productoDeCarrito.id=== idProductoAAgregar){
                const cantidad = nuevoCarrito[index].cantidad
                nuevoCarrito[index] ={
                id:idProductoAAgregar,
                nombre: nombre, 
                cantidad: cantidad +1
                }
              }
          });
        //in the case that the product is not in the cart you have to add a new one witha value of "1"  
        } else {
          nuevoCarrito.push(
            {
              id:idProductoAAgregar,
              nombre:nombre,
               cantidad:1
            }
          );
        }
  
        //At last, we update the cart for the new cart "nuevoCarrito" using the state "cambiarCarrito"
        cambiarCarrito(nuevoCarrito);
      }
    }