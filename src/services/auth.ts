import { api } from '@/services/api'
import { resources } from './api.constants';

interface SignInRequestData {
  email: string;
  password: string;
  avatar?: string;
  name?: string;
}

export async function signInRequest(data: SignInRequestData) {
  const {email, password, avatar, name } = data;
  if (!email || !password) {
      throw new Error('Preencha e-mail e senha para continuar!')
  } else {
      try {
          const response = await api.post(`${resources.USERS}/auth`, { email, password });
          const {token, user} = response.data;
          return {token, user};
      } catch (err) {
        throw new Error('Usuário ou senha incorretos.')
      }
  }
} 