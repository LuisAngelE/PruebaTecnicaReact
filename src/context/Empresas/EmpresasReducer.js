import {
  GET_ALL_EMPRESAS,
  ADD_EMPRESAS,
  UPDATE_EMPRESAS,
  DELETE_EMPRESAS,
} from "../../types/index";
const EmpresasReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_EMPRESAS:
      return {
        ...state,
        empresas: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_EMPRESAS:
      return {
        ...state,
        empresas: [action.payload, ...state.empresas],
      };
    case UPDATE_EMPRESAS:
      return {
        ...state,
        ErrorsAPI: [],
        empresas: state.empresas.map((empresa) => {
          if (empresa.id === action.payload.id) {
            empresa = action.payload;
          }
          return empresa;
        }),
      };
    case DELETE_EMPRESAS:
      return {
        ...state,
        empresas: state.empresas.filter(
          (empresa) => empresa.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default EmpresasReducer;
