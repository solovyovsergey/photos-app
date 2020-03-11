import { combineReducers } from 'redux';
import {
  IAction,
  LOAD_PHOTO_REQUEST,
  LOAD_PHOTO_SUCCESS,
  LOAD_PHOTO_FAILURE,
  LOAD_PHOTOSID_REQUEST,
  LOAD_PHOTOSID_SUCCESS,
  LOAD_PHOTOSID_FAILURE,
  LOAD_TEST_REQUEST,
  LOAD_TEST_SUCCESS,
  LOAD_TEST_FAILURE,
} from '../actions/PageActions';

export interface IArrayPhotos {
  id: number,
  name: string
}

export interface IPhotosData {
  arrayPhotos?: IArrayPhotos[];
  isFetching: boolean;
  error: string;
}

export interface IPhotoData {
  id: number;
  name: string;
  path: string;
};
export interface ISelectedPhoto {
  photoData?: IPhotoData;
  isFetching: boolean;
  error: string;
}

export interface IInitialState {
  selectedPhoto: ISelectedPhoto;
  photosData: IPhotosData;
}

const initialState: IInitialState = {
  selectedPhoto: {
    isFetching: false,
    error: ''
  },
  photosData: {
    isFetching: false,
    error: '',
  }
};

function pageReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case LOAD_PHOTO_REQUEST:
      return { ...state, selectedPhoto: { ...state.selectedPhoto, isFetching: true, error: '' } }
    case LOAD_PHOTO_SUCCESS:
      return { ...state, selectedPhoto: { photoData: action.payload, isFetching: false, error: '' } }
    case LOAD_PHOTO_FAILURE:
      return { ...state, selectedPhoto: { error: action.payload.message, isFetching: false } }

    case LOAD_PHOTOSID_REQUEST:
      return { ...state, photosData: { ...state.photosData, isFetching: true, error: '' } }
    case LOAD_PHOTOSID_SUCCESS:
      return { ...state, photosData: { arrayPhotos: action.payload, isFetching: false, error: '' } }
    case LOAD_PHOTOSID_FAILURE:
      return { ...state, photosData: { error: action.payload.message, isFetching: false } }

    default:
      return state;
  }
}

export interface ITestInitialState {
  data: string;
  error: string;
  isFetching: boolean;
}

function testReducer(state: ITestInitialState = {
  data: "",
  error: "",
  isFetching: false,
}, action: IAction) {
  switch (action.type) {
    case LOAD_TEST_REQUEST:
      return { ...state, isFetching: true }
    case LOAD_TEST_SUCCESS:
      return { ...state, data: action.payload, isFetching: false }
    case LOAD_TEST_FAILURE:
      return { ...state, data: action.payload, error: action.payload, isFetching: false }

    default:
      return state;
  }
}

export const rootReducer = combineReducers({
  page: pageReducer, test: testReducer
})
