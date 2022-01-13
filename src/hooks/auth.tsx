import { apiUser } from '../services/usuario'

import React, {
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
  clear():Promise<void>
  storageLoading: boolean
}

interface ServerResponse {
  data: User
}

const AuthContext = createContext({} as IAuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  const [signInRequest, setSignInRequest] = useState<SignInRequest>({} as SignInRequest)

  const [storageLoading, setStorageLoading] = useState(true)

  const userStorageKey = '@colabora-ai:user'

  async function signIn(data: SignInRequest) {
    try {
      
      const response = await api.post(`http://localhost:8100/usuario/signin/${data.email}/${data.senha}`)
      setUser(response.data)
      localStorage.setItem(userStorageKey, JSON.stringify(response.data))

      data.email = ''
      data.senha = ''
      
    } catch (err) {
      console.log(err)
    }
  }

  async function signUp(data: SignUpRequest) {
    try {
      
      const response = await api.post<ServerResponse>(`http://localhost:8100/usuario/cria_usuario/${data.nome}/${data.endereco}/${data.bairro}/${data.cidade}/${data.estado}/${data.cep}/${data.documento}/${data.email}/${data.senha}/${data.tipo}`)
      
      console.log(response)

    } catch (err) {
      console.log(err)
    }
  }

  async function signOut() {
    setUser({} as User)
    localStorage.removeItem(userStorageKey)
  }

  async function clear() {
    
    
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
        clear,
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
