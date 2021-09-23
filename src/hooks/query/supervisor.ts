import useStorageID from '../storageID';
import useGetStorage from './get-storage';
import { useGetUser } from './get-user';

const useSupervisor = () => {
  const storageID = useStorageID();
  const storage = useGetStorage(storageID);
  const user = useGetUser();

  return {
    isLoading: storage.isLoading || user.isLoading,
    isSuccess: storage.isSuccess && user.isSuccess,
    isError: user.isError || storage.isError,
    isSupervisor: user.data?.id === storage.data?.supervisor.id
  };
};

export default useSupervisor;
