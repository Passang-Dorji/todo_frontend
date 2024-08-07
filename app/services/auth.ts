import { Users } from "../model/user";

export async function userLogin(formdata: Record<string, string>): Promise<{ data: Users[] } | null> {
    try {
        
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            body: JSON.stringify(formdata),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // const text = await response.text();
        const data = await response.json();

        if (!response.ok) {
            console.error(`Request failed with status: ${response.status}`);
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        try {
            // const data = JSON.parse(text);
            return data;
        } catch (err) {
            console.error('Failed to parse JSON:', err.message);
            throw new Error(`Failed to parse JSON: ${err.message}`);
        }
    } catch (err) {
        console.error("Failed to login", err);
        throw new Error("Failed to login");
    }
}
