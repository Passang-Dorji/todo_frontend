import { Posts } from "../model/post";

const fetchPost= async():Promise<{data: Posts[]}>=>{
    const response = await fetch("http://localhost:4000/api/posts")
    if(!response.ok){
        throw new Error("failed to fetch")
    }
    return response.json()
}
export default fetchPost