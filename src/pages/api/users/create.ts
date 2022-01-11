// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { usersStorage } from '../../../data/users'

export type User = {
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

export default function createUserHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    nome,
    endereco,
    bairro,
    cidade,
    estado,
    cep,
    documento,
    email,
    senha,
    tipo
  } = req.body

  const findUser = usersStorage.filter((user) => user.email === email)

  if (findUser.length !== 0) {
    return res.status(401).json({ message: 'User already exists.' })
  }

  const user = {
    nome,
    endereco,
    bairro,
    cidade,
    estado,
    cep,
    documento,
    email,
    senha,
    tipo
  }

  usersStorage.push(user)

  return res.status(200).json(user)
}
