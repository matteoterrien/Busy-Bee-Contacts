import {
    Center,
    ChakraProvider,
    Input,
    Stack,
    Button,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigateTo = useNavigate()

    return (
        <ChakraProvider resetCSS>
            <Center h="100vh" className="border" >
                <Stack boxShadow="md" bg="white" p="20" rounded="md"alignContent="center">
                <h4>We will send you an email with instructions for account recovery. Please check your inbox.</h4>
                <Input
                    bg="lightgrey"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                        setCreds({ ...creds, username: e.target.value })
                    }
                />
                    <Button className="but" onClick={() => navigateTo('/login')}>
                            Submit
                        </Button>
                </Stack>
            </Center>
        </ChakraProvider>
    )
}
export default ForgotPassword;