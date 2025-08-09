import {
  GET_ALL_DIRECCIONES,
  ADD_DIRECCION,
  UPDATE_DIRECCION,
  DELETE_DIRECCION,
  SHOW_ERRORS_API,
} from "../../types";

const DireccionesReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_DIRECCIONES:
      return {
        ...state,
        direcciones: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_DIRECCION:
      return {
        ...state,
        direcciones: [action.payload, ...state.direcciones],
      };
    case UPDATE_DIRECCION:
      return {
        ...state,
        ErrorsApi: [],
        direcciones: state.direcciones.map((dir) =>
          dir.id === action.payload.id ? action.payload : dir
        ),
      };
    case DELETE_DIRECCION:
      return {
        ...state,
        direcciones: state.direcciones.filter(
          (dir) => dir.id !== action.payload
        ),
      };
    case SHOW_ERRORS_API:
      return {
        ...state,
        ErrorsApi: action.payload,
      };
    default:
      return state;
  }
};

export default DireccionesReducer;
