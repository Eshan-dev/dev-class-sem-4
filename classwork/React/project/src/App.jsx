import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ContactForm } from './components/ContactForm'
import { TopBar } from './components/TopBar'

function App() {

  return (
    <>
    <TopBar></TopBar>
    <ContactForm></ContactForm>
    </>
  )
}

export default App
