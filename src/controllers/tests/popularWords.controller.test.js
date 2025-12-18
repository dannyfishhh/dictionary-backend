import { describe, test, beforeEach, vi, expect } from 'vitest';
import { getPopularWords } from '../popularWords.controller.js';
import pool from '../../database/database.js';

// Mock the database module

vi.mock('../../database/database.js', () => ({
    default: {
        query: vi.fn()
    }
}));

// Set up the request and response objects and spies

let req;
let res;
let mockPopularWords;

beforeEach(() => {
    vi.clearAllMocks();
    req = {};
    res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
    };
});

// Tests for getPopularWords controller

describe('getPopularWords', () => {
    test('should return the 5 most popular words if no errors', async () => {

        // set up

        mockPopularWords = [
            { word: 'a' },
            { word: 'b' },
            { word: 'c' },
            { word: 'd' },
            { word: 'e' }
        ]

        pool.query.mockResolvedValueOnce([mockPopularWords]);

        // execute function

        await getPopularWords(req, res);

        // results

        expect(pool.query).toHaveBeenCalledWith(`
            SELECT word FROM searches 
            ORDER BY count DESC 
            LIMIT 5`
        )
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ popularWords: ['a', 'b', 'c', 'd', 'e'] });

    });

    test('should return an error with status code 500 if there is a database error', async () => {

        // set up

        pool.query.mockRejectedValueOnce(new Error('Database error'));

        // execute function

        await getPopularWords(req, res);

        // results

        expect(pool.query).toHaveBeenCalledWith(`
            SELECT word FROM searches 
            ORDER BY count DESC 
            LIMIT 5`
        )
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });

    });

});
