import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useBreakpointValue
} from '@chakra-ui/react'
import router from 'next/router'
import { useState } from 'react'
import { api } from '../../../../services/api'

export function NewsLetter() {
  const isSm = useBreakpointValue({ base: false, sm: true })
  const [email, setEmail] = useState('')

  async function handleSubmit() {

    
    const response = await api.post(`http://localhost:8100/email/cadastra_email/${email}`)

    localStorage.setItem('@colabora-ai:campanha', JSON.stringify(response.data))

    alert('E-mail cadastrado com sucesso, logo receberá nossa newsletter!')
    setEmail('')
    router.push('/')
  }

    

  return (
    <Flex py="8" justify="center">
      <Container maxW={isSm ? '65%' : '100%'}>
        <Flex
          bg="#C58A47"
          h={isSm ? '400px' : 'auto'}
          w="100%"
          borderRadius="5px"
          direction={isSm ? 'row' : 'column'}
        >
          <Box position="relative" top="-25px" left="15px">
            <Image src="images/paperplane.svg" />
          </Box>
          <Flex
            direction="column"
            align="center"
            justify="center"
            mt={isSm ? 0 : 4}
            flex="1"
          >
            <Flex
              direction="column"
              w={isSm ? '100%' : '80%'}
              textAlign="center"
            >
              <Heading size={isSm ? 'lg' : 'sm'} color="white">
                FIQUE POR DENTRO DAS NOVIDADES
              </Heading>
              <Text color="white" 
                    mt={isSm ? 2 : 4}
              >
                Cadastre-se na nossa newsletter
              </Text>
            </Flex>
            <Flex
              mt={4}
              py="4"
              direction="column"
              w={isSm ? 'inherit' : '80%'}
              justify="center"
              align="center"
            >
              <Input size={isSm ? 'lg' : 'sm'} 
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
               />
              <Button
                bg="white"
                color="#264653"
                mt="6"
                size={isSm ? 'lg' : 'sm'}
                onClick={handleSubmit}
              >
                cadastrar
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      
    </Flex>
  )
}
