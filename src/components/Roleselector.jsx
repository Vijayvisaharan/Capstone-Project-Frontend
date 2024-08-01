import { useState } from 'react'
import React from 'react'

function Roleselector() {
  const [selectedRole, setSelectedRole] = useState('');
  // const navigate = useNavigate();
  const handleRoleChange = (role) => {
    setRole(role);
  }
  return (
    <div className="role-selector">

      <div className="role-options ">
        <button
          className={`role-button ${selectedRole === 'Admin' ? 'active' : ''} btn btn-primary m-2 `}
          onClick={() => handleRoleChange('Admin')}
        >
          Admin
        </button>
        <button
          className={`role-button ${selectedRole === 'User' ? 'active' : ''}btn btn-primary m-2`}
          onClick={() => handleRoleChange('User')}
        >
          User
        </button>
      </div>
    </div>
  )
}


export default Roleselector
