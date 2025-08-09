import {
  GET_ALL_ARCHIVOS,
  ADD_ARCHIVOS,
  UPDATE_ARCHIVOS,
  DELETE_ARCHIVOS,
} from "../../types/index";

const ArchivosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_ARCHIVOS:
      return {
        ...state,
        archivos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_ARCHIVOS:
      return {
        ...state,
        archivos: [action.payload, ...state.archivos],
      };
    case UPDATE_ARCHIVOS:
      return {
        ...state,
        ErrorsApi: [],
        archivos: state.archivos.map((archivo) => {
          if (archivo.id === action.payload.id) {
            return action.payload;
          }
          return archivo;
        }),
      };
    case DELETE_ARCHIVOS:
      return {
        ...state,
        archivos: state.archivos.filter(
          (archivo) => archivo.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default ArchivosReducer;
