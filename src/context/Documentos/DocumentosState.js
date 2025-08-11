import React, { useReducer } from "react";
import DocumentosContext from "./DocumentosContext";
import DocumentosReducer from "./DocumentosReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/service";
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

  const GetDocumentos = (
    nombre = "",
    tipo_archivo_id = "",
    carpeta_id = ""
  ) => {
    let url = "/documentos";
    const params = new URLSearchParams();

    if (nombre.trim() !== "") params.append("nombre", nombre);
    if (tipo_archivo_id !== "")
      params.append("tipo_archivo_id", tipo_archivo_id);
    if (carpeta_id !== "") params.append("carpeta_id", carpeta_id);

    const queryString = params.toString();
    if (queryString) url += `?${queryString}`;

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

  const AddDocumento = (formData) => {
    let url = "/documentos";

    MethodPost(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        dispatch({
          type: ADD_DOCUMENTOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Agregado",
          text: "Documento agregado correctamente",
          icon: "success",
        });
        GetDocumentos();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.response?.data?.message || "Ocurrió un error",
        });
      });
  };

  const ChangeDocumento = (data) => {
    let url = `/editdocumentos/${data.id}`;

    const formData = new FormData();

    if (data.archivo && data.archivo.length > 0) {
      formData.append("archivo", data.archivo[0]);
    }

    formData.append("nombre", data.nombre);
    formData.append("carpeta_id", data.carpeta_id);
    formData.append("tipo_archivo_id", data.tipo_archivo_id);
    formData.append("fecha_creacion", data.fecha_creacion);

    MethodPost(url, formData)
      .then((res) => {
        dispatch({
          type: UPDATE_DOCUMENTOS,
          payload: res.data,
        });
        Swal.fire({
          title: "Documento modificado",
          text: res.data.message,
          icon: "success",
        });
        GetDocumentos();
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: error.response?.data?.message || "Ocurrió un error",
        });
      });
  };

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
