import React, { useEffect,useState } from 'react';
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import axios from 'axios';

export default function Home() {
    const { user } = useAuth();
    const getUser = useUser();
    const [balence ,setBalence] = useState();
    const token = localStorage.getItem("access-token");

    useEffect(() => {
        getUser();

        const fetchData = async () => {
            if (!token) {
                console.error("No access token found.");
                return;
            }

            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/auth/wallet-balance",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log("API Response:", response.data);
                setBalence(response.data.balance
                )

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData(); // Invoke the fetchData function

    }, [getUser, token]); // Added getUser and token to dependency array

    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email ? `List user Ethereum balance is ${balence}` : 'Please login first'}
                    </div>
                </div>
            </h2>
        </div>
    );
}
