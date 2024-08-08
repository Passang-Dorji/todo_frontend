export interface Comments{
    id:number
    content:string
    post_id:number
    userId:number
}

export interface CommentData {
    user_id: number | undefined;
    post_id: number;
    content: string;
  }