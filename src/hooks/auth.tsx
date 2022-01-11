import axios from 'axios'
import cors from 'cors'

import {
  useContext,
  useState,
  createContext,
  ReactNode,
  useEffect
} from 'react'

import { api } from '../services/api'

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  nome: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  documento: string
  email: string
  senha: string
  tipo: string
}

interface SignInRequest {
  email: string
  senha: string
}


interface SignUpRequest {
  nome: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  documento: string
  email: string
  senha: string
  tipo: string
}

interface IAuthContextData {
  user: User
  signIn(data: SignInRequest): Promise<void>
  signUp(data: SignUpRequest): Promise<void>
  signOut(): Promise<void>
  storageLoading: boolean
}

interface ServerResponse {
  user: User
}

const AuthContext = createContext({} as IAuthContextData)
const _cors = cors({
  methods: ['GET', 'HEAD', 'POST', 'PUT'],
})
const baseURL = axios.create({
  baseURL: 'https://localhost:3004/usuario/'
})


function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  const [storageLoading, setStorageLoading] = useState(true)

  const userStorageKey = '@colabora-ai:user'

  async function signIn(data: SignInRequest) {
    try {
      var json = JSON.stringify(data)
      const response = await api.post<ServerResponse>('auth', json)

      if (response.data) {
        setUser(response.data.user)

        localStorage.setItem(userStorageKey, JSON.stringify(response.data.user))
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function signUp(data: SignUpRequest) {
    try {
   
      const response = await axios.post<ServerResponse>('http://localhost:3004/usuario/cria_usuario1', data)

      
      // const cadUsuurl = `cria_usuario1`

      // var headers = {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      //   'Access-Control-Allow-Headers': 'Content-Type, Authorisation',
      // }
      // //axios.post('https://localhost:3004/usuario/cria_usuario1', data, {"headers" : headers})
      // await baseURL.post(`cria_usuario1`, data)
      
      // var headers = {
      //   'accept': '*/*',
      //   'Content-Type': 'application/json',
      //   'Sec-Fetch-Mode': 'no-cors'
      // }
      // var  corsOptions  = { 
      //   origem : 'http://localhost:3000/' , 
      //   optionsSuccessStatus : 200 //  alguns navegadores legados (IE11, várias SmartTVs) bloqueados em 204  
      // }
      // axios.post('http://localhost:3004/usuario/cria_usuario1', data, {
      //   method: 'POST',
      //   headers: {
      //     "Content-Type": "application/json; charset=UTF-8;",
      //   }
      // })
    } catch (err) {
      console.log(err)
    }
  }

  async function signOut() {
    setUser({} as User)
    localStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    async function loadStoragedData() {
      const userStoraged = localStorage.getItem(userStorageKey)

      if (userStoraged) {
        const parseUserStoraged = JSON.parse(userStoraged) as User
        setUser(parseUserStoraged)
      }

      setStorageLoading(false)
    }

    loadStoragedData()
  }, [userStorageKey])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signOut,
        storageLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
