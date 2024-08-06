"use client";
import { useState } from "react";
import { userLogin } from "@/app/services/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router= useRouter()
    async function handleLogin() {
        if (!formData.name || !formData.email) {
            setError("Name and email are required.");
            setSuccess("");
            return;
        }

        try {
            const response = await userLogin({ ...formData });
            if (response) {
                setSuccess("Login successful!");
                setError(""); // Clear any previous error messages
                console.log(response);
                router.push("/")
            }
        } catch (err) {
            setError("Failed to login. Please check your credentials.");
            setSuccess(""); // Clear any previous success messages
            console.error(err);
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-300">
            <div className="bg-purple-500 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <input
                    className="text-black w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    className=" text-black w-full mb-4 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <button
                    className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onClick={handleLogin}
                >
                    Login
                </button>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                {success && <p className="text-green-500 text-center mt-4">{success}</p>}
            </div>
        </div>
    );
}
