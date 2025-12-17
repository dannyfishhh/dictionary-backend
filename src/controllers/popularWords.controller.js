import pool from '../database/database.js';

const getPopularWords = (req, res) => {

    try {
        
        // Raw SQL query to get top 5 popular words

        const query = `
            SELECT word FROM searches 
            ORDER BY count DESC 
            LIMIT 5`
        ;

        const [rows] = pool.query(query);

        // Make an array of words from the result

        const popularWords = rows.map(row => row.word);

        res.status(200).json({ popularWords });

    } catch (error) {

        // Standard error handling

        console.error("Error fetching popular words:", error);

        res.status(500).json({ message: "Internal server error" });
    }

}

export { getPopularWords };