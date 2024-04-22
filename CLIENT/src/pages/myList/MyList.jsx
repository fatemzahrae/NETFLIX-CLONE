import React from 'react'
import axios from "axios"
import { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import "./myList.css"


export default function MyList() {
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        // Fetch saved items for the current user when component mounts
        const fetchSavedItems = async () => {
            try {
                const response = await axios.get('/my-list');
                
                setSavedItems(response.data);
            } catch (error) {
                console.error('Error fetching saved items:', error);
            }
        };
        
        fetchSavedItems();
    }, []);

    return (

        <div className='myList'>
            <Navbar />            
            <div className="container1">
                <h2>My List</h2>
                <ul>
                    {savedItems.map(item => (
                        <li key={item._id}>{item.movieId.title}</li> // Assuming movieId has a title field
                    ))}
                  
                </ul>
            </div>
        </div>
    );
};
