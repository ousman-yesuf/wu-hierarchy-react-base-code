import { Link } from 'react-router-dom';

const Sidebar = () => (
  <nav className="w-64 bg-gray-800 p-4 text-white">
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/add">Add Node</Link></li>
    </ul>
  </nav>
);

export default Sidebar;
