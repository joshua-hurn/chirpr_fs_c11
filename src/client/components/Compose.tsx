import React, { useState, useEffect } from 'react'

const Compose: React.FC = () => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const submitChirp = async () => {
        try {
            let submissionAttempt = await fetch("/api/chirps", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, content })
            });

            const response = await submissionAttempt.json();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container p-4">
            <input type="text" name="user" id="name-input" placeholder="who are you?" value={name} onChange={(e) => setName(e.target.value)} />
            <textarea name="chirp" id="chirp-input" cols={30} rows={10} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            <input type="submit" value="Submit" onClick={submitChirp} />
        </div>
    )
}

export default Compose