import React, { useReducer } from "react";
import EmpresasContext from "./EmpresasContext";
import EmpresasReducer from "./EmpresasReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_EMPRESAS,
  ADD_EMPRESAS,
  UPDATE_EMPRESAS,
  DELETE_EMPRESAS,
  SHOW_ERRORS_API,
} from "../../types";

const EmpresasState = ({ children }) => {
  const initialState = {
    empresas: [],
    empresa: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(EmpresasReducer, initialState);

  const GetEmpresas = () => {
    let url = "/empresas";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_EMPRESAS,
          payload: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const AddEmpresa = (data) => {
    let url = "/empresas";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: ADD_EMPRESAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Agregada",
          text: "Empresa agregada correctamente",
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

  const ChangeEmpresa = (data) => {
    let url = `/empresas/${data.id}`;
    MethodPut(url, data)
      .then((res) => {
        dispatch({
          type: UPDATE_EMPRESAS,
          payload: res.data,
        });
        Swal.fire({
          title: "Empresa modificada",
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

  const DeleteEmpresa = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La empresa seleccionada será eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.value) {
        let url = `/empresas/${id}`;
        MethodDelete(url)
          .then((res) => {
            Swal.fire({
              title: "Eliminada",
              text: res.data.message,
              icon: "success",
            });
            dispatch({
              type: DELETE_EMPRESAS,
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
    <EmpresasContext.Provider
      value={{
        empresas: state.empresas,
        empresa: state.empresa,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetEmpresas,
        AddEmpresa,
        ChangeEmpresa,
        DeleteEmpresa,
      }}
    >
      {children}
    </EmpresasContext.Provider>
  );
};

export default EmpresasState;
