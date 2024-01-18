import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const UpdateUser = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState([])

    const { register, watch, reset, handleSubmit, setValue, control, formState: { errors } } = useForm({
    });
    const status = watch('status')

    // get User by id
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user data
                const response = await fetch('http://localhost:3001/getUser/' + params.id);
                const data = await response.json();
                    setUser(data);
                // Set form values
                if (data) {
                    setValue('name', data.name);
                    setValue('salary', data.salary);
                    setValue('contact', data.contact);
                    setValue('relevingdate', data.relevingDate);
                    setValue('joiningDate', data.joiningDate);
                    setValue('dob', data.dob);
                    setValue('status', data.status == "Active" ? true : false);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle error if needed
            }
        };
    
        fetchData();
    }, [params.id, setValue]);
    
    const onSubmit = async (data) => {
        const payload = {
            name: data.name,
            salary: data.salary,
            joiningDate: data.joiningDate,
            relevingDate: data.relevingdate,
            dob: data.dob,
            contact: data.contact,
            status: data.status ? 'Active' : 'Inactive'
        }
        console.log("salary",payload)
        const todo = await fetch('http://localhost:3001/updateUser/' + params.id, {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'content-type': 'application/json'
            }
        })
        toast.success('Successfully saved', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        reset()
        navigate('/')
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
                <div className="first-last">
                    <div style={{ marginRight: '60px' }}>
                        <label style={{ display: 'block' }}>Name</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                {...register("name", { required: true, maxLength: 20 })}
                                style={{ height: "30px", width: '300px', marginBottom: '5px' }}
                            />
                            {errors.name && errors.name.type === "required" && (
                                <span style={{ color: 'red' }}>This is required</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block' }}>Salary</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                {...register("salary", {
                                    required: 'Date of Birth is required'
                                })}
                                style={{ height: "30px", width: '300px', marginRight: '60px' }}
                            />
                            {errors.salary && <span style={{ color: 'red' }}>{errors.salary.message}</span>}
                        </div>
                    </div>

                </div>
                <div className="releving-joining">
                    <div>
                        <label style={{ display: 'block' }}>Joining Date</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input {...register("joiningDate", { required: true, maxLength: 20 })}
                                style={{ height: "30px", width: '300px', marginRight: '60px' }} type="date" />
                            {errors.joiningDate && errors.joiningDate.type === "required" && (
                                <span style={{ color: 'red' }}>This is required</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block' }}>Releving Date</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input {...register("relevingdate", { required: true })} type='date'
                                style={{ height: "30px", width: '300px' }}
                            />
                            {errors.relevingdate && errors.relevingdate.type === "required" && (
                                <span style={{ color: 'red' }}>This is required</span>
                            )}
                        </div>
                    </div>

                </div>

                <div className="contact-dob">
                    <div>
                        <label style={{ display: 'block' }}>Date of birth</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                type="date"
                                {...register("dob", {
                                    required: 'Date of Birth is required'
                                })}
                                style={{ height: "30px", width: '300px', marginRight: '60px' }}
                            />
                            {errors.dob && <span style={{ color: 'red' }}>{errors.dob.message}</span>}
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block' }}>Contact </label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <input
                                {...register("contact", {
                                    required: true
                                })}
                                style={{ height: "30px", width: '300px', marginRight: '60px' }}
                            />
                            {errors.contact && <span style={{ color: 'red' }}>{errors.contact.message}</span>}
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '20px', display: 'flex' }}>
                    <div>
                        <input {...register("status")}
                            type="checkbox"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 700 }}>{status ? 'Active' : 'Inactive'}</label>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }} className="submit">
                <button type="submit">Submit</button>
            </div>
            <ToastContainer />
        </form>
    )
}
