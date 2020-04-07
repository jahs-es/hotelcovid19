import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMeasure, defaultValue } from 'app/shared/model/measure.model';

export const ACTION_TYPES = {
  FETCH_MEASURE_LIST: 'measure/FETCH_MEASURE_LIST',
  FETCH_MEASURE: 'measure/FETCH_MEASURE',
  CREATE_MEASURE: 'measure/CREATE_MEASURE',
  UPDATE_MEASURE: 'measure/UPDATE_MEASURE',
  DELETE_MEASURE: 'measure/DELETE_MEASURE',
  RESET: 'measure/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMeasure>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MeasureState = Readonly<typeof initialState>;

// Reducer

export default (state: MeasureState = initialState, action): MeasureState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEASURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEASURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEASURE):
    case REQUEST(ACTION_TYPES.UPDATE_MEASURE):
    case REQUEST(ACTION_TYPES.DELETE_MEASURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEASURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEASURE):
    case FAILURE(ACTION_TYPES.CREATE_MEASURE):
    case FAILURE(ACTION_TYPES.UPDATE_MEASURE):
    case FAILURE(ACTION_TYPES.DELETE_MEASURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEASURE_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_MEASURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEASURE):
    case SUCCESS(ACTION_TYPES.UPDATE_MEASURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEASURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/measures';

// Actions

export const getEntities: ICrudGetAllAction<IMeasure> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MEASURE_LIST,
    payload: axios.get<IMeasure>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMeasure> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEASURE,
    payload: axios.get<IMeasure>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMeasure> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEASURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IMeasure> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEASURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMeasure> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEASURE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
