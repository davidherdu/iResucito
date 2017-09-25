import { INITIALIZE_DONE, SET_SALMOS_FILTER } from '../actions';
import { NavigationActions } from 'react-navigation';
import { Map } from 'immutable';

const initialState = Map({
  salmos: null,
  salmos_filter: null,
  salmos_categoria: null,
  salmoActual: null
});

export default function ui(state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_DONE:
      return state.set('salmos', action.salmos);
    case SET_SALMOS_FILTER:
      return state.set('salmos_filter', action.filter);
    case NavigationActions.NAVIGATE:
      switch (action.routeName) {
        case 'Alfabetico':
          return state.set('salmos_categoria', null);
          break;
        case 'Precatecumenado':
        case 'Catecumenado':
        case 'Eleccion':
        case 'Liturgia':
          return state.set('salmos_categoria', action.routeName);
          break;
        case 'Detail':
          return state.set('salmoActual', action.params.salmo);
          break;
      }
      return state;
    default:
      return state;
  }
}
