import React from 'react';
//import { Link } from 'react-router-dom';
import Link from 'next/link';


function openPasswordPrompt() {
  const password = prompt("Please enter the password:");
  if (password === "123") {
    window.location.href = '/api/hello';
  } else {
    alert("Incorrect password.");
  }
}


export const NavigationPage: React.FC = () =>{

    return (
      <div className="flex flex-col items-center justify-center h-52 bg-blue-500 p-4 rounded-lg md:flex-row md:h-32">
      <div className="flex items-center">
        <h2 className="text-white text-3xl font-bold">Car Price Overview</h2>
      </div>
      <div className="flex-grow"></div>
      <div className="text-white self-mid">
        <Link href="/">Home | </Link>
        <Link href="/teslapatent">Patents | </Link>
        <Link href="/teslatech">Notebook | </Link>
        <Link href="#" onClick={openPasswordPrompt}>Test</Link>
      </div>
      <div className="text-white self-end">Design By ZongL</div>
    </div>
    );

}

export default NavigationPage;
    
