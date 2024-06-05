import {
    Center,
    ChakraProvider,
    Stack,
    Button,
    Box
} from '@chakra-ui/react'

function SignUpError() {

    return (
        <ChakraProvider resetCSS>
            <Center h="100vh" className="border" >
                <Stack boxShadow="md" bg="white" p="20" rounded="md" alignContent="center">
                
                    <h4>Email already in Use.</h4>
                    <Button  colorScheme="purple" variant="link">
                            Login here.
                        </Button>
                </Stack>
            </Center>
        </ChakraProvider>
    )
}
export default SignUpError;