import React from 'react'
import AppRouter from './component/AppRouter'
import './App.css'
import Navbar from './component/Navbar'
import { Layout } from 'antd'

const App = () => {
  return (
    <Layout>
      <Navbar />
      <AppRouter />
    </Layout>
  )
}

export default App
