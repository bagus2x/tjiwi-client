import { useMutation, useQueryClient } from 'react-query';
import { setAccessToken, setRefreshToken } from '../../services/storage';
import { publicClient, Success } from '../../services/web-api';

interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

interface SignUpResponse {
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

const signUp = async (req: SignUpRequest) => {
  const res = await publicClient.post<Success<SignUpResponse>>('/users/signup', req);
  return res.data.data;
};

export const useSignUp = () => {
  const queryClient = useQueryClient();

  return useMutation('SIGN_UP', signUp, {
    onSuccess: (res, _req, _ctx) => {
      setAccessToken(res.token.access);
      setRefreshToken(res.token.refresh);
      queryClient.setQueryData<SignUpResponse['user']>('USER', res.user);
    }
  });
};
