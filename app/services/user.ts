// import { Users } from "../model/user";
// export async function fetchUser(): Promise<{data: Users[]}> {
//     const response = await fetch('http://localhost:4000/api/users')
//     if(!response.ok){
//         throw new Error("failed to fetch")
//     }
//     return response.json()
// }

// const fetchUser = async()=>{

// }
// export default fetchUser


import { Users } from "@/app/model/user";

export async function fetchUsers(): Promise<Users[]> {
  const response = await fetch("http://localhost:4000/api/users");
  if (!response.ok) {
    throw new Error("Network response was not okay");
  }
  const responseData = await response.json();
  return responseData.data; // Extracting the data array from the response
}
