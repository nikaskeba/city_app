# Project Name

**Author**: Nika Skeba
**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)
**NetlifyLink** <a href="https://magenta-stardust-08f1b6.netlify.app/">https://magenta-stardust-08f1b6.netlify.app/</a>
**Trello Board** <a href="https://trello.com/invite/b/y1jfu3J8/ATTI84f038c93254fa4ff62c47d22c7f231eCA8D1AE5/codefellows">Trello Board for Project</a>
## Overview
The CityExplorer application is designed to enable users to explore a city or landmark. By entering a city name, they can retrieve its latitude and longitude, view its location on a static map
<img src="FlowDiagram.png">
## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture
Technologies Used:

React: The core library for building the app's UI components.
JavaScript (ES6 and above): Employs modern JavaScript features like async/await and arrow functions.
Axios: A promise-based HTTP client used for making API requests.
useState: React hook for reactive state management without class components.
Weatherbit API: Fetches weather data for specified cities.
LocationIQ API: Converts city names to coordinates and provides a static map image.
TMDb API: Fetches movies associated with or filmed in a city.
Application Flow:

User Input: Users input a city or landmark.
Fetching Location: The "Explore" button triggers an API call to LocationIQ for coordinates and map image.
Fetching Weather: Uses coordinates to retrieve current weather from the Weatherbit API.
Fetching Movies: Potentially retrieves movies related to the city from the TMDb API.
Error Handling: Manages both user-level and technical errors, providing distinct messages for location and weather issues.
User Interface:

Search Bar: For city or landmark entry.
Explore Button: Initiates the data retrieval process.
Display Area: Showcases:
City's latitude and longitude.
City's static map image.
Current weather details.
(Potentially) a list of top movies related to the city.
Error Messages: Provides user feedback on errors in red text.
## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

08-22-2022
Name of feature: Add initial ability to grab from own weather API

Estimate of time needed to complete: 1.5 hours

Start time: 2 pm

Finish time: 6 pm

Actual time needed to complete: 4 hours
## Credit and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
