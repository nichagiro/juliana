import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Input
} from "reactstrap";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete, AiOutlineUserAdd } from "react-icons/ai";

import notify from "../utils/notify";

import { useNavigate } from "react-router-dom"



const USER = {
  iddetalle: "",
  id_cotizacion: "",
  idarticulo: "",
  cantidad: "",
  subtotal: "",
  descuento: "",
  costo_envio: "",
  total: "",
  nombre_articulo: "",
  fecha_cotizacion: "",
  usuario_cotizacio: "",
  cliente_cotizaciones: "",
  cliente_nombre: "",
  usuario_nombre: "",
};


const Cotizacion = () => {
  const url = "http://localhost:3001/cotizacion";
  const [detalles_cotizacion, setdetalles_cotizacion] = useState([]);//generar la lista ventas
  const [selected, setSelected] = useState(USER);//editar cotizaciones
  const [detalles_cotizacionfil, setdetalles_cotizacionfil] = useState([]);// filtra cotizacion
  const [articulo, setArticulo] = useState([]);//generar la lista articulos 
  const [cliente, setCliente] = useState([]);//generar la lista usuarios
  const [listAr, setListar] = useState([]);

  //
  const agreArt = () => {
    setListar([
      ...listAr,
      { id: listAr.length + 1 }
    ])
  };

  //funcion para ver la lista de cotizaciones
  const listarCotizaciones = async () => {
    const res = await axios.get(url);
    console.log(res)
    if (res) {
      setdetalles_cotizacion(res.data || []);

    }
  };

  //funcion para listar los clientes en la modal
  const listarCliente = async () => {
    const res = await axios.get("http://localhost:3001/cliente");
    if (res) {
      setCliente(res.data || []);

    }
  };

  useEffect(() => {
    listarCotizaciones();
    listarCliente();

  }, []);


  useEffect(() => {
    if (detalles_cotizacionfil) {
      setdetalles_cotizacionfil(detalles_cotizacion)

    }
  }, [detalles_cotizacion]);



  //crear articulo y editar
  //capturo los datos del formulario y los guardo
  const handleInputChange = ({ target }) => {
    setSelected({
      ...selected,
      [target.name]: target.value
    })
  };

  //verifico que los campos del formulario esten todos llenos
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      console.log("no enviar");
    } else {
      let res = await axios.post(url, selected);
      console.log(res);
      setModal(!modal)
        ;
    }
  };

  //ACTUALIZAR cOTIZACION

  const actualizarVentas = async () => {
    const res = await axios.put(url, selected);
    console.log(res)
    if (res) {
      notify();
      setSelected({});
      setModaledit(!modaledit);
      listarCotizaciones();


    }
  }

  //Buscar Cotizacion
  const searchUser = ({ target }) => {

    const resultSearch = detalles_cotizacion.filter(
      detalles_cotizacion => detalles_cotizacion.cliente_nombre.toLowerCase().includes(target.value.toLowerCase())
    )
    //Si en la input de buscar no hay datos, cargo la tabla de usuario
    setdetalles_cotizacionfil(target.value ? resultSearch : detalles_cotizacion)

  }


  //ventana modal

  const [modal, setModal] = useState(false);//crear usuario
  const [modaledit, setModaledit] = useState(false);//editar usuario

  const toggle = () => {
    setModal(!modal);
    listarArticulo()

  }

  //funcion para ver la lista de articulos de la tabla modal
  const listarArticulo = async () => {
    const res = await axios.get("http://localhost:3001/articulo");
    if (res) {
      setArticulo([{}, ...res.data] || []);

    }
  };
  useEffect(() => {
    listarArticulo();

  }, []);

  //ELIMINAR FILAS DE LA TABL AGREGAR ARTICULOS
  const eliminarLisArt = (id) => {
    setListar(listAr.filter(item => item.id !== id))
  }

  const toggleedit = user => {
    setSelected(user);
    setModaledit(!modaledit);
  }

  const navigate = useNavigate();

  function atras() {
    navigate("/homea")

  }

  const changeArt = (e, id) => {
    const idArticulo = e.target.value;
    let lista = []
    if(idArticulo){
      const product = articulo.find(art => art.idarticulo == idArticulo)
      lista = listAr.map(
        item => item.id === id
          ? ({ ...item, precioU: Number(product.precio_venta) })
          : item
      )
    } else {
      lista = listAr.map(
        item => item.id === id
          ? ({ ...item, precioU:'' , precioT:''})
          : item
      )
    }
    setListar(lista)
  }

  const changeCant = (e, id) => {
    const cant = e.target.value;
    const lista = listAr.map(
      item => item.id === id
        ? ({ ...item, precioT: Number(cant) * item.precioU })
        : item
    )
    setListar(lista)
  }


  return (
    <div className="container-sm">
      <header style={{ color: "white", marginTop: 40, marginBottom: 40 }}>
        <h3>
          <strong>Cotización</strong>{" "}
        </h3>
        <a className="nav-link  h5  text-center" style={{ color: "white" }} href=" " onClick={atras} >Atras</a>
      </header>


      <div id="agregU">

        <input type="search" id="search" onChange={searchUser} placeholder="Buscar Cotizacion" />

        <Button id="btn_agregar-co" className="btn btn-light" onClick={() => toggle()}>< AiOutlineUserAdd />  Agregar Cotización</Button>

      </div>




      <table
        className="table" id="table"
        style={{ marginTop: 60, background: "white" }}
      >
        <thead>
          <tr>
            <th className="text-center">#</th>
            <th className="text-center" >Nombre cliente</th>
            <th className="text-center">Nombre usuario</th>
            <th className="text-center">Fecha</th>
            <th className="text-center">Valor</th>
            <th className="text-center"></th>
            <th className="text-center"></th>
          </tr>
        </thead>

        <tbody>
          {detalles_cotizacionfil.map((item, key) => (
            <tr key={key}>
              <th key={key} className="text-center">{key + 1} </th>
              <th className="text-center">{item.cliente_nombre}</th>
              <th className="text-center">{item.usuario_nombre}</th>
              <th className="text-center">{item.fecha_cotizacion}</th>
              <th>
                <Button className="editar" id="editar" onClick={() => toggleedit(item)}>
                  <FaEdit />
                </Button>
              </th>
              <th>
                <Button className="eLiminar" id="eliminar" >
                  <AiFillDelete />
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>Crear Cotizacion</ModalHeader>

          <div className="btn-agregar">
            <Input type="select" name="select" id="search">

              {cliente.map(item => (
                <option key={item.idcliente} value={item.idcliente}>{item.nombre}</option>
              ))}
            </Input>


            <label className="agregA">Agregar Articulo</label>
            <Button className="agregarbtn" onClick={() => agreArt()}>+</Button>
          </div>
          <ModalBody>
            <div className="form-group">


              <Form>
                <table
                  className="table" id="table"
                  style={{ marginTop: 60, background: "white" }}
                >
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center"> Articulo</th>
                      <th className="text-center">Cantidad</th>
                      <th className="text-center">Precio Unitario</th>
                      <th className="text-center">Precio Total</th>
                    </tr>
                  </thead>

                  <tbody>
                    {listAr.map((item) => (
                      <tr key={"factura_".concat(item.id)} id={"factura_".concat(item.id)}>
                        <th className="text-center">{item.id}</th>
                        <th>
                          <Input type="select" name="select" id="exampleSelect" onChange={(e) => changeArt(e, item.id)}>
                            {articulo.map(item => (
                              <option key={item.idarticulo} value={item.idarticulo}>{item.nombre}</option>
                            ))}
                          </Input>
                        </th>
                        <th> <Input type="number" name="cantidad" id="cantidad" onChange={(e) => changeCant(e, item.id)} /></th>
                        <th> {item.precioU} </th>
                        <th className="text-center">{item.precioT} </th>
                        <th>
                          <Button className="eLiminar" id="eliminar" onClick={() => eliminarLisArt(item.id)}>
                            <AiFillDelete />
                          </Button>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
          <Button color="primary" type="submit" onClick={() => actualizarVentas()}>
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

export default Cotizacion;
