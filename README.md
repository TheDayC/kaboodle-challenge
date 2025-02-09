# Kaboodle Challenge
A full stack event application for Kaboode's developer challenge.

## Quick Start

Before running any of the following commands it's recommended that you have [Volta](https://docs.volta.sh/guide/getting-started) installed to manage your Node versions per application and for you to run `npm install` before any other NPM script. To run this application in a containerised format run the docker command:

```bash
npm run docker
```

## Development

Please refer to the application READMEs for the [UI](./events/README.md) and [API](./api/README.md) to boot these applications in development mode. Both applications have hot reload and some linting / code formatting protection on staged files.

## Accomplishments

The requested tasks have been accomplished to the following standard:

1. A form on the HomePage (index) that submits event data to an `/events/new` endpoint in the api. The form contains a sub-form for tickets that has a repeater feature to add more tickets and assign them to an event.
2. The EventsPage displays a list of events in an MUI Data Grid and provides the top level data to the user with links on both the title and an additional button to navigate to that event's detail page.
3. The EventPage displays the chosen event's details including tickets, their price, fee, type and availability. Each ticket features a dummy add to cart button. Availability is color coded with green and red, when a ticket is out of stock it also removes the add to cart button.

## Tech Stack

### UI

The UI is built with React, Typescript, Vite, MUI, TanStack Query, React Hook Form, React Router, Zod and Luxon. React, TS, Vite and React Router buid the foundation of the application. TanStack Query allows us to avoid useEffect listeners when fetching data and avoid bugs that typically stem from this area. React Hook Form is a clean way to handle form submissions, their validation and type checking. Luxon is my Date / Time library of choice due to it expansive feature set and capability to integrate into MUI, RHF and Zod. Finally, Zod allows us to type check our code base and protect against unwanted type assumptions or incoming data that we're not expecting.

### API

The API is built on Node, ExpressJS, Typescript, cors, Winston, UUID and Zod. Node, ExpressJS and Typescript make up the core functionality of the REST API allows us to serve data to requests made by the UI or other services like Postman, Insomnia etc. cors simply opens up API to outside application requests, this would obviously be done in a more controlled manner in a production application. Winston is a logger that allows for tracing and debugging within the API, logging to both the terminal and local files. UUID provides tremendous amounts of entropy for unique ids when adding an event to the JSON file. Finally, Zod also type checks this code base in a similar manner to the UI.

### Database

A JSON file with a seed script.

## Approach

### UI

I approached the UI with a fairly simple React, Vite + MUI setup, an approach I'm very familiar with that allowed me to write code for the application quickly and use a pre-built component library to shortcut layouts and styling. In the Dockerfile I took the approach of serving the UI in an NGINX web server with the goal of proxying requests through the web server to the API, this didn't quite work out but I'll mention this further below in lessons learnt. Whilst developing this application I purposely avoided the use of useEffect whilst making requests and relied on the more modern TanStack Query, as you can see from these simple queries I can control things like loading states and data returns in a single query without producing unwanted side effects in the UI.

### API

The API was approached with the simplest setup in mind, ExpressJS. This allowed me to create an organised file structure very quickly and throw together very simple controllers to serve endpoints and focus on the type checking and data protection before feeding it to the UI.

### Database

I chose a JSON file for this part of the application purely due to simplicity, there were enough features requested to warrant this consideration but in an ideal world I'd use a proper database technology to serve the API, I've written about this below.

## Lessons Learnt / What I'd Do Differently.

Overall I'm happy with the application delivered. The tech is straight forward but is chosen to save time and to launch the application rather than provide structure. The UI is in a good place but the API and Database portions I'd probably look to improve with the following changes.

### UI

Whilst building the UI I containerised it with a web server wrapper, the goal here was to create proxies that point at the events API and prepare the UI to easily connect with microservices in the future without having to constantly call env variabes. As you can see I've also set this up in Vite to match local development with production but unfortunately as I was approaching the end of the project I found that during containerisation there was some CORS issues that the webserver returned that were directly linked to the proxy. In future I'd like to find a way to resolve this as I believe the approach is a good one that can assist in reducing complexity in the UI once set up.

### API

If I were to change the API in a future update I'd look to add more guard rails with a framework such as a Fastify or NestJS, both of these applications would give enough structure for a production ready application. Alonside this I'd consider a bundling tool to minify the application and provide some tree shaking to avoid an inflated package size when containerising and during deployment.

I came up against some build issues whilst writing the API that I'd like to avoid in future, this also included seeding the database and including it in the `/dist` directory, as you can see in the code I've made some alterations to ensure it just gets used and included.

### Database

The database is the most barebones of the three applications and I'd upgrade this to a fully fledged database system. I would pick PostgreSQL for a scalable application and MongoDB (NoSQL) for a fast prototype or small scale application, I would then serve both with PrismaIO from the API to provide consistent SDK / interface between the API and the chosen DB technology.

### Testing

A major omission from this challenge is testing. I decided to avoid testing due to the lack of requirement and the large time investment, but if I were to add this I would choose 3 tools to provide code assurance. Firstly, I'd implement Jest as a testing framework across both the UI and API to allow unit testing across both systems and provide a familiar library for developers to begin their testing baseline from. Secondly, I'd add Playwright in the UI for integration and E2E testing. Having a lot of experience with both Cypress and Playwright I side with the latter as a more stable and efficient piece of software that provides simple UI visualisation when testing components or user journeys, and a familiar Jest-like syntax. Optionally, should developers want a simpler, cli focused implementation than Playwright for specifically integration testing, React Testing Library is also a fine option that slots nicely into Jest in the UI, removes the overhead of Playwright and provides a deep library of functions that enable accurate, user centric testing approaches.