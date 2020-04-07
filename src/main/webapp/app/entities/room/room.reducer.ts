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

import { IRoom, defaultValue } from 'app/shared/model/room.model';

export const ACTION_TYPES = {
  FETCH_ROOM_LIST: 'room/FETCH_ROOM_LIST',
  FETCH_ROOM: 'room/FETCH_ROOM',
  CREATE_ROOM: 'room/CREATE_ROOM',
  UPDATE_ROOM: 'room/UPDATE_ROOM',
  DELETE_ROOM: 'room/DELETE_ROOM',
  RESET: 'room/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRoom>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type RoomState = Readonly<typeof initialState>;

// Reducer

export default (state: RoomState = initialState, action): RoomState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROOM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ROOM):
    case REQUEST(ACTION_TYPES.UPDATE_ROOM):
    case REQUEST(ACTION_TYPES.DELETE_ROOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ROOM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROOM):
    case FAILURE(ACTION_TYPES.CREATE_ROOM):
    case FAILURE(ACTION_TYPES.UPDATE_ROOM):
    case FAILURE(ACTION_TYPES.DELETE_ROOM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROOM_LIST): {
      const links = parseHeaderForLinks(action.payload.headers.link);

      return {
        ...state,
        loading: false,
        links,
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    }
    case SUCCESS(ACTION_TYPES.FETCH_ROOM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ROOM):
    case SUCCESS(ACTION_TYPES.UPDATE_ROOM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ROOM):
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

const apiUrl = 'api/rooms';

// Actions

export const getEntities: ICrudGetAllAction<IRoom> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ROOM_LIST,
    payload: axios.get<IRoom>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IRoom> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROOM,
    payload: axios.get<IRoom>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IRoom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROOM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IRoom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROOM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRoom> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROOM,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
