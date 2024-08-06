"use client"
import { useState ,useEffect} from "react"
import fetchPost from "@/app/services/post"
import { Posts } from "@/app/model/post"
export default function getPosts(){
  const [posts,setPosts] = useState<Posts[]>([])
  useEffect(()=>{
    async function loadUser() {
      try{
        const data = await fetchPost()
        setPosts(data.data)
        console.log(data)
      }catch (error){
        console.error('Error fetching',error)
      }  
    }
    loadUser()
    
  },[])
  return (
    <div className="flex justify-center bg-purple-400 min-h-screen py-8">
      <div className="bg-purple-500 w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-white text-center mb-6">Posts</h1>
        {posts.map(post => (
          <div key={post.id} className="bg-amber-200 mb-4 p-4 rounded-xl shadow-md">
            <h2 className="text-2xl text-black mb-2">{post.title}</h2>
            <p className="text-black text-lg">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}