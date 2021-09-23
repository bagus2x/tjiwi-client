import { useMutation, useQueryClient } from 'react-query';
import { setAccessToken, setRefreshToken } from '../../services/storage';
import { publicClient, Success } from '../../services/web-api';

interface SignInRequest {
  usernameOrEmail: string;
  password: string;
}

interface SignInResponse {
  token: {
    access: string;
    refresh: string;
  };
  user: {
    id: number;
    photo: string;
    username: string;
    email: string;
    createdAt: number;
    updatedAt: number;
  };
}

const signIn = async (req: SignInRequest) => {
  const res = await publicClient.post<Success<SignInResponse>>('/users/signin', req);
  
  return res.data.data;
};

export const useSignIn = () => {
  const queryClient = useQueryClient();

  return useMutation('SIGN_IN', signIn, {
    onSuccess: (res, _req, _ctx) => {
      setAccessToken(res.token.access);
      setRefreshToken(res.token.refresh);
      queryClient.setQueryData<SignInResponse['user']>('USER', res.user);
    }
  });
};
