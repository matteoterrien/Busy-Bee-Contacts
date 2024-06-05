import {
    Center,
    ChakraProvider,
    Stack,
    Button,
    Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function InvalidInputError() {
    const navigateTo = useNavigate()
    
    return (
        <ChakraProvider resetCSS>
            <Center h="100vh" className="border" >
                <Stack boxShadow="md" bg="white" p="20" rounded="md" alignContent="center">
                
                    <h4>Invalid Input. Please fill out all fields. </h4>
                    <Button  colorScheme="purple" variant="link" onClick={() => navigateTo('/login')}>
                            Login
                        </Button>
                </Stack>
            </Center>
        </ChakraProvider>
    )
}
export default InvalidInputError;