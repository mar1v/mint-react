import React from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { Layout } from 'antd'
import AppRouter from './component/AppRouter'

const App = () => {
  return (
    <Layout>
      <Navbar />
      <AppRouter />
    </Layout>
  )
}

export default App
