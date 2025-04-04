
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';


export default function LandingPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        
        <div className="border border-black p-4 mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-amber-700">Z I K</span><br/>
            <span className="text-amber-700">N E T</span>
          </h1>
        </div>
        
        
        <div className="text-center mb-12 max-w-3xl font-jaquard text-sm">
          <h2 className="text-xl mb-2 tracking-wide">Welcome to ZIK-NETWORK!</h2>
          <p className="tracking-wide mb-2">ZIK-NETWORK is the ultimate platform for musicians worldwide.</p>
          <p className="tracking-wide mb-4">
            Whether you're an instrumentalist, singer, producer, or simply a music enthusiast,
            connect with artists who share your musical taste. Find collaborations, exchange ideas,
            and grow your music network effortlessly. Join the community and let your talent shine! 
            <span className="ml-2">🎵✨</span>
          </p>
        </div>
        
        {/* Boutons d'action */}
        <div className="flex flex-wrap justify-center gap-8 w-full max-w-xl">
        <Link to="/Login" >  <button className="bg-stone-200 text-black px-12 py-2 rounded-full font-jaquard w-48">
            login
          </button>
        </Link>
        <Link to="/Signup" >
          <button className="bg-stone-200 text-black px-12 py-2 rounded-full font-jaquard w-48">
            Sign up
            </button>
        </Link>

        </div>
      </div>
    </Layout>
  );
}