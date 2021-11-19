import React, { createContext, useState, useContext, useEffect } from 'react';

import { api } from '../services/api';
import { database } from '../database';
import { User as UserModel } from '../database/model/User';


interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updatedUser: (user: User) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const signIn = async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<UserModel>('users');

      await database.write(async () => {
        await userCollection.create(( newUser ) => {
          newUser.user_id = user.id,
          newUser.name = user.name,
          newUser.email = user.email,
          newUser.driver_license = user.driver_license,
          newUser.avatar = user.avatar,
          newUser.token = token
        });
      });

      setData({ ...user, token });
    } catch (error) {
        throw new Error();
    }
  };

  const signOut = async () => {
    try {
      const userCollection = database.get<UserModel>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);

        await userSelected.destroyPermanently();
      });

      setData({} as User);
    } catch (error) {
      throw new Error();
    }
  }

  const updatedUser = async (user: User) => {
    try {
      const userCollection = database.get<UserModel>('users');

      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);

        await userSelected.update(( userData ) => {
          userData.name = user.name,
          userData.driver_license = user.driver_license,
          userData.avatar = user.avatar
        });
      });

      setData(user);
    } catch (error) {
      throw new Error()
    }
  }

  useEffect(() => {
    const loadUserData = async () => {
      const userCollection  = database.get<UserModel>('users');

      const response = await userCollection.query().fetch();

      if(response.length > 0) {
        const userData = response[0]._raw as unknown as User;

        api.defaults.headers.authorization = `Bearer ${userData.token}`;

        setData(userData);

        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updatedUser, loading }}>
      {children}
    </AuthContext.Provider>

  )
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };