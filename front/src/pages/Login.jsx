import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Layout from '../components/Layout';


const Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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
            const response = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            console.log('etape1');
            console.log('Réponse reçue:', response);
    
           
            const result = await response.json();
            setMessage(result.message);
    
            console.log('Résultat JSON:', result);
            console.log('etape2');
    
            if (result.status === "success") {
                console.log("Redirection vers Home...");
                setTimeout(() => {
                    navigate("/home");
                }, 2000);
            }
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
            setMessage("Une erreur est survenue.");
        }
    };
    
    return (
        <Layout>
            
            <div className="absolute top-4 left-4">
                <Link to="/">
                    <div className="border border-black p-4">
                        <h1 className="text-3xl font-bold">
                            <span className="text-amber-700">Z I K</span><br/>
                            <span className="text-amber-700">N E T</span>
                        </h1>
                    </div>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen px-4">
                {/* LOGIN */}
                <h2 className="text-3xl self-center mb-8">LOGIN</h2>
                
                
                <div className="bg-amber-800 rounded-3xl p-25 w-full max-w-lg">
                    <div className="space-y-6">
                        <div>
                            <input 
                                type="text" 
                                name="username"
                                onChange={handleChange}
                                value={formData.username}
                                placeholder="Username" 
                                className="w-full p-3 rounded-full bg-white text-sm"
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="password" 
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                                placeholder="Password" 
                                className="w-full p-3 rounded-full bg-white text-sm"
                            />
                        </div>
                    </div>
                </div>
                
                
                <div className="flex justify-center pt-4">
                    
                        <button type='submit' className="bg-amber-700 mt-9 text-black px-12 py-2 rounded-full w-54">
                            Connect
                        </button>
                    
                </div>
            </form>
        </Layout>
    );
};

export default Login;