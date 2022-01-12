import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { api } from '../../../../services/api'

interface CampaignRegisterFormProps {
  registerType: string | string[]
}





export function CampaignRegisterForm({
  registerType
}: CampaignRegisterFormProps) {
  const router = useRouter()
  //Recupera os dados do Usuário.
  var objUser = JSON.parse(localStorage.getItem('@colabora-ai:user'));
  //Variaveis Auto carregaveis
  
  const [email, setEmailResp] = useState(objUser.email)
  const [idUsu, setIdusu] = useState(objUser.idusuario)

  

  //Variaveis carregaveis conforme preenchimento
  const [nomeCamp, setCampanha] = useState('')
  const [idCategoria, setCategoria] = useState('')
  const [descricao, setDescricao] = useState('')
  const [telefone, setTelefone] = useState('')
  const [local, setLocal] = useState('')
  const [dtEvento, setDtEvento] = useState('')
  const [nomeResponsavel, setNomeResponsavel] = useState(registerType === 'creator' ? objUser.nome : '')
  const [nomeColaborador, setNomeColaborador] = useState(registerType === 'collaborator' ? objUser.nome : '')
  const [nomeColaboradorBeneficiario, setNomeBeneficiario] = useState(registerType === 'recipient' ? objUser.nome : '')
  const [idcamp, setIdcamp] = useState('')
  

  async function handleSubmit() {
    if (registerType === 'creator'){
      //Falta testar
      const response = await api.post(`http://localhost:8200/Campanha/cria_Campanha/${nomeCamp}/${nomeCamp}/${descricao}/${nomeResponsavel}/${idCategoria}/${email}/${telefone}/${local}/${dtEvento}/${idUsu}`)
    }

    if (registerType === 'collaborator'){
      //Falta Chamada
    }

    if (registerType === 'recipient'){
      //Falta Chamada
    }
    
  }
  
  console.log(nomeCamp)

  return (
    <Flex flex="1" w="100%" justify="center" py="8">
      <Flex as="form" direction="column" maxW="75%" w="100%">
        <VStack spacing="6">
          {registerType === 'creator' && (
            <SimpleGrid minChildWidth="280px" spacing="4" w="100%">
              <FormControl>
                <FormLabel color="gray.500">Nome da Campanha</FormLabel>

                <Input
                  placeholder="digite seu nome"
                  type="text"
                  focusBorderColor="blue.600"
                  _hover={{
                    bgColor: '#e6e6e6'
                  }}
                  size="lg"
                  value={nomeCamp}
                  onChange={(event) => setCampanha(event.target.value)}
                  
                />
              </FormControl>
              <FormControl>
                <FormLabel color="gray.500">Categoria</FormLabel>

                <Select
                  placeholder="Selecione uma opção"
                  value={idCategoria}
                  onChange={(event) => setCategoria(event.target.value)}
                >
                  <option value="1">Doação de alimentos</option>
                  <option value="2">Doação de brinquedos</option>
                  <option value="3">Doação de Materiais de Higiene</option>
                  <option value="4">Doação de materiais de Higiene Pessoal</option>
                  <option value="5">Doação de Animais</option>
                  <option value="6">Multirão de Limpeza</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          )}
          <SimpleGrid minChildWidth="280px" spacing="4" w="100%">
            {registerType !== 'creator' && (
              <FormControl>
                <FormLabel color="gray.500">Campanha</FormLabel>
                <Select
                  placeholder="Selecione uma opção"
                  value={idcamp}
                  onChange={(event) => setIdcamp(event.target.value)}
                >
                  <option value="1">Campanha 1</option>
                  <option value="2">Campanha 2</option>
                  <option value="3">Campanha 3</option>
                </Select>
              </FormControl>
            )}
          </SimpleGrid>
          <SimpleGrid minChildWidth="280px" spacing="4" w="100%">
            <FormControl>
              <FormLabel color="gray.500">Descrição da Campanha</FormLabel>

              <Textarea
                placeholder="digite seu nome"
                type="text"
                focusBorderColor="blue.600"
                _hover={{
                  bgColor: '#e6e6e6'
                }}
                size="lg"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
              />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid minChildWidth="280px" spacing="4" w="100%">
            <FormControl>
              <FormLabel color="gray.500">Nome do Responsável</FormLabel>

              <Input
                placeholder="digite seu nome"
                type="text"
                focusBorderColor="blue.600"
                _hover={{
                  bgColor: '#e6e6e6'
                }}
                size="lg"
                value={nomeResponsavel}
                onChange={(event) => setNomeResponsavel(event.target.value)}
              />
            </FormControl>
            
            {registerType === 'collaborator' && (
              <FormControl>
                <FormLabel color="gray.500">Nome do Colaborador</FormLabel>

                <Input
                  placeholder="digite seu nome"
                  type="text"
                  focusBorderColor="blue.600"
                  _hover={{
                    bgColor: '#e6e6e6'
                  }}
                  size="lg"
                  value={nomeColaborador}
                  onChange={(event) => setNomeColaborador(event.target.value)}
                />
              </FormControl>
            )}
            {registerType === 'recipient' && (
              <FormControl>
                <FormLabel color="gray.500">Nome do Beneficiário</FormLabel>

                <Input
                  placeholder="digite seu nome"
                  type="text"
                  focusBorderColor="blue.600"
                  _hover={{
                    bgColor: '#e6e6e6'
                  }}
                  size="lg"
                  value={nomeColaboradorBeneficiario}
                  onChange={(event) => setNomeBeneficiario(event.target.value)}
                />
              </FormControl>
            )}
          </SimpleGrid>
          <SimpleGrid minChildWidth="280px" spacing="4" w="100%">
            <FormControl>
              <FormLabel color="gray.500">E-mail</FormLabel>

              <Input
                placeholder="digite seu nome"
                type="text"
                focusBorderColor="blue.600"
                _hover={{
                  bgColor: '#e6e6e6'
                }}
                size="lg"
                value={email}
                onChange={(event) => {}}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.500">Telefone</FormLabel>

              <Input
                placeholder="digite seu nome"
                type="text"
                focusBorderColor="blue.600"
                _hover={{
                  bgColor: '#e6e6e6'
                }}
                size="lg"
                value={telefone}
                onChange={(event) => setTelefone(event.target.value)}
              />
            </FormControl>
          </SimpleGrid>
          <SimpleGrid minChildWidth="280px" spacing="4" w="100%">
            <FormControl>
              <FormLabel color="gray.500">Local do Encontro</FormLabel>

              <Input
                placeholder="digite seu nome"
                type="text"
                focusBorderColor="blue.600"
                _hover={{
                  bgColor: '#e6e6e6'
                }}
                size="lg"
                value={local}
                onChange={(event) => setLocal(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.500">Data do Encontro</FormLabel>

              <Input
                placeholder="digite seu nome"
                type="date"
                focusBorderColor="blue.600"
                _hover={{
                  bgColor: '#e6e6e6'
                }}
                size="lg"
                value={dtEvento}
                onChange={(event) => setDtEvento(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.500">Hora do Encontro</FormLabel>

              <Input
                placeholder="digite seu nome"
                type="time"
                focusBorderColor="blue.600"
                _hover={{
                  bgColor: '#e6e6e6'
                }}
                size="lg"
                value={dtEvento}
                onChange={(event) => setDtEvento(event.target.value)}
              />
            </FormControl>
          </SimpleGrid>
        </VStack>

        <Flex mt="8" justify="flex-end">
          <Stack direction="row">
            <Button
              size="lg"
              colorScheme="red"
              onClick={() => router.push('/')}
            >
              Voltar
            </Button>
            <Button size="lg" bg="#E76F51" color="white" onClick={handleSubmit}>
              Registrar
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  )
}
