import { useParams } from 'react-router';
import { getStorageMemberID } from '../services/storage';

const useStorageMemberID = () => {
  const { storageID } = useParams<{ storageID: string }>();

  return getStorageMemberID(parseInt(storageID));
};

export default useStorageMemberID;
