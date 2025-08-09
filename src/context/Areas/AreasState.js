import React, { useReducer } from "react";
import AreasContext from "./AreasContext";
import AreasReducer from "./AreasReducer";
import MethodGet, {
  MethodDelete,
  MethodPost,
  MethodPut,
} from "../../config/service";
import Swal from "sweetalert2";
import {
  GET_ALL_AREAS,
  ADD_AREA,
  UPDATE_AREA,
  DELETE_AREA,
  SHOW_ERRORS_API,
} from "../../types";

const AreasState = ({ children }) => {
  const initialState = {
    areas: [],
    area: null,
    ErrorsApi: [],
    success: false,
  };

  const [state, dispatch] = useReducer(AreasReducer, initialState);

  // Obtener todas las áreas
  const GetAreas = () => {
    MethodGet("/areas")
      .then((res) => {
        dispatch({
          type: GET_ALL_AREAS,
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

  // Agregar un área
  const AddArea = (data) => {
    MethodPost("/areas", data)
      .then((res) => {
        dispatch({
          type: ADD_AREA,
          payload: res.data,
        });
        Swal.fire({
          title: "Agregada",
          text: "Área agregada correctamente",
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

  // Modificar un área
  const ChangeArea = (data) => {
    MethodPut(`/areas/${data.id}`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_AREA,
          payload: res.data,
        });
        Swal.fire({
          title: "Modificada",
          text: "Área modificada correctamente",
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

  // Eliminar un área
  const DeleteArea = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El área seleccionada será eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        MethodDelete(`/areas/${id}`)
          .then((res) => {
            dispatch({
              type: DELETE_AREA,
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
    <AreasContext.Provider
      value={{
        areas: state.areas,
        area: state.area,
        ErrorsApi: state.ErrorsApi,
        success: state.success,
        GetAreas,
        AddArea,
        ChangeArea,
        DeleteArea,
      }}
    >
      {children}
    </AreasContext.Provider>
  );
};

export default AreasState;
