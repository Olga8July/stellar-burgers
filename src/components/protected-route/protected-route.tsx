import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

import { useSelector } from '../../services/store';
import {
  selectAuthChecked,
  selectUserData
} from '../../services/selectors/selectors';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}) => {
  const isAuthChecked = useSelector(selectAuthChecked);
  const user = useSelector(selectUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
