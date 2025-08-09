import React, { useReducer } from "react";
import ArchivosContext from "./ArchivosContext";
import ArchivosReducer from "./ArchivosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_ARCHIVOS,
  ADD_ARCHIVOS,
  UPDATE_ARCHIVOS,
  DELETE_ARCHIVOS,
  SHOW_ERRORS_API,
} from "../../types";

const ArchivosState = ({ children }) => {
  const initialState = {
    archivos: [],
    archivo: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(ArchivosReducer, initialState);

  // Obtener todos los archivos
  const GetArchivos = () => {
    let url = "/archivos";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_ARCHIVOS,
          payload: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Agregar un archivo
  const AddArchivo = (data) => {
    let url = "/archivos";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: ADD_ARCHIVOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Agregado",
          text: "Archivo agregado correctamente",
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.response?.data?.message || "Ocurrió un error",
        });
      });
  };

  // Modificar un archivo
  const ChangeArchivo = (data) => {
    let url = `/archivos/${data.id}`;
    MethodPut(url, data)
      .then((res) => {
        dispatch({
          type: UPDATE_ARCHIVOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Archivo modificado",
          text: res.data.message,
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.response?.data?.message || "Ocurrió un error",
        });
      });
  };

  // Eliminar un archivo
  const DeleteArchivo = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El archivo seleccionado será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let url = `/archivos/${id}`;
        MethodDelete(url)
          .then((res) => {
            Swal.fire({
              title: "Eliminado",
              text: res.data.message,
              icon: "success",
            });
            dispatch({
              type: DELETE_ARCHIVOS,
              payload: id,
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error.response?.data?.message || "Ocurrió un error",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <ArchivosContext.Provider
      value={{
        archivos: state.archivos,
        archivo: state.archivo,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetArchivos,
        AddArchivo,
        ChangeArchivo,
        DeleteArchivo,
      }}
    >
      {children}
    </ArchivosContext.Provider>
  );
};

export default ArchivosState;
