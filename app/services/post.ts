import { Posts, PostData } from "../model/post";


export const fetchPost= async():Promise<{data: Posts[]}>=>{
    const response = await fetch("http://localhost:4000/api/posts")
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    return response.json()
}


export const createPost= async(postData:PostData):Promise<{data: Posts[]}>=>{
    const response = await fetch("http://localhost:4000/api/posts",{
        method: "POST",
        body: JSON.stringify({ post: postData }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    const data = await response.json()
    return data
}
