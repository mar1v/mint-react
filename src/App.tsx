import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { Layout } from 'antd'
import AppRouter from './components/AppRouter'

const App = () => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  )
}

export default App
