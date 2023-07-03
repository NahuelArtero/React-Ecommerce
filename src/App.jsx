import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './Views/Home';
import Register from './Views/Register';
import Login from './Views/Login';
import NavBar from './Components/Navbar/NavBar';
import ProductDetails from './Views/ProductDetails';
import Error from './Views/Error';
import { Container } from 'react-bootstrap'
import NewProduct from './Views/NewProduct';
import EditProduct from './Views/EditProduct';
import AuthProvider from './Context/AuthContext';
import Footer from './Components/Footer/Footer';



function App() {
  return (
    <div style={{ backgroundImage: 'url(/8997264.jpg)' }}>
    <Router>
      <AuthProvider>
      <NavBar />
      <Container>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/new' element={<NewProduct />} />
          <Route path='/product/edit/:id' element={<EditProduct />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Container>
      <Footer />
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
