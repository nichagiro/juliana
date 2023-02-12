import React from "react";
import { useNavigate } from "react-router-dom"

const Dashboard = (props) => { 
const navigate=useNavigate();

    function cerrarSesion() {
      navigate("/")  
   
    }

    function vistaUsuarios() {
      navigate("/usuarios")  
   
    }


    function vistaClientes() {
      navigate("/clientes")  
   
    }

    function vistaArticulos() {
      navigate("/articulos")  
   
    }
    function vistaCotizacion() {
      navigate("/cotizaciones")  
   
    }
  
    return (
      

      <div id="caja_menu" style={{ textAlign: "left" }}>

        <div claseName="titulo " style={{ color:"white", marginTop:80}}>

        <strong className="h3"  style={{ color:"white"}}>
           Bienvenido Administrador: {props.user.name} 
        </strong>

        </div>    

       


        <nav className="navbar navbar-expand-lg navbar-light " style={{ marginTop: 20 }}>
          <div className="container-fluid" >


            
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup"  >
              <div className="navbar-nav" >
                
                
                <a className="nav-link  h5  text-center" style={{ color: "white" }} href=" " onClick={vistaUsuarios} >Usuarios</a>
                <a className="nav-link  h5  text-center" style={{ color: "white" }} href=" " onClick={vistaClientes} >Clientes</a>
                <a className="nav-link  h5  text-center" style={{ color: "white" }} href=" " onClick={vistaArticulos} >Articulos</a>
                <a className="nav-link  h5  text-center" style={{ color: "white" }} href=" " onClick={vistaCotizacion} >Cotizaciones</a>
                <a className="nav-link  h5  text-center" style={{ color: "yellow" }} href=" " onClick={cerrarSesion} >Cerrar Sesión</a>
              </div>
            </div>
          </div>
        </nav>
        <div className="bg-light" style={{marginTop:20, padding:20}}>

          <h1>Grafico</h1>
        </div>
      </div>    
        
    )
}
export default Dashboard;