// Home.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [resources, setResources] = useState([]);
    const [filteredResources, setFilteredResources] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const fetchResources = async () => {
        try {
            const response = await fetch('https://media-content.ccbp.in/website/react-assignment/resources.json');
            const data = await response.json();
            console.log(data)
            setResources(data || []);
            setFilteredResources(data || []);
        } catch (error) {
            console.error('Error fetching resources:', error);
        }
    };

    useEffect(() => {
        fetchResources();
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        filterResources(tab, searchTerm);
    };

    const filterResources = (tab, term) => {
        let filtered = resources;

        if (tab !== 'all') {
            filtered = resources.filter((resource) => resource.tag === tab);
        }

        if (term) {
            filtered = filtered.filter((resource) => resource.category.toLowerCase().includes(term.toLowerCase()));
        }

        setFilteredResources(filtered);
    };

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        filterResources(activeTab, term);
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

            {/* Tabs */}
            <div className='tabs'>
                <button style={{ padding: '10px', border: 0, borderRadius: '2px', width: '20%', background: activeTab === 'all' ? '#007aff' : 'lightgrey', color: activeTab === 'all' ? 'white' : 'black' }} onClick={() => handleTabChange('all')}>All Resources</button>
                <button style={{ padding: '10px', border: 0, borderRadius: '2px', width: '20%', background: activeTab === 'request' ? '#007aff' : 'lightgrey', color: activeTab === 'request' ? 'white' : 'black' }} onClick={() => handleTabChange('request')}>Requests</button>
                <button style={{ padding: '10px', border: 0, borderRadius: '2px', width: '20%', background: activeTab === 'user' ? '#007aff' : 'lightgrey', color: activeTab === 'user' ? 'white' : 'black' }} onClick={() => handleTabChange('user')}>Users</button>
            </div>

            {/* Search bar */}
            <div style={{ padding: '3% 6%' }}>
                <input type="text" style={{ lineHeight: '25px', width: '50%' }} placeholder="Search" onChange={handleSearch} />
            </div>

            {/* Resource Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '6%', paddingTop: 0 }}>
                {filteredResources.map((resource) => (
                    <div key={resource.id} style={{ flexBasis: '30%', margin: '1%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            height: '200px', // Set the fixed height of the card
                            width: '250px', // Set the fixed width of the card
                            border: '1px solid #ddd', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', margin: '10px'
                        }}>
                            {/* 1st row */}
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                <img src={resource.icon_url} alt={resource.title} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                <div>
                                    <h3 style={{ margin: 0 }}>{resource.category}</h3>
                                    <p style={{ margin: 0 }}>{resource.title}</p>
                                </div>
                            </div>

                            {/* 2nd row */}
                            <p style={{ marginBottom: '10px' }}>
                                <a href={resource.link} target="_blank" rel="noopener noreferrer">{resource.link}</a>
                            </p>

                            {/* 3rd row */}
                            <p style={{
                                marginBottom: '10px', height: '80px',
                                overflowY: 'auto', // Enable vertical scrollbar if content overflows
                            }}>{resource.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
