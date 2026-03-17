import React, { useEffect, useState } from 'react'
import api from "../api/axios";
import { toast } from 'react-toastify';
const About = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await api.get("/api/user/read");
      console.log(res.data.data);
      localStorage.setItem("user", "Sahil")
      setUsers(res.data.data);
      toast.success("User's fetched successfully!")
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users")
    }
  }
  useEffect(() => { getUsers(); }, []);
  return (
    // <div> <h2>Users</h2>
    //   {users.map((users) => (
    //     <p key={users._id}>
    //       {users.name} {users.age}
    //     </p>
    //   ))}</div>
    <div style={{ padding: '20px' }}>
      <h2>All Users</h2>
      {users && users.length > 0 ? (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Age</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Gender</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.age}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd', textTransform: 'capitalize' }}>{user.gender}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{user.email}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading or no users found...</p>
      )}
    </div>
  );

}

export default About
