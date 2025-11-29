'use client'
import { useState } from 'react';
import banner from '../assets/freightshare-banner.png'
import Image from "next/image";
import { useRouter } from 'next/navigation';




export default function Page() {
  const[password, setPassword] = useState('')
  const[email, setEmail] = useState('')
  const[role,setRole] = useState('CUSTOMER')
  const router = useRouter()

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        const res = await fetch('http://localhost:5000/api/auth/login',{
            method:"POST", 
            headers:"Content-Type:application/json", 
            body:JSON.stringify({email,password,role})
        })
        // this json belongs to the fetch function not the express json - both are different 
        const data = res.json()
        // we use res.ok - data.ok nahi - res.ok conatins data ki succesfull hua ki nahi response , data me esa kn hota backend se aata hai 
        if (res.ok){
            localStorage.setItem("token", data.token)
            alert("Login Successful")
        }else{
            //change to data.message - if error 
            alert(data.console.error()|| "Login Failed")
        }

    
    }
    catch{
        console.error(error)
        alert("Something went wrong")

    }


  }

  return (
      <div className="flex h-full w-full  border-black">
          <div className="relative h-screen w-full hidden md:inline-block">
              <Image  src={banner} alt="leftSideImage" fill ={true} />
          </div>
      
          <div className="w-full flex flex-col items-center justify-center bg-white bg-gradient-to-br from-blue-400 via-gray-300 to-orange-300">
      
              <form className="md:w-96 w-80 flex flex-col items-center justify-center h-screen sm:items-center sm:justify-center ">
                  <h2 className="text-4xl text-gray-900 font-medium">Sign in</h2>
                  <p className="text-sm text-gray-900/90 mt-3">Welcome back! Please sign in to continue</p>
      
                  <button type="button" className="w-full mt-8 border border-black  bg-gray-500/10 flex items-center justify-center h-12 rounded-full">
                      <Image src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg" alt="googleLogo" width={80} height={80}/>
                  </button>
      
                  <div className="flex items-center gap-4 w-full my-5">
                      <div className="w-full h-px bg-gray-300/90"></div>
                      <p className="w-full text-nowrap text-sm  font-extralight text-black-500/90">or sign in with email</p>
                      <div className="w-full h-px bg-gray-300/90"></div>
                  </div>
      
                  <div className="flex items-center w-full bg-transparent border border-black-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z" fill="#6B7280"/>
                      </svg>
                      <input type="email" placeholder="Email id"value ={email} onChange={(e)=> setEmail(e.target.value)} className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />                 
                  </div>
      
                  <div className="flex items-center mt-6 w-full bg-transparent border border-black-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                      </svg>
                      <input type="password" placeholder="Password" value ={password} onChange={(e)=> setPassword(e.target.value)} className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full" required />
                  </div>
                  <div className='w-full mt-6'>
                  <label className="text-sm text-gray-900">Login as:</label>
                  <select
                  className='w-full mt-2 border border-gray-400 rounded-full h-10 px-4 text-gray-700 focus:outline-none'
                  value={role}
                  onChange={(e)=>{setRole(e.target.value)}} >
                  <option className=' text-gray-900' value="CUSTOMER">Customer</option>
                  <option className=' text-gray-900' value='DRIVER'>Driver</option>
                  </select>
                  

                  </div>
      
                  <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
                      <div className="flex items-center gap-2">
                          <input className="h-5 border-4 border-black" type="checkbox" id="checkbox" />
                          <label className="text-sm text-black" htmlFor="checkbox">Remember me</label>
                      </div>
                      <a className="text-sm text-black  underline" href="#">Forgot password?</a>
                  </div>
      
                  <button type="submit" className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity">
                      Login
                  </button>
                  <p className="text-gray-500/90 text-sm mt-4">Don’t have an account? <a className="text-indigo-400 hover:underline" href="#">Sign up</a></p>
              </form>
          </div>
      </div>
  );
};