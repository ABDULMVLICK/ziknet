import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useState } from 'react';

const Signup = () => {

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        password: "",
        profession: "",
        type_of_music: "",
    });

    const [message, setMessage] = useState(""); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            console.log('etape1');  
            console.log('Réponse reçue:', response); 
    
            const result = await response.json();
            console.log('Résultat JSON:', result); 
    
            setMessage(result.message); 
    
            console.log('etape2'); 
    
            if (result.message === "Inscription réussie !") {
                setTimeout(() => {
                    navigate("/login"); 
                }, 2000);
            }
    
            console.log('etape3');
    
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setMessage("Une erreur est survenue.");
        }
        
    }

    return (
        <Layout>
            <div className="absolute top-4 left-4">
                <Link to="/">
                    <div className="border border-black p-4">
                        <h1 className="text-3xl font-bold">
                            <span className="text-amber-700">Z I K</span>
                            <span className="text-amber-700">N E T</span>
                        </h1>
                    </div>
                </Link>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen px-4">
                {/* SIGNUP */}
                <h2 className="text-3xl self-center mb-8">SIGN UP</h2>
                
                <div className="bg-amber-800 rounded-3xl p-25 w-full max-w-lg">
                    <div className="space-y-6">
                        <div>
                            <input 
                                type="text" 
                                name='name'
                                placeholder="Name" 
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 rounded-full bg-white text-sm"
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="text" 
                                name='username'
                                placeholder="Username" 
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-3 rounded-full bg-white text-sm"
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="password" 
                                placeholder="Password" 
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 rounded-full bg-white text-sm"
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="text" 
                                placeholder="Profession" 
                                name='profession'
                                value={formData.profession}
                                onChange={handleChange}
                                className="w-full p-3 rounded-full bg-white text-sm"
                            />
                        </div>
                        
                        <div>
                            <select 
                                className="w-full p-3 rounded-full bg-white text-sm appearance-none"
                                name="type_of_music"
                                value={formData.type_of_music}
                                onChange={handleChange}
                                style={{
                                    backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right 15px center",
                                    backgroundSize: "15px"
                                }}
                            >
                                <option value="" disabled selected>Type of music</option>
                                <option value="rock">Rock</option>
                                <option value="pop">Pop</option>
                                <option value="jazz">Jazz</option>
                                <option value="classical">Classical</option>
                                <option value="hip-hop">Hip-Hop</option>
                                <option value="rap">Rap</option>
                                <option value="electronic">Electronic</option>
                                <option value="reggae">Reggae</option>
                                <option value="soul">Soul</option>
                                <option value="folk">Folk</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-center pt-4">
                    
                        <button  type="submit" className="bg-amber-700 mt-9 text-black px-12 py-2 rounded-full w-54">
                            Sign up
                        </button>
                    
                </div>
            </form>
            {message && <p className="mt-4 text-white">{message}</p>}
        </Layout>
    );
}

export default Signup;