import { useMutation, useQueryClient } from 'react-query';
import history from '../../services/history';
import { clearToken } from '../../services/storage';
import { privateClient, Success } from '../../services/web-api';

interface SignoutResponse {
  data: number;
}

const signOut = async () => {
  const res = await privateClient.post<Success<SignoutResponse>>('/users/signout');
  
  return res.data.data;
};

export const useSignOut = () => {
  const queryClient = useQueryClient();

  return useMutation('SIGN_OUT', signOut, {
    onSettled: () => {
      clearToken();
      queryClient.clear();
      history.replace('/signin');
    }
  });
};
