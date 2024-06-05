import {
    Center,
    ChakraProvider,
    Stack,
    Button,
} from '@chakra-ui/react'

function LoginError() {

    return (
        <ChakraProvider resetCSS>
            <Center h="100vh" className="border" >
                <Stack boxShadow="md" bg="white" p="20" rounded="md"alignContent="center">
                
                    <h4>Wrong password or email.</h4>
                    <Button  colorScheme="purple" variant="link">
                            Please try again.
                        </Button>
                </Stack>
            </Center>
        </ChakraProvider>
    )
}
export default LoginError;