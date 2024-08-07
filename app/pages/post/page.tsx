
"use client";
import { useState, useEffect, useContext } from "react";
import fetchPost from "@/app/services/post";
import { fetchComments, CreateComment } from "@/app/services/comment";
import { Posts } from "@/app/model/post";
import { fetchUsers } from "@/app/services/user"; 
import { Users } from "@/app/model/user";

import { Comments } from "@/app/model/comment";
import { UserContext } from "@/app/state/user-context";

export default function GetPosts() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [newComments, setNewComments] = useState<{ [key: number]: string }>({});
  const context = useContext(UserContext);
 const [users, setUsers] = useState<Users[]>([]); // State to store user data


  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchPost();
        console.log(data,"my post")
        setPosts(data.data);
      } catch (error) {
        console.error("Error fetching posts", error);
      }
    }
    loadPosts();
  }, []);

  useEffect(() => {
    async function loadComments() {
      if (selectedPostId !== null) {
        try {
          const data = await fetchComments(selectedPostId);
          setComments(data.data);
        } catch (error) {
          console.error("Error fetching comments", error);
        }
      }
    }
    loadComments();
  }, [selectedPostId]);
  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }
    loadUsers();
  }, []);

  const handleCreateComment = async (postId: number) => {
    const newComment = newComments[postId];
    if (postId !== null && newComment.trim() !== "") {
      const commentData = {
        user_id: context.user?.id,
        post_id: postId,
        content: newComment,
      };
      try {
        await CreateComment(commentData);
        setNewComments((prevComments) => ({ ...prevComments, [postId]: "" }));
        // Reload comments after creating a new one
        const data = await fetchComments(postId);
        setComments(data.data);
      } catch (error) {
        console.error("Error creating comment", error);
      }
    }
  };

  const handleCommentChange = (postId: number, comment: string) => {
    setNewComments((prevComments) => ({ ...prevComments, [postId]: comment }));
  };
const getUsername = (userId: number): string => {
  const user = users.find(user => user.id === userId);
  return user ? user.name : "Unknown Users";
};

  return (
    <div className="flex justify-center bg-purple-400 min-h-screen py-8">
      <div className="bg-purple-500 w-11/12 md:w-2/3 lg:w-1/2 rounded-lg shadow-lg p-6">
        <h1 className="text-3xl text-white text-center mb-6">Posts</h1>
        <h1 className="text-3xl text-white text-center mb-6">{context.user?.email}</h1>

        {posts.map((post) => (
          <div key={post.id} className="bg-amber-200 mb-4 p-4 rounded-xl shadow-md">
            <h2 className="text-2xl text-black mb-2 border-2 bg-purple-200 w-1/3 rounded-2xl pl-4">
              {post.title}
            </h2>
            <div className="flex justify-between">
              <p className="text-black text-lg">{post.body}</p>
              <p className="text-black text-lg">Author: {getUsername(post.user_id)}</p>
              <button
                className="bg-cyan-400 border-2 border-black rounded-lg px-2"
                onClick={() => setSelectedPostId(post.id)}
              >
                comment
              </button>
            </div>

            {selectedPostId === post.id && (
              <div className="mt-4">
                <h3 className="text-xl text-blue-500 mb-2">Comments:</h3>
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-white p-2 rounded-md mb-2 shadow-sm">
                    <p className="text-black">{comment.content}</p>
                  </div>
                ))}
                <div>
                  <textarea
                    className="w-full p-2 rounded-md text-black"
                    placeholder="Add comments"
                    value={newComments[post.id] || ""}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                  />
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleCreateComment(post.id)}
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


