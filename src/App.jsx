import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Leftmenu from './components/LeftMenu';
import Header from './components/Header';
import Product3 from './pages/product3';
import Product2 from './pages/product2';
function App() {
  return (
    <div className="App">
      <Header />
      <div className='flex'>
        <Leftmenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product2" element={<Product2 />} />
          <Route path='/product3' element={<Product3 />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;
