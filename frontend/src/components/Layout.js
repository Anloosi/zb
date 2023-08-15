import React from 'react'
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './Header';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Layout() {
  return (
    <div>
    <Header />
    <ToastContainer />
    <Container className='my-2'>
     <Outlet />
     </Container>
    </div>
  )
}

export default Layout;