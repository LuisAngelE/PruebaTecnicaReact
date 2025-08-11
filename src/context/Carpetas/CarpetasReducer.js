import {
  GET_ALL_CARPETAS,
  ADD_CARPETAS,
  UPDATE_CARPETAS,
  DELETE_CARPETAS,
} from "../../types/index";

const CarpetasReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_CARPETAS:
      return {
        ...state,
        carpetas: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_CARPETAS:
      return {
        ...state,
        carpetas: [action.payload, ...state.carpetas],
      };
    case UPDATE_CARPETAS:
      return {
        ...state,
        ErrorsApi: [],
        carpetas: state.carpetas.map((carpeta) =>
          carpeta.id === action.payload.id ? action.payload : carpeta
        ),
      };

    case DELETE_CARPETAS:
      return {
        ...state,
        carpetas: state.carpetas.filter(
          (carpeta) => carpeta.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default CarpetasReducer;
