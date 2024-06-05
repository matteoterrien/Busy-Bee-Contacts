import {
    Center,
    ChakraProvider,
    Stack,
    Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function LoginError() {
    const navigateTo = useNavigate()

    return (
        <ChakraProvider resetCSS>
            <Center h="100vh" className="border" >
                <Stack boxShadow="md" bg="white" p="20" rounded="md"alignContent="center">
                
                    <h4>Wrong password or email.</h4>
                    <Button  colorScheme="purple" variant="link" onClick={() => navigateTo('/login')}>
                            Please try again.
                        </Button>
                </Stack>
            </Center>
        </ChakraProvider>
    )
}
export default LoginError;