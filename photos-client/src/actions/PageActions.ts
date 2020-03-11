import { IPhotoData, IArrayPhotos } from "../reducers";

export const LOAD_PHOTO_REQUEST = 'LOAD_PHOTO_REQUEST';
export const LOAD_PHOTO_SUCCESS = 'LOAD_PHOTO_SUCCESS';
export const LOAD_PHOTO_FAILURE = 'LOAD_PHOTO_FAILURE';
export const LOAD_PHOTOSID_REQUEST = 'LOAD_PHOTOSID_REQUEST';
export const LOAD_PHOTOSID_SUCCESS = 'LOAD_PHOTOSID_SUCCESS';
export const LOAD_PHOTOSID_FAILURE = 'LOAD_PHOTOSID_FAILURE';
export const LOAD_TEST_REQUEST = 'LOAD_TEST_REQUEST';
export const LOAD_TEST_SUCCESS = 'LOAD_TEST_SUCCESS';
export const LOAD_TEST_FAILURE = 'LOAD_TEST_FAILURE';

export interface IAction {
    type: string;
    payload?: any;
}

export function loadPhotoRequest(id: number): IAction {
    return {
        type: LOAD_PHOTO_REQUEST,
        payload: id,
    }
}

export function loadPhotoSuccess(data: IPhotoData): IAction {
    return {
        type: LOAD_PHOTO_SUCCESS,
        payload: data,
    }
}

export function loadPhotoFailure(err: Error): IAction {
    return {
        type: LOAD_PHOTO_FAILURE,
        payload: err,
    }
}

export function loadPhotosIdRequest(): IAction {
    return {
        type: LOAD_PHOTOSID_REQUEST,
    }
}

export function loadPhotosIdSuccess(data: IArrayPhotos[]): IAction {
    return {
        type: LOAD_PHOTOSID_SUCCESS,
        payload: data,
    }
}

export function loadPhotosIdFailure(err: Error): IAction {
    return {
        type: LOAD_PHOTOSID_FAILURE,
        payload: err,
    }
}

export function loadTestRequest(): IAction {
    return {
        type: LOAD_TEST_REQUEST,
    }
}

export function loadTestSuccess(data:string): IAction {
    return {
        type: LOAD_TEST_SUCCESS,
        payload: data,
    }
}

export function loadTestFailure(err: Error): IAction {
    return {
        type: LOAD_TEST_FAILURE,
        payload: err,
    }
}
