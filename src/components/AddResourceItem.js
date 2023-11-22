// AddResourceItem.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddResourceItem = () => {
    const [resourceDetails, setResourceDetails] = useState({
        category: '',
        description: '',
        icon_url: '',
        link: '',
        tag: 'request',
        title: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("NAME", name)
        console.log("VALUE", value)
        setResourceDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assuming other client-side validations here...
        if (!resourceDetails.title || !resourceDetails.link || !resourceDetails.tag) {
            // Show an error toast for required fields
            toast.error('Please fill in all required fields');
            return;
        }


        try {
            // API call (replace with your actual API endpoint)
            const response = await fetch('https://media-content.ccbp.in/website/react-assignment/add_resource.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resourceDetails),
            });

            if (!response.ok) {
                throw new Error('Failed to add resource');
            }

            // Reset form and show success toast
            setResourceDetails({
                category: '',
                description: '',
                icon_url: '',
                link: '',
                tag: 'request',
                title: ''
            });
            toast.success('Resource added successfully');
        } catch (error) {
            // Show failure toast on API failure
            toast.error('Failed to add resource');
        }
    };

    return (
        <div>
            {/* Navbar */}
            <nav>
                <div>
                    <Link to="/">
                        <img src="logo.png" alt="Logo" />
                    </Link>
                </div>
                <div>
                    <button style={{ backgroundColor: 'transparent', border: 0 }}>Profile</button>
                    <Link to="/add-resource">
                        <button className='add-button'>Add Item</button>
                    </Link>
                </div>
            </nav>
            <div style={{ display: 'flex' }}>
                <form style={{ width: '50%', height: 'calc(100vh - 96px)', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={handleSubmit}>
                    <h3 style={{ margin: '5px' }}>Item Details</h3>
                    <br />
                    <label>
                        Item Title:
                        <input style={{ width: '100%', lineHeight: '15px' }} type="text" name="title" value={resourceDetails.title} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Link:
                        <input style={{ width: '100%', lineHeight: '15px' }} type="text" name="link" value={resourceDetails.link} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Icon URL:
                        <input style={{ width: '100%', lineHeight: '15px' }} type="text" name="icon_url" value={resourceDetails.icon_url} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Tag Name:
                        <select
                            style={{ width: '100%', height: '23px' }}
                            name="tag"
                            value={resourceDetails.tag}
                            onChange={handleChange}
                        >
                            <option value="request">Request</option>
                            <option value="user">User</option>
                        </select>
                    </label>

                    <br />
                    <label>
                        Category:
                        <input style={{ width: '100%', lineHeight: '15px' }} type="text" name="category" value={resourceDetails.category} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Description:
                        <textarea name="description" value={resourceDetails.description} onChange={handleChange} />
                    </label>
                    {/* Add other input fields as needed */}
                    <br />
                    <button style={{ padding: '10px', border: 0, borderRadius: '5px', color: 'white', background: '#007aff' }} type="submit">CREATE</button>
                </form>
                <div style={{ width: '50%' }}>
                    <img src="logo.png" alt="Logo" />
                </div>
            </div>


            {/* Toast container from React Toastify */}
            <ToastContainer position="bottom-center" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default AddResourceItem;
