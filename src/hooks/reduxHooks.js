import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/passwordBlobSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
