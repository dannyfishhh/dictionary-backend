<br />
<div align="center">

<h2 align="center" id="readme-top">Dictionary Backend</h2>

<p align="center">
An Express.js backend server that provides API endpoints for dictionary lookups and popular word tracking. It integrates with a free Dictionary API to fetch word definitions, examples, and audio data. The server maintains a MySQL database to track the most frequently searched words, enabling the frontend to display popular search suggestions.

The project is thoroughly tested with Vitest, uses rate limiting for API protection, and follows clean code principles with organized controllers, routes, and database helpers for maintainability.
</p>

</div>

## Table of Contents
<details>
	<summary>Table of Contents</summary>
  	<ol>
	    <li><a href="#tech-stack">Tech Stack</a></li>
		<li><a href="#prerequisites">Prerequisites</a></li>
	    <li><a href="#project-structure">Project Structure</a></li>
	    <li><a href="#endpoint-responsibilities">Endpoint Responsibilities</a></li>
    	<li><a href="#contributing">Contributing</a></li>
	    <li><a href="#testing">Testing</a></li>
    	<li><a href="#database">Database</a></li>
  	</ol>
</details>

## Tech Stack

- Express.js — lightweight and flexible framework for building server endpoints with minimal overhead.
- Node.js — allows JavaScript to run on the server side, maintaining a consistent language across the full stack.
- MySQL — relational database for tracking popular word searches and maintaining data integrity.
- Vitest — lightweight, fast unit tests (see `src/**/*.test.*`). Great for TDD and CI.
- express-rate-limit — protects API endpoints from abuse by limiting the number of requests per time window.
- dotenv — manages environment variables safely without exposing sensitive configuration to version control.

Why these choices: I chose Express for its simplicity and wide ecosystem support. Vitest integrates well with Node and provides fast test execution. The combination of MySQL and helper functions keeps database operations organized and testable. Rate limiting is essential for protecting public API endpoints from abuse.


## Prerequisites

Quick start — run locally

- Node.js.

- MySQL database running locally or accessible via connection string in `.env`.

Open a PowerShell terminal and run:

```powershell
npm install
npm run dev
```

The server will start at: http://localhost:3000 (or your configured port)

Other useful scripts:

```powershell
npm start        # run the server in production mode

npm test         # run unit tests with vitest

npm run test:watch  # run tests in watch mode
```

## Project Structure

- `src/` — main source files
	- `controllers/` — business logic for each endpoint (search, popular words)
	- `routes/` — endpoint definitions and routing
	- `database/` — database connection, queries, and helper functions
	- `app.js` — Express app configuration and middleware setup
	- `index.js` — entry point that starts the server

## Endpoint Responsibilities

- `GET /api/search/:word` — fetches word data from the Dictionary API and updates the popular words count in the database.
- `GET /api/popular-words` — returns the 5 most frequently searched words from the database.
- `controllers/search.controller.js` — handles the logic for searching a word and incrementing its popularity count.
- `controllers/popularWords.controller.js` — retrieves and formats the popular words list from the database.
- `database/database.js` — manages the MySQL connection pool and executes queries.
- `database/helpers.js` — provides utility functions for common database operations (insert, update, select).

## Contributing

1. Fork the repo and create a branch: `feature/your-short-desc`.
2. Run the project and tests locally. Please fix or add tests for any functionality or behaviour you change.
3. Open a pull request with a clear description of the change and why it would be beneficial to include.

## Testing

Tests are written with Vitest (see `src/**/*.test.*`). The test suite includes controller tests that verify endpoint logic and database interaction, plus helper tests for database utility functions.

To run tests:

```powershell
npm test
```

## Database

The project uses a MySQL database to store word search history and popularity metrics. The `database/` folder contains:

- `database.js` — connection pool setup and query execution
- `helpers.js` — reusable functions for common database operations

Environment variables in your `.env` file should include:
- `DB_HOST` — MySQL server host
- `DB_USER` — MySQL user
- `DB_PASSWORD` — MySQL password
- `DB_NAME` — database name

## Deployment

Both the server and MySQL database are deployed on Railway. The server is linked to the GitHub repo for automatic deployments on every push.