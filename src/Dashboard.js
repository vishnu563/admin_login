import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: '',
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    createDate: new Date().toLocaleDateString()
  });

  const [isEditing, setIsEditing] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "User";

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  function handleInputChange(e) {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setNewEmployee({ ...newEmployee, [name]: files[0] });
    } else if (type === 'checkbox') {
      if (checked) {
        setNewEmployee(prevState => ({
          ...prevState,
          course: [...prevState.course, value]
        }));
      } else {
        setNewEmployee(prevState => ({
          ...prevState,
          course: prevState.course.filter(course => course !== value)
        }));
      }
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (newEmployee.course.length === 0) {
      alert('Please select at least one course');
      return;
    }

    if (newEmployee.name && newEmployee.email) {
      if (isEditing !== null) {
        const updatedEmployees = employees.map(employee => 
          employee.id === isEditing ? { ...employee, ...newEmployee } : employee
        );
        setEmployees(updatedEmployees);
        setIsEditing(null);
      } else {
        const nextId = employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1;
        setEmployees([...employees, { ...newEmployee, id: nextId }]);
      }
      setNewEmployee({
        id: '',
        name: '',
        email: '',
        mobile: '',
        designation: '',
        gender: '',
        course: [],
        createDate: new Date().toLocaleDateString()
      });
      setShowForm(false);
    } else {
      alert('Please fill all required fields');
    }
  }

  function addEmployee() {
    setShowForm(true);
  }

  function handleLogout() {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate('/');
    }
  }

  function handleDelete(id) {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
  }
  

  function handleEdit(employee) {
    setNewEmployee(employee);
    setIsEditing(employee.id);
    setShowForm(true);
  }
  function handleCancel() {
    setNewEmployee({
      id: '',
      name: '',
      email: '',
      mobile: '',
      designation: '',
      gender: '',
      course: [],
      createDate: new Date().toLocaleDateString()
    });
    setShowForm(false);
    setIsEditing(null);
  }

  return (
    <>
      <header className='dashHead'>
        <h2>Dash Board</h2>
        <nav className='navBar'>
          <ol>
            <li>Home</li>
            <li>Employee List</li>
          </ol>
          <ul>
            <li>{username}</li>
            <li className='logout' onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
        {!showForm && <p className='count'>Total Count : {employees.length}</p>}
        <button className='createButton' onClick={addEmployee}>Create Employee +</button>
      </header>

      <main>
        {!showForm && employees.length === 0 ? (
          <h2 className='dashh2'>Welcome Admin Panel!</h2>
        ) : (
          <div>
            {showForm ? (
              <div className='forms'>
                <div className="employee-form">
                  <h3 className='headEmp'>{isEditing ? "Edit Employee" : "Add New Employee"}</h3>
                  <form onSubmit={handleFormSubmit}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={newEmployee.name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={newEmployee.email}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile"
                      value={newEmployee.mobile}
                      onChange={handleInputChange}
                      maxLength={10}
                      pattern="\d*"
                      required
                    />

                    <div className='desig'>
                      <select name="designation" value={newEmployee.designation} onChange={handleInputChange} required>
                        <option value="" disabled>Designation</option>
                        <option value="HR">HR</option>
                        <option value="Sales">Sales</option>
                        <option value="Manager">Manager</option>
                      </select>
                    </div>
                    <label className='gender'>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={newEmployee.gender === 'Male'}
                        onChange={handleInputChange}
                        required
                      />
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={newEmployee.gender === 'Female'}
                        onChange={handleInputChange}
                        required
                      />
                      Female
                    </label>
                    <div className='course' required>
                      <label>
                        <input
                          type="checkbox"
                          name="course"
                          value="MCA"
                          checked={newEmployee.course.includes('MCA')}
                          onChange={handleInputChange}
                        />
                        MCA
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="course"
                          value="BCA"
                          checked={newEmployee.course.includes('BCA')}
                          onChange={handleInputChange}
                        />
                        BCA
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="course"
                          value="BSC"
                          checked={newEmployee.course.includes('BSC')}
                          onChange={handleInputChange}
                        />
                        BSC
                      </label>
                    </div>
                    <button type="submit">{isEditing ? "Update" : "Submit"}</button>
                    <button type="button" onClick={handleCancel}>Cancel</button> 
                  </form>
                </div>
              </div>
            ) : (
              employees.length > 0 && (
                <table className='tab'>
                  <thead>
                    <tr>
                      <th>Employee Id</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile Number</th>
                      <th>Designation</th>
                      <th>Gender</th>
                      <th>Course</th>
                      <th>Create Date</th>
                      <th colSpan={2}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.mobile}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.course.join(', ')}</td>
                        <td>{employee.createDate}</td>
                        <td>
                          <button onClick={() => handleEdit(employee)}>Edit</button>
                        </td>
                        <td>
                          <button onClick={() => handleDelete(employee.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        )}
      </main>
    </>
  );
}

export default Dashboard;
