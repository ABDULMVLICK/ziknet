import React from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import { useState } from 'react';


const  Homes = () => {

    const [searchQuery, setSearchQuery] = useState('');
    
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
            
            
            <div className="flex justify-center items-center h-64  border-stone-500 rounded-lg">
              <p className="text-xl text-stone-600 font-medium">

                listes des musiciens
              </p>
            </div>
          </div>

         <div className="mt-4 mb-8">
            <Link to="/login">
          <button className="bg-stone-200 text-center w-25 py-4 rounded-md font-serif text-xl">
            Logout
          </button>
          </Link>
        </div> 
         
        </div>
      </Layout>
    );
};

export default Homes;