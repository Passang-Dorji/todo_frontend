import { Comments } from "../model/comment"
import { CommentData } from "../model/comment"

 export async function fetchComments(postId:number) {
    const response = await fetch(`http://localhost:4000/api/comments/by_post/${postId}`)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    return await response.json()
  }
  
  


export async function CreateComment(commentData: CommentData): Promise<{ data: Comments[] } | null> {
  const response = await fetch("http://localhost:4000/api/comments", {
    method: 'POST',
    body: JSON.stringify({ comment: commentData }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error("Network response was not okay");
  }

  return await response.json();
}
