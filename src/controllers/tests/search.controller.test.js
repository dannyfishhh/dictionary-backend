import { describe, test, beforeEach, vi, expect } from 'vitest';
import { searchWord } from '../search.controller.js';
import pool from '../../database/database.js';

// Mock the database module

vi.mock('../../database/database.js', () => ({
    default: {
        query: vi.fn()
    }
}));

// Mock the global fetch function

global.fetch = vi.fn();

// Set up the request and response objects and spies

let errorMessage;
let req;
let res;

beforeEach(() => {
    vi.clearAllMocks();
    req = {};
    res = {
        status: vi.fn().mockReturnThis(),
        json: vi.fn().mockReturnThis()
    };
});

// Tests for searchWord controller

describe('searchWord', () => {

    test('should return word data on a successful external api fetch, and update the database', async () => {

        // set up

        req.query = { word: 'test' };
        const mockApiResponse = [{
            word: 'test',
            definitions: ['a procedure intended to establish the quality, performance, or reliability of something.']
        }];

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockApiResponse
        });

        pool.query.mockResolvedValueOnce( { word: 'test'} );

        // execute function

        await searchWord(req, res);

        // results

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockApiResponse);
        expect(pool.query).toHaveBeenCalledWith(
            `INSERT INTO searches (word, count) VALUES (?, 1)
            ON DUPLICATE KEY UPDATE count = count + 1, searchedAt = CURRENT_TIMESTAMP`,
            ['test']
        );

    });

    test('should return a status 400 error if the word is empty, and not update the database', async () => {

        // set up

        req.query = { word: '' };
        errorMessage = { message : "A word is required"};

        // execute function

        await searchWord(req, res);

        // results

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(pool.query).not.toHaveBeenCalled();

    });

    test('should return a status 400 error if the word is too long, and not update the database', async () => {
    
        // set up

        req.query = { word: 'a'.repeat(46) };
        errorMessage = { message : "No word is that long!" };

        // execute function

        await searchWord(req, res);

        // results

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(pool.query).not.toHaveBeenCalled();

    });

    test('should return a status 404 error if word is not found external api, and not update the database', async () => {

        // set up

        req.query = { word: 'fakeWord' };

        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        errorMessage = { message: "Word not found" };

        // execute function

        await searchWord(req, res);

        // results

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(pool.query).not.toHaveBeenCalled();

    });

    test('should return a status 500 error if there is an internal server error, and not update the database', async () => {

        // set up

        req.query = { word: 'test' };

        global.fetch.mockRejectedValueOnce({
            message: 'Internal Server Error'
        })

        errorMessage = { message: "Internal server error" };

        // execute function

        await searchWord(req, res);

        // results

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(errorMessage);
        expect(pool.query).not.toHaveBeenCalled();

    });

});