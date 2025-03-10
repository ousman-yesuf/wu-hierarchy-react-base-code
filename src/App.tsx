import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddHierarchy from './pages/AddHierarchy';
import EditHierarchy from './pages/EditHierarchy';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<AddHierarchy />} />
              <Route path="/edit/:id" element={<EditHierarchy />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
