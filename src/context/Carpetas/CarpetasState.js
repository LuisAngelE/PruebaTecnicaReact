import React, { useReducer } from "react";
import CarpetasContext from "./CarpetasContext";
import CarpetasReducer from "./CarpetasReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_CARPETAS,
  ADD_CARPETAS,
  UPDATE_CARPETAS,
  DELETE_CARPETAS,
  SHOW_ERRORS_API,
} from "../../types";

const CarpetasState = ({ children }) => {
  const initialState = {
    carpetas: [],
    carpeta: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(CarpetasReducer, initialState);

  const GetCarpetas = () => {
    let url = "/carpetas";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_CARPETAS,
          payload: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddCarpeta = (data) => {
    let url = "/carpetas";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: ADD_CARPETAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Agregada",
          text: "Carpeta agregada correctamente",
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

  const ChangeCarpeta = (data) => {
    let url = `/carpetas/${data.id}`;
    MethodPut(url, data)
      .then((res) => {
        dispatch({
          type: UPDATE_CARPETAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Carpeta modificada",
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

  const DeleteCarpeta = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La carpeta seleccionada será eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let url = `/carpetas/${id}`;
        MethodDelete(url)
          .then((res) => {
            Swal.fire({
              title: "Eliminada",
              text: res.data.message,
              icon: "success",
            });
            dispatch({
              type: DELETE_CARPETAS,
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
    <CarpetasContext.Provider
      value={{
        carpetas: state.carpetas,
        carpeta: state.carpeta,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetCarpetas,
        AddCarpeta,
        ChangeCarpeta,
        DeleteCarpeta,
      }}
    >
      {children}
    </CarpetasContext.Provider>
  );
};

export default CarpetasState;
