import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Musician from '../components/Musician';



const Homes = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [musicians, setMusicians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    

    useEffect(() => {


        const fetchMusicians = async () => {
            try {
                const response = await fetch('http://localhost:8080/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (data.status === 'success' && Array.isArray(data.users)) {
                    setMusicians(data.users);
                } else if (data.status === 'error') {
                    setError(data.message || 'Error fetching musicians');
                } else {
                    setError('Unexpected response format');
                }

                console.log("ok");
                

                setLoading(false);
            } catch (error) {
                setError(error.message || 'Failed to fetch musicians data');
                setLoading(false);
                console.error('Fetch error:', error);
            }
        };

        fetchMusicians();
    }, []);

   

    // Filtrage en fonction de la recherche
    const filteredMusicians = musicians.filter((musician) =>
        musician.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Layout>
            <div className="p-2">
                <div className="text-xs text-stone-500 ml-3 mb-1">home</div>

                <div className="flex items-center justify-between bg-stone-200 rounded-lg p-3">
                    <Link to="/">
                        <div className="border border-black p-4">
                            <h1 className="text-3xl font-bold">
                                <span className="text-amber-700">Z I K</span>
                                <span className="text-amber-700">N E T</span>
                            </h1>
                        </div>
                    </Link>

                    <div className="font-serif text-xl">Welcome </div>

                    <div className="flex items-center">
                        <input 
                            type="text" 
                            className="rounded-full px-4 py-1 mr-2 w-40 bg-white border border-stone-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                        />
                        <div className="flex gap-3">
                            <button className="text-xl">🔍</button>
                            <button className="text-xl">💬</button>
                            <button className="text-xl">👤</button>
                        </div>
                    </div>
                </div>

                <div className="mt-2 bg-stone-400 rounded-lg p-8">
                    <h1 className="text-center font-serif text-4xl mb-12 tracking-wide uppercase">All Vibes Musicians</h1>

                    
                    <div className="musicians-list-container">
                        {loading ? (
                            <div className="text-center p-4">Loading musicians...</div>
                        ) : error ? (
                            <div className="text-center p-4 text-red-500">{error}</div>
                        ) : filteredMusicians.length === 0 ? (
                            <div className="text-center p-4">No musicians found</div>
                        ) : (
                            <div className="musicians-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {filteredMusicians.map((musician, index) => (
                                    <Musician
                                        key={musician.id || index}
                                        name={musician.name || "Lucky luc"}
                                        profession={musician.profession || "Music producer"}
                                        musicType={musician.type_of_music || "Jazz"}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-4 mb-8">
                    <Link to="/login">
                        <button  className="bg-stone-200 text-center w-25 py-4 rounded-md font-serif text-xl">
                            Logout
                        </button>
                    </Link>
                </div> 
            </div>
        </Layout>
    );
};

export default Homes;
