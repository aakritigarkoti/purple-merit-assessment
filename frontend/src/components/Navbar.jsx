import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <div className="nav-brand">Purple Merit</div>
      <div className="nav-links">
        {role === 'admin' && <Link to="/admin" className="nav-link">Dashboard</Link>}
        <Link to="/profile" className="nav-link">Profile</Link>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;