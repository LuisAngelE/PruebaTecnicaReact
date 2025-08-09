import {
  GET_ALL_DOCUMENTOS,
  ADD_DOCUMENTOS,
  UPDATE_DOCUMENTOS,
  DELETE_DOCUMENTOS,
} from "../../types/index";

const DocumentosReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_DOCUMENTOS:
      return {
        ...state,
        documentos: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_DOCUMENTOS:
      return {
        ...state,
        documentos: [action.payload, ...state.documentos],
      };
    case UPDATE_DOCUMENTOS:
      return {
        ...state,
        ErrorsApi: [],
        documentos: state.documentos.map((documento) => {
          if (documento.id === action.payload.id) {
            return action.payload;
          }
          return documento;
        }),
      };
    case DELETE_DOCUMENTOS:
      return {
        ...state,
        documentos: state.documentos.filter(
          (documento) => documento.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default DocumentosReducer;
