import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete , AiOutlineUserAdd} from "react-icons/ai";

import notify from "../utils/notify";

import { useNavigate } from "react-router-dom"



const USER = {
 
  nombre: "",
  precio_venta: "",
  estado: "",
 };


const Articulo = () => { 
  const url = "http://localhost:3001/articulo";


  const [articulo, setArticulo] = useState([]);//generar la lista articulos
  const [selected, setSelected] = useState(USER);//editar articulos
  const [artifil, setArtifil]=useState([]);// filtra articulo


  //funcion para ver la lista de articulos
  const listarArticulo = async () => {
    const res = await axios.get(url);
    if (res) {
      setArticulo(res.data || []);
      
    }
  };


  
 //crear articulo y editar
  //capturo los datos del formulario y los guardo
  const handleInputChange = ({target}) => {    
    setSelected({
      ...selected,   
    [target.name] : target.value
    })
  };

  //verifico que los campos del formulario esten todos llenos
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("no enviar");
    } else {
      let res = await axios.post(url,selected);
      console.log(res);
      setModal(!modal)
      listarArticulo();
    }
  };

  

//ACTUALIZAR ARTICULO

const actualizarArticulo = async () => {
  const res = await axios.put(url,selected);
  console.log(res)
  if(res){
    notify();
    setSelected({});
    setModaledit(!modaledit);
    listarArticulo();
  

  }
}
 
//ELIMINARR ARTICULO
  const eliminarArticulo = async (id) => {
  const res = await axios.delete (`${url}/${id}`) ;
  if (res) {  
    notify(); 
    listarArticulo();

    
  }
};
 
//Buscar Articulo
const searchUser=({target})=>{
  
  const resultSearch= articulo.filter(
    articulo => articulo.nombre.toLowerCase().includes(target.value.toLowerCase())
  )
    //Si en la input de buscar no hay datos, cargo la tabla de usuario
  setArtifil(target.value ? resultSearch : articulo)


  
  }
 

  useEffect(() => {
    listarArticulo();
   
  }, []);



  useEffect(() => {
    setArtifil(articulo);
    //eliminar el input de de search
    /* document.getElementById (search)=none */
   
  }, [articulo]);

  //ventana modal

  const [modal, setModal] = useState(false);//crear usuario
  const [modaledit, setModaledit] = useState(false);//editar usuario

  const toggle = () => setModal(!modal);
  
  const toggleedit = user => {
    setSelected(user);
    setModaledit(!modaledit);
  }

  const navigate=useNavigate();

  function atras() {
    navigate("/homea")  
 
  }
  return (
    <div className="container-sm">
      <header style={{ color: "white", marginTop: 40, marginBottom:40}}>
        <h3>
          <strong>Articulos</strong>{" "}
        </h3>
        <a className="nav-link  h5  text-center" style={{ color: "white" }} href=" " onClick={atras} >Atras</a>
      </header>
      

      <div id="agregU">
      
        <input type="search" id="search" onChange={searchUser} placeholder="Buscar Articulo" />

        <Button id="btn_agregar" className="btn btn-light"  onClick={() => toggle()}>< AiOutlineUserAdd/>  Agregar articulo</Button>
      
       </div>

      <table
        className="table" id="table"
        style={{ marginTop: 60, background: "white"}}
      >
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Precio de venta</th>
            <th className="text-center">Descripción</th>
            <th className="text-center"></th>
            <th className="text-center"></th>
          </tr>
        </thead>

        <tbody>
          {artifil.map((item, key) => (
            <tr key={key}>
              <th key={key} className="text-center">{key+1} </th>
              <th className="text-center">{item.nombre}</th>
              <th className="text-center">{item.precio_venta}</th>
              <th className="text-center">{item.descripcion}</th>
              <th>
                <Button className="editar" id="editar" onClick={() => toggleedit(item)}>
                  <FaEdit />
                </Button>
              </th>
              <th>
              <Button className="eLiminar" id="eliminar" onClick={() => eliminarArticulo(item.idarticulo)}>
              <AiFillDelete />
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Agregar Nuevo Articulo</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <Form
                onSubmit={handleSubmit}
                className="needs-validation"
                noValidate={true}
                autoComplete="off"
              >
               <br />
                <label htmlFor="nombre">
                  <strong>Nombre</strong>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  id="nombre"                  
                  onChange={handleInputChange}
                />
                <br />
                 <div className="col-md-12">
                  <label htmlFor="numero_documento">
                    <strong>Precio de venta</strong>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="precio_venta"
                    id="precio_venta"
                    onChange={handleInputChange}
                  />
                </div>
                <label htmlFor="direccion">
                  <strong>Descripción</strong>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  onChange={handleInputChange}
                />
                <br/>
                <div className="col-md-12">
                  <label htmlFor="estado">
                    <strong> Estado</strong>
                  </label>
                  <select
                    className="form-control"
                    name="estado"
                    id="estado"
                    onChange={handleInputChange}
                  >
                    <option selected disabled value="">
                      -- Seleccione --
                    </option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={handleSubmit}>
              Crear
            </Button>

            <Button color="secondary" onClick={toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
{/* Modal editar */}
     
        <Modal isOpen={modaledit} id="editar" toggle={toggleedit}>
          <ModalHeader toggle={toggleedit}>Editar Articulo</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <Form
                onSubmit
                className="needs-validation"
                noValidate={true}
                autoComplete="off"
              >
                <br />
                <label htmlFor="nombre">
                  <strong>Nombre</strong>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={selected.nombre}
                  id="nombre"
                  onChange={handleInputChange}
                />
                <br />            
                <label htmlFor="precio_venta">
                  <strong>Precio de venta</strong>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="precio_venta"
                  id="precio_venta"
                  onChange={handleInputChange}
                  value={selected.precio_venta}
                />
                 <label htmlFor="descripcion">
                  <strong>Descripción</strong>
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  onChange={handleInputChange}
                />

                 <br />
                <div className="col-md-12">
                  <label htmlFor="">
                    <strong> Estado</strong>
                  </label>
                  <select
                    className="form-control"
                    name="estado"
                    id="estado"
                    onChange={handleInputChange}
                    value={selected.estado}
                  >
                    <option selected disabled value="">
                      -- Seleccione --
                    </option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                  </select>
                </div>
              </Form>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit" onClick={()=>actualizarArticulo()}>
              Guardar
            </Button>

            <Button color="secondary" onClick={() => toggleedit(!modaledit)}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div> 
    );
};

export default Articulo;
