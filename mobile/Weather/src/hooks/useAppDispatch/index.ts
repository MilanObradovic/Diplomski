import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {RootReducerType} from '../../redux/reducers';

export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootReducerType, any, Action<any>>>();
