import { useState } from "react";

export default function PlayerSetup({ onPlayerSet }) {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Clear previous errors
        setError('');

        //Validate name
        if (!name.trim()) {
            setError('Please ender your name');
            return;
        }

        //Set loading state
        setLoading(true);

        try {
            //call backend api
            const response = await fetch('http://localhost:3000/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: name.trim() })
            });

            const data = await response.json();

            if (data.success) {
                // Save to local storage
                localStorage.setItem('playerId', data.player.id);
                localStorage.setItem('playerName', data.player.name);

                //Call parent callback with playerdata
                onPlayerSet(data.player);

                console.log('✓ Player created:', data.player);
            } else {
                //Handle api error
                setError(data.error || "failed to create player")
            }
        } catch (err) {
            console.error('Error creating player:', err);
            setError('Could not connect to the server. Make the backend running');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="player-setup">
div
        </div>
    )
