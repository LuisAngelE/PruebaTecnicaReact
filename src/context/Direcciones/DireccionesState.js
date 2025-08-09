import React, { useReducer } from "react";
import DireccionesContext from "./DireccionesContext";
import DireccionesReducer from "./DireccionesReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_DIRECCIONES,
  ADD_DIRECCION,
  UPDATE_DIRECCION,
  DELETE_DIRECCION,
  SHOW_ERRORS_API,
} from "../../types";

const DireccionesState = ({ children }) => {
  const initialState = {
    direcciones: [],
    direccion: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(DireccionesReducer, initialState);

  const GetDirecciones = () => {
    MethodGet("/direcciones")
      .then((res) => {
        dispatch({
          type: GET_ALL_DIRECCIONES,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: SHOW_ERRORS_API,
          payload: error.response?.data || [],
        });
      });
  };

  const AddDireccion = (data) => {
    MethodPost("/direcciones", data)
      .then((res) => {
        dispatch({
          type: ADD_DIRECCION,
          payload: res.data,
        });
        Swal.fire({
          title: "Agregada",
          text: "Dirección agregada correctamente",
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

  const ChangeDireccion = (data) => {
    MethodPut(`/direcciones/${data.id}`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_DIRECCION,
          payload: res.data,
        });
        Swal.fire({
          title: "Modificada",
          text: "Dirección modificada correctamente",
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

  const DeleteDireccion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La dirección seleccionada será eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/direcciones/${id}`)
          .then((res) => {
            dispatch({
              type: DELETE_DIRECCION,
              payload: id,
            });
            Swal.fire({
              title: "Eliminada",
              text: res.data.message,
              icon: "success",
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
    <DireccionesContext.Provider
      value={{
        direcciones: state.direcciones,
        direccion: state.direccion,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetDirecciones,
        AddDireccion,
        ChangeDireccion,
        DeleteDireccion,
      }}
    >
      {children}
    </DireccionesContext.Provider>
  );
};

export default DireccionesState;
