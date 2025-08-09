import React, { useReducer } from "react";
import DocumentosContext from "./DocumentosContext";
import DocumentosReducer from "./DocumentosReducer";
import MethodGet, { MethodDelete, MethodPost, MethodPut } from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_DOCUMENTOS,
  ADD_DOCUMENTOS,
  UPDATE_DOCUMENTOS,
  DELETE_DOCUMENTOS,
  SHOW_ERRORS_API,
} from "../../types";

const DocumentosState = ({ children }) => {
  const initialState = {
    documentos: [],
    documento: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(DocumentosReducer, initialState);

  // Obtener todos los documentos
  const GetDocumentos = () => {
    let url = "/documentos";
    MethodGet(url)
      .then((res) => {
        dispatch({
          type: GET_ALL_DOCUMENTOS,
          payload: res.data,
        });
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Agregar un documento
  const AddDocumento = (data) => {
    let url = "/documentos";
    MethodPost(url, data)
      .then((res) => {
        dispatch({
          type: ADD_DOCUMENTOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Agregado",
          text: "Documento agregado correctamente",
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

  // Modificar un documento
  const ChangeDocumento = (data) => {
    let url = `/documentos/${data.id}`;
    MethodPut(url, data)
      .then((res) => {
        dispatch({
          type: UPDATE_DOCUMENTOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Documento modificado",
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

  // Eliminar un documento
  const DeleteDocumento = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El documento seleccionado será eliminado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        let url = `/documentos/${id}`;
        MethodDelete(url)
          .then((res) => {
            Swal.fire({
              title: "Eliminado",
              text: res.data.message,
              icon: "success",
            });
            dispatch({
              type: DELETE_DOCUMENTOS,
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
    <DocumentosContext.Provider
      value={{
        documentos: state.documentos,
        documento: state.documento,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetDocumentos,
        AddDocumento,
        ChangeDocumento,
        DeleteDocumento,
      }}
    >
      {children}
    </DocumentosContext.Provider>
  );
};

export default DocumentosState;
