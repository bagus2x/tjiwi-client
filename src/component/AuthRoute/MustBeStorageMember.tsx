import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import useGetStorageMember from '../../hooks/query/get-storage-members-by-id';
import { useGetUser } from '../../hooks/query/get-user';
import useStorageID from '../../hooks/storageID';
import { getStorageMemberID, isStorageMember } from '../../services/storage';
import path from '../../views/path';
import Backdrop from '../Backdrop';

type MustBeStorageMemberProps = RouteProps & {
  admin?: boolean;
};

function MustBeStorageMember({ admin, ...props }: MustBeStorageMemberProps) {
  const storageID = useStorageID();
  const storMemb = useGetStorageMember(getStorageMemberID(storageID) as number);
  const user = useGetUser();

  if (!isStorageMember(storageID)) {
    return <Redirect to={path.user} />;
  }

  if (storMemb.isLoading || user.isLoading) {
    return <Backdrop />;
  }

  if (user.isError || storMemb.isError) {
    return <Redirect to={path.user} />;
  }

  if (user.data?.id !== storMemb.data?.member.id || !storMemb.data?.isActive) {
    return <Redirect to={path.user} />;
  }

  if (admin && storMemb.isSuccess && !storMemb.data.isAdmin) {
    return <Redirect to={path.storage.replace(':storageID', storageID.toString())} />;
  }

  return <Route {...props} />;
}

export default MustBeStorageMember;
