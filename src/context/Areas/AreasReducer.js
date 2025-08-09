import {
  GET_ALL_AREAS,
  ADD_AREA,
  UPDATE_AREA,
  DELETE_AREA,
  SHOW_ERRORS_API,
} from "../../types";

const AreasReducer = (state, action) => {
  switch (action.type) {
    case GET_ALL_AREAS:
      return {
        ...state,
        areas: action.payload,
        success: false,
        ErrorsApi: [],
      };
    case ADD_AREA:
      return {
        ...state,
        areas: [action.payload, ...state.areas],
      };
    case UPDATE_AREA:
      return {
        ...state,
        ErrorsApi: [],
        areas: state.areas.map((area) =>
          area.id === action.payload.id ? action.payload : area
        ),
      };
    case DELETE_AREA:
      return {
        ...state,
        areas: state.areas.filter((area) => area.id !== action.payload),
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

export default AreasReducer;
