import { useEffect, useState } from 'react';
import API from '../api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const { data } = await API.get(`/users?page=${page}`);
      setUsers(data.users);
      setTotalPages(data.pages);
      setLoading(false);
    } catch (err) {
      alert("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  // Toggle User Status
  const toggleStatus = async (id, currentStatus, name) => {
    if (!window.confirm(`Are you sure you want to ${currentStatus === 'active' ? 'Deactivate' : 'Activate'} ${name}?`)) return;
    
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await API.patch(`/users/${id}/status`, { status: newStatus });
      fetchUsers(); 
    } catch (err) {
      alert("Failed to update status");
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Loading Users...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'left', borderBottom: '1px solid #374151', paddingBottom: '15px', color: 'white' }}>Admin Dashboard</h2>
      
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ fontWeight: '500', color: 'white' }}>{user.fullName}</td>
              <td style={{ color: '#9ca3af' }}>{user.email}</td>
              <td>
                <span style={{ 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  background: user.role === 'admin' ? '#7c3aed' : '#374151', 
                  color: 'white', fontSize: '0.8rem' 
                }}>
                  {user.role.toUpperCase()}
                </span>
              </td>
              <td>
                <span style={{ 
                  color: user.status === 'active' ? '#4ade80' : '#f87171', 
                  fontWeight: '600' 
                }}>
                  {user.status.toUpperCase()}
                </span>
              </td>
              <td>
                {user.role !== 'admin' && (
                  <button 
                    onClick={() => toggleStatus(user._id, user.status, user.fullName)}
                    style={{ 
                      background: 'transparent', 
                      border: `1px solid ${user.status === 'active' ? '#ef4444' : '#22c55e'}`, 
                      color: user.status === 'active' ? '#ef4444' : '#22c55e',
                      padding: '6px 12px', 
                      borderRadius: '6px', 
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.85rem'
                    }}
                  >
                    {user.status === 'active' ? 'Deactivate' : 'Activate'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
          className="btn"
          style={{ width: 'auto', background: page === 1 ? '#374151' : '#7c3aed', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
        >
          Previous
        </button>
        
        <span style={{ color: '#9ca3af', alignSelf: 'center' }}>Page {page} of {totalPages}</span>
        
        <button 
          disabled={page === totalPages} 
          onClick={() => setPage(page + 1)}
          className="btn"
          style={{ width: 'auto', background: page === totalPages ? '#374151' : '#7c3aed', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;