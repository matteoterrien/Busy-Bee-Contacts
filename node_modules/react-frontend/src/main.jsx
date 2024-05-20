// src/main.jsx
import MyApp from "./MyApp";
import "./main.css";
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <MyApp />
    </ChakraProvider>
  </React.StrictMode>,
)
