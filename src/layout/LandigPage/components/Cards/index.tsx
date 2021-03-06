import {
  Container,
  Flex,
  Box,
  Heading,
  Image,
  Text,
  Stack,
  useBreakpointValue,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { useAuth } from '../../../../hooks/auth'
import { api } from '../../../../services/api'


export function Cards() {

  const isXl = useBreakpointValue({ base: false, xl: true })

  const cards = [
    {
      imageUrl: 'images/create-campaign.jpg',
      title: 'CRIAR CAMPANHA',
      description:
        'Você que deseja criar uma campanha social este é o lugar certo, clique aqui...',
      type: 'creator'
    },
    {
      imageUrl: 'images/collab.jpg',
      title: 'COLABORAR',
      description:
        'Quer ser um colaborador de uma campanha social, clique aqui...',
      type: 'collaborator'
    },
    {
      imageUrl: 'images/beneficiaries.jpg',
      title: 'SER BENEFICIÁRIO',
      description:
        'Esta necessitando de auxilio, você veio ao lugar certo, clique aqui...',
      type: 'recipient'
    }
  ]


  const { user } = useAuth()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [camps, setCamps] = useState([])
  const [objColaborador, setColaborador] = useState([])
  const [objBeneficiario, setBeneficiario] = useState([])

  useEffect(() => {

    async function recuperaDados() {
      // const { user } = useAuth()
      if (user.tipo === 'creator'){

        const responseCamp = await api.get(`http://localhost:8200/Campanha/PesquisarByUsuario/${user.idusuario}`)

        setCamps(responseCamp.data)

        console.log(camps)
      }

      if (user.tipo !== 'creator'){
        const responseCamp = await api.get(`http://localhost:8200/Campanha/PesquisarByUsuario/1`)

        setCamps(responseCamp.data)

        console.log(camps)

      }

      // if (user.tipo === 'recipient'){
      //   const responseCamp = await api.get(`endpoint certo`)
      //   setCampanhas(responseCamp.data)
      // }
    }
    recuperaDados()
  }, [user])

  return (
    <>
      <Container maxW={isXl ? '75%' : '100%'} py="16">
        <Flex w="100%" justify="center">
          <Stack
            spacing="16"
            h={isXl ? '450px' : 'auto'}
            direction={isXl ? 'row' : 'column'}
          >
            {cards.map((card, index) => (
              <Flex
                key={index}
                direction="column"
                w={isXl ? '300px' : '100%'}
                borderTopRightRadius="4"
                borderTopLeftRadius="4"
                borderBottomRightRadius="4"
                borderBottomLeftRadius="4"
                bg="#F0F0F0"
                _hover={{ boxShadow: '-1px 1px 15px 3px rgba(94,94,94,0.9);' }}
                boxShadow="-1px 1px 5px 3px rgba(94,94,94,0.5);"
                transition="all ease-in 0.2s"
              >
                <Image
                  h={isXl ? '200px' : '400px'}
                  src={card.imageUrl}
                  borderTopRightRadius="4"
                  borderTopLeftRadius="4"
                />
                <Flex
                  w="100%"
                  justify="center"
                  direction="column"
                  py="2"
                  px="6"
                >
                  <Box textAlign="center" mt="4">
                    <Heading size="md" color="#E76F51">
                      {card.title}
                    </Heading>
                  </Box>
                  <Box textAlign="center" py="8">
                    <Text color="gray.600">{card.description}</Text>
                  </Box>
                  <Flex justify="center">
                    {card.type === 'creator' && user.tipo === 'creator' && (
                      <Link href={`/campaigns/register/${user.tipo}`}>
                        <Button size="lg" bg="#E76F51" color="white" w="100%">
                          Criar
                        </Button>
                      </Link>
                    )}

                    {card.type === 'collaborator' &&
                      user.tipo === 'collaborator' && (
                        <Link href={`/campaigns/register/${user.tipo}`}>
                          <Button size="lg" bg="#E76F51" color="white" w="100%">
                            Colaborar
                          </Button>
                        </Link>
                      )}

                    {card.type === 'recipient' &&
                      user.tipo === 'recipient' && (
                        <Link href={`/campaigns/register/${user.tipo}`}>
                          <Button size="lg" bg="#E76F51" color="white" w="100%">
                            Se Beneficiar
                          </Button>
                        </Link>
                      )}
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Stack>
        </Flex>

        {user.email && (
          <Flex align="center" justify="center" mt="8">
            <Button size="lg" bg="#E76F51" color="white" onClick={onOpen}>
              Minhas campanhas
            </Button>
          </Flex>
        )}
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Minhas Campanhas</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex>
              <Table variant="striped" colorScheme="pink">
                <TableCaption>
                  {`Campanhas que participei como ${
                    (user.tipo === 'creator' && 'criador') ||
                    (user.tipo === 'collaborator' && 'colaborador') ||
                    (user.tipo === 'recipient' && 'beneficiário')
                  }`}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Campanha</Th>
                    <Th>Categoria</Th>
                    <Th>Ativo</Th>
                  </Tr>
                </Thead>
                <Tbody>
                {camps.map((item) =>
                    <tr>
                      <td>{item.nomecamp}</td>
                      <td>{item.descricao}</td>
                      <td>Sim</td>
                    </tr>
                    )}
                </Tbody>
              </Table>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
