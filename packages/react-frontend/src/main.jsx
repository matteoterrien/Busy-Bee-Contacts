// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import MyApp from './MyApp'
import './main.css'
import './styles.css'
import { AuthProvider } from './AuthProvider'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ChakraProvider resetCSS>
            <AuthProvider>
                <BrowserRouter>
                    <MyApp />
                </BrowserRouter>
            </AuthProvider>
        </ChakraProvider>
    </React.StrictMode>,
)
