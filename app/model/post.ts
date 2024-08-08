export interface Posts{
    id:number
    title:string
    body:string
    user_id:number
}

export interface PostData{
    title:string
    body:string
    user_id:number |undefined
}