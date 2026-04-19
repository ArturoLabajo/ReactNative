import * as ActionTypes from './ActionTypes';

// Reducer comentarios
export const comentarios = (state = { errMess: null, comentarios:[]}, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMENTARIOS:
      return {...state, errMess: null, comentarios: action.payload};

    case ActionTypes.COMENTARIOS_FAILED:
      return {...state, errMess: action.payload};

    default:
      return state;
  }
};