Introduction
======

Deliktum is a platform for the public to report crimes on Quito. This platform was also changed a bit
to be used in the last earthquake in Ecuador. The technology and stack used at the time was Google Maps,
JS Backbone and Ruby on Rails at the backend. We had to invent at the time things that did not exist
in Google maps, like clustering.

![](docs/screens/main.png?raw=true)

The main idea of this Challenge is to revamp the application using a modern approach and modern tools.

Technologies Allowed
======

- Javascript as the main Language
    - Frontend Frameworks
        - ReactJS
        - AngularJS
        - Vue.JS
    - Backend Framework using Node.js
        - Express
        - Loopback
        - Hapi
    - Storage
        - MongoDB
    - Maps
        - Google Maps
        - OpenStreet Maps
        - Leaflet
        
You have the liberty to use any other dependencies or NPM packages commonly used in the JS community.

Specs
======

1.- The main view of the app should be the map that is zoomed automatically to show all events displayed
in the map. Render a Map component that let you click on certain points on the map to retrieve the 
location information and also click on displayed items that show the detailed information of an event.

![](docs/screens/map.png?raw=true)

2.- Events in the map should be clustered depending on Zoom level.

![](docs/screens/cluster.png?raw=true)

3.- Every event needs a unique URL to be easily shared to other persons. This unique URl zooms
the map and opens the Event info Window automatically.

4.- There should be a button to report an event, clicking on it should open the form to create an 
event (Panel should slide from right, open in a modal or something else, be creative!)
Use the following fields:

- Description (Text field)
- Type of event (Relationship to a table of type of events)
- Date and time of the event (default value is current time, but user can select a different date 
from the past)
- Location (User should click on map to get location - latitude,longitude -)
- Image

![](docs/screens/report.png?raw=true)

5.- As a user I should be able to filter the events by type of event or point in time 
(all, today, last week, last month, last year)

![](docs/screens/filter.png?raw=true)

6.- There should be a Feed sidebar that displays the last 10 events in realtime with option 
to load more.

![](docs/screens/feed.png?raw=true)

Extra Points:

- Retrieve user current location and zoom to the location
- Good design (Use Material Design, Semantic-UI, Bootstrap, etc)
- Great Mobile experience
- Configurable to use in other cities/regions
- Multilingual support
- Automatic Testing

The evaluation criteria
======

- Frontend (100%)
    - Features (25%)
    - Maps integration (15%)
    - Code Modularity (15%)
    - SOLID principles (10%)
    - State management (10%)
    - Browser API (5%)
    - UI and usability (10%)
    - Dependencies Usage (5%)
    - Documentation  (5%)
    
- Backend (100%)
     - REST or GraphQL endpoints (25%)
     - Data Modeling and MongoDB Use (10%)
     - Security (10%)
     - Code Modularity (15%)
     - SOLID principles (10%)
     - Framework knowledge (10%)
     - Performance (10%)
     - Dependencies Usage (5%)
     - Documentation  (5%)

Process to send your work
======

- Fork this repository in your own github account
- Clone your forked repository and work locally
- Push your changes to your forked repository
- Create a Pull request from your forked repository into this repository
- Create a detailed description in your Pull request. Things to include:
    - Full Name and ID
    - Features included in the Code
    - Incomplete or buggy features
    - Any final comments about the Challenge
    
*Note: We will only accept commits before the challenge time ending. Any attempt to manipulate or 
rewrite the commit history will make PR disqualified*

Rules
======

- Any attempt to use outside help will disqualify the challenge
- The PR should be done the Challenge ending time
- Only the specified technologies are allowed
- Features that are not specified in the specs won't change the final score
- Extra specs will improve the final score and will be analyzed indepently of the general score by
the Judges.
- Leaving the campus premises is not allowed 
- Not being on time 



