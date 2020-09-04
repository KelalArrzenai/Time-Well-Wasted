# Time-Well-Wasted
## Description
For this project, we were asked to create an app that utilizes two server-side  
APIs and a new CSS framework. The app must be responsive, interactive, and have   
a polished UI. 

Time Well Wasted is live: https://kelalarrzenai.github.io/Time-Well-Wasted/

## User Story
### Who wants this?
Anyone who's bored and in need of new entertainment recommendations. 
​
### What is the user trying to achieve?
A platform to get recommondations on music, movies, and more (pending deployment) based off a user's preferences and interest.
​
​
### Why do they want to achieve this?
Have you ever been tired of all the browsing and decision making involved with entertaining ourselves? This application solves this problem with minimal input from the user.  
Not to mention that this is a catch-all for any and all time-wasters the user might be into (pending deployment).
​
### Name
Time Well Wasted
​
### What its going to be
Generate a list based off of tastes that the user will fill out in a form

### Wireframe
![Time Well Wasted Wireframe](time-wasted-skeleton.png)

​
## Features
* User can get movie or music recommendations based off genre selection
* User can search movies by keywords
* User can click random for a random recommendations
* Movies are populated with Title, plot, and a poster
* Music is populated by song with the arist name, track title, and album cover

## Installation
To access the TMDB API, you need to request an API key and use the following URL to query:
```
https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>
```
To access the iTunes API, use the following query URL:
```
https://itunes.apple.com/search?term=<<artist+name>> 
```
To utilize the jQuery library, place the following script at the end of your HTML body:

```html
            <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>

```
To utilize the Bulma components, place the following link at the end of your HTML body:

```html
             <link rel="stylesheet" href="css/bulma.min.css">

```

## Built with Bulma
Built with Bulma  
jQuery
JavaScript
CSS
HTML
​
## APIs
iTunes
TMDB
​
## Assignments
Front End - Henry Parrish  
Front End - Kahlil Goldstein  
Back End Spotify API - Nader Mashy  
Back End TMDB API - Eric LaFontsee  