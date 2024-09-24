# 🎥 Movie Watchlist App

![Build Status](https://img.shields.io/badge/build-success-brightgreen) ![Version](https://img.shields.io/badge/version-1.0.0-blue)

## Introduction

The **Movie Watchlist App** is a user-friendly web application that allows users to search for movies, add them to a personalized watchlist, and manage their movie collection. Built using vanilla JavaScript and Firebase, this app leverages modern web technologies to provide a seamless experience for movie enthusiasts. The app features a clean, intuitive interface optimized for desktop users.

## Table of Contents

1. [Demo](#demo)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Usage](#usage)
5. [API Reference](#api-reference)
6. [Challenges Faced and Solutions](#challenges-faced-and-solutions)
7. [License](#license)
8. [Contact Information](#contact-information)

## Demo

Check out the live demo of the app here: [Movie Watchlist App](https://movie-watchlist-weld-alpha.vercel.app/)

## Features

- **Search and Discover**: Search for movies by title using the search bar. Results display movie details such as title, genre, and runtime.
- **Personalized Watchlist**: Add movies to your watchlist with a single click and manage your collection easily.
- **Responsive Design**: Optimized for desktop usage, providing a clean and modern interface.
- **Movie Details**: View detailed information for each movie, including IMDb rating, plot, and poster image.
- **Watchlist Management**: Remove movies from your watchlist with a single click and clear the entire watchlist if needed.

## Tech Stack

- **Frontend**: Vanilla JavaScript, HTML, and CSS.
- **Backend**: Firebase Realtime Database and Firebase Authentication.
- **Bundler**: Parcel for efficient and optimized bundling.
- **Hosting**: Vercel for fast and reliable deployment.

The project leverages Firebase for real-time data synchronization and authentication, allowing users to securely manage their watchlists. Parcel simplifies the build process and improves performance during development and deployment.

## Usage

- **Search for Movies**: Use the search bar to find movies by title. Type a keyword and press enter to see the results.
- **Add to Watchlist**: Click the "Watchlist" button next to a movie to add it to your personal watchlist.
- **View Watchlist**: Access the "My Watchlist" page to see all your saved movies.
- **Remove Movies**: Click the "Remove" button to delete a movie from your watchlist.

## API Reference

- **OMDb API**: Used for fetching movie details including title, plot, runtime, genre, and IMDb rating. The API is queried with the movie title to retrieve comprehensive movie data.
- **Firebase Realtime Database**: Stores user watchlists, ensuring real-time updates and secure data management.
- **Firebase Authentication**: Manages user sign-up and login, providing secure access to personal watchlists.

## Challenges Faced and Solutions

### Memory Management on Vercel
During deployment, memory allocation issues were encountered due to the complexity of the build process. This was resolved by optimizing the Parcel build process and adjusting Node.js options to increase memory allocation during deployment.

### Firebase Security Rules
Ensuring that user data was protected and only accessible to authenticated users was a priority. Firebase security rules were implemented to restrict access, preventing unauthorized users from accessing or modifying watchlists.

## License

This project is licensed under the MIT License.

## Contact Information

For any queries or collaboration opportunities, feel free to reach out:

- **Email**: shivamagarwalmarch@gmail.com
- **LinkedIn**: [CLICK HERE](https://www.linkedin.com/in/shivamagarwal03/)
- **Twitter/X**: [CLICK HERE](https://x.com/shivam_agarwaal)
