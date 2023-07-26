import React from 'react'
import StandardLayout from "../components/layout/StandardLayout";
import { useAuth } from '../pages/AuthContext';

function Home() {
  const { userName,isLoggedIn } = useAuth();

  return (
    <StandardLayout>
     
      <div className='mt-10 h-screen'>
      <div className="container mx-auto py-8">
          <h1 className="text-3xl font-semibold mb-4">Welcome, {userName}</h1>
          {/* Rest of your home page content */}
    </div> 
      </div>

    </StandardLayout>
   
  )
}

export default Home