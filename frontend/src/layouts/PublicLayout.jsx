import { Outlet } from 'react-router-dom'

import { Container } from 'react-bootstrap'

import Header from '../components/Header'
import Footer from '../components/Footer'

import FloatingButtons
  from '../components/FloatingButtons'

const PublicLayout = () => {
  return (
    <>
      <Header />

    <main>
  <Outlet />
</main>

      <Footer />
       <FloatingButtons />
    </>
  )
}

export default PublicLayout