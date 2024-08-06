"use client"
import { useState ,useEffect} from "react"
import { fetchUser } from "./services/user"
import type { Users } from "./model/user"
export default function getUsers(){
  const [users,setusers] = useState<Users[]>([])
  useEffect(()=>{
    async function loadUser() {
      try{
        const data = await fetchUser()
        setusers(data.data)
        console.log(data)
      }catch (error){
        console.error('Error fetching',error)
      }  
    }
    loadUser()
    
  },[])
  return (
    <div className=" mt-4 ml-4 bg-purple-500">
    { users.map(user =>(
      <div key={user.id}>
        <p className="text-black text-xl"> {user.name}</p>
        <p className="text-black text-xl"> {user.email}</p>
      </div>
    )
    )}
    </div>
  )
}