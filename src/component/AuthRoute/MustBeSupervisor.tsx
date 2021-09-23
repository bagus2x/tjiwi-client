import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useSupervisor from '../../hooks/query/supervisor';
import useStorageID from '../../hooks/storageID';
import path from '../../views/path';
import Backdrop from '../Backdrop';

function MustBeSupervisor(props: RouteProps) {
  const storageID = useStorageID();
  const supervisor = useSupervisor();

  if (supervisor.isLoading) {
    return <Backdrop />;
  }

  if (supervisor.isError) {
    return <Redirect to={path.storage.replace(':storageID', storageID.toString())} />;
  }

  if (!supervisor.isLoading && supervisor.isSuccess && !supervisor.isSupervisor) {
    return <Redirect to={path.storage.replace(':storageID', storageID.toString())} />;
  }

  return <Route {...props} />;
}

export default MustBeSupervisor;
