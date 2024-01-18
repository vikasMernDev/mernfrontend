import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';

export default function Home() {
    const [todos, setTodos] = React.useState([])

    // get all todos list
    const getTodos = () => {
        fetch('http://localhost:3001/list')
            .then(res => res.json())
            .then(data => setTodos(data))
    }

    // delete todo
    const deleteUser = (id) => {
        try {
            fetch('http://localhost:3001/deleteUser/' + id, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })

            toast.success('Successfully Deleted', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            getTodos()
        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div className='table-wrap'>
            <div className=''>
                <div className='topbar'>
                    <div>
                        <h2>Employee Management</h2>
                    </div>
                    <div className='add-btn'>
                        <Link to={'/create-user'}>
                            <button>
                                Add New Employee
                            </button>
                        </Link >
                    </div>
                </div>
                <div className='list-heading'>
                    <h2>Employee List</h2>
                </div>
            </div>
            <div className=''>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Contact</td>
                            <td>Salary</td>
                            <td>DOB</td>
                            <td>Joiniing Date</td>
                            <td>Releving Date</td>
                            <td>Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.contact}</td>
                                        <td>{item.salary}</td>
                                        <td>{item.dob}</td>
                                        <td>{item.joiningDate}</td>
                                        <td>{item.relevingDate}</td>
                                        <td>{item.status}</td>
                                        <td style={{display:'flex'}}>
                                            <div>
                                                <Link to={`/update-user/${item._id}`}>
                                                    <EditIcon />
                                                </Link>
                                            </div>
                                            <div onClick={(e) => deleteUser(item._id)}>
                                                <DeleteIcon />
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    )
}
