import { useParams } from 'react-router';

const useStorageID = () => {
  const { storageID } = useParams<{ storageID: string }>();

  return parseInt(storageID);
};

export default useStorageID;
