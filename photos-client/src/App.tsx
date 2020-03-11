import React from 'react';
import './App.scss';

import { useSelector, useDispatch } from 'react-redux';
import { Page } from './components/Page';
import { loadPhotoRequest, loadPhotosIdRequest, loadTestRequest } from './actions/PageActions';
import { IInitialState, ITestInitialState } from "reducers";

export interface IState { page: IInitialState, test: ITestInitialState };

const App: React.FC = () => {
  const page = useSelector((state: IState) => state.page);
  const test = useSelector((state: IState) => state.test);
  const dispatch = useDispatch();

  const loadPhoto = (id: number): void => {
    dispatch(loadPhotoRequest(id));
  }

  const loadPhotosId = (): void => {
    dispatch(loadPhotosIdRequest());
  }

  const loadTest = (): void => {
    dispatch(loadTestRequest());
  }

  return (
    <Page
      selectedPhoto={page.selectedPhoto}
      photosData={page.photosData}
      loadPhoto={loadPhoto}
      loadPhotosId={loadPhotosId}
      loadTest={loadTest}
      testData={test}
    />
  )
}

export default App;
