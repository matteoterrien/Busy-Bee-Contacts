// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import MyApp from './MyApp'
import './main.css'
import './styles.css'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ChakraProvider resetCSS>
            <BrowserRouter>
                <MyApp />
            </BrowserRouter>
        </ChakraProvider>
    </React.StrictMode>,
)
