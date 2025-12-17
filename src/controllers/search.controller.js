import pool from '../database/database.js';

const searchWord = async (req, res) => {
    const { word } = req.query;

    // Word validation before searching. Front end  also validates.
    if (!word || word.trim() === "") {
        return res.status(400).json({ message : "A word is required"});
    }

    if (word.length > 45) {
        return res.status(400).json({ message : "No word is that long!"});
    }

    try {
        
        // Make fetch request to external dictionary API.

        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);


        // If the word is not found in the external API, return 404, or throw error for other issues.

        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ message: "Word not found" });
            } else {
                throw new Error("Failed to fetch from dictionary API");
            }
        };

        // If word is found, update the database search count, and parse the response data and return it to the front end.

        const data = await response.json();

        await pool.query(
            `INSERT INTO searches (word, count) VALUES (?, 1)
            ON DUPLICATE KEY UPDATE count = count + 1, searchedAt = CURRENT_TIMESTAMP`,
            [word.toLowerCase()]
        );

        return res.status(200).json(data);

    } catch (error) {
        console.error("Error fetching word data:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

};