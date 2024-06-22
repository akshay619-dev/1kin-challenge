# 1Kin Coding Challenge SWAPI People with Brown Hair

This project displays the name, eye color, and homeworld of people with "brown" in their hair using the [SWAPI API](https://swapi.dev/).

## Prerequisites

- Node.js
- npm (Node Package Manager)

## Getting Started

Follow these instructions to set up and run the project locally.

### 1. Extract the zip file or clone the repository

```sh
git clone https://github.com/akshay619-dev/1kin-challenge.git

cd 1kin-challenge
```

### 2. Install Dependencies

Install the necessary dependencies using npm.

```sh
npm install
```

### 3. Run the Development Server

Start the development server.

```sh
npm run dev
```

### 4. Open the Application

```
http://localhost:3000
```


Then click and open `http://localhost:3000` in your browser to view the application.

You should see the list of people with brown hair along with their eye color and homeworld.

## Project Structure

- `app/page.tsx`: The main page that fetches and displays the data.

## Description

- Fetches people from the SWAPI API.
- Filters people with "brown" in their hair color.
- Fetches and maps their homeworlds.
- Displays the name, eye color, and homeworld name for each person.

## API Endpoints Used

- `https://swapi.dev/api/people/`
- `https://swapi.dev/api/planets/{id}/`

