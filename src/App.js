import React,{useState} from 'react';
import styled from 'styled-components';
import {NavLink, Switch, Route} from 'react-router-dom'
import Inicio from './components/Inicio';
import Blog from './components/Blog';
import Tienda from './components/Tienda';
import Error404 from './components/Error404'
import Carrito from "./components/Carrito";
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from './reducers/tiendaReducer';

const App = () => {
  const productos = [
    {id:1, nombre: "Producto 1"},
    {id:2, nombre: "Producto 2"},
    {id:3, nombre: "Producto 3"},
    {id:4, nombre: "Producto 4"}
  ];

  const [carrito, cambiarCarrito] = useState([]);

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
  
  const store= createStore(reducer); //reducer es una funcion encargada de editar el estado global
  console.log(store.getState())


  return ( 
    <Provider store= {store}>
      <Contenedor>
        <Menu>
          <NavLink to="/">Inicio</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/tienda">Tienda</NavLink>
        </Menu>
        <main>
          <Switch>
            <Route path="/" exact={true} component={Inicio} />
            <Route path="/blog" exact={true} component={Blog} />
            <Route path="/tienda"> 
              <Tienda 
                productos={productos} 
                agregarProductoAlCarrito= {agregarProductoAlCarrito}
              />
            </Route>
            <Route component={Error404} />
          </Switch>
        </main>
        <aside>
          <Carrito carrito= {carrito} />
        </aside>
    </Contenedor>
    </Provider>
   );
}
 
const Contenedor = styled.div`
    max-width: 1000px;
    padding: 40px;
    width: 90%;
    display: grid;
    gap: 20px;
    grid-template-columns: 2fr 1fr;
    background: #fff;
    margin: 40px 0;
    border-radius: 10px;
    box-shadow: 0px 0px 5px rgba(129, 129, 129, 0.1);
`;
 
const Menu = styled.nav`
    width: 100%;
    text-align: center;
    background: #092c4c;
    grid-column: span 2;
    border-radius: 3px;
 
    a {
        color: #fff;
        display: inline-block;
        padding: 15px 20px;
    }
 
    a:hover {
        background: #1d85e8;
        text-decoration: none;
    }
`;

export default App;
