# Fullstack Project - Work Log

| Day | Amount of Time | Description |
|-----|----------------|-------------|
| 22.1 | 1,5h | Initial planning of the idea and structure | 
| 26.1 | 5h | Simple webpack config, researched and put together a simplified skeleton timer |
| 27.1 | 3h | Configuring the state to initially store different practice subjects |
| 29.1 | 2h | Tweaking the subjects form |
| 2.2 | 4h | Setting up backend endpoints for sessions and subjects, implementing material-ui for the frontend |
| 2.2 | 2h | Configuring layout |
| 4.2 | 8h | Switched the backend to use graphql and updated the code to ES6 |
| 8.2 | 7h | Configuring graphql for front- and backend |
| 9.2 | 3h | Configured MongoDB and updated graphQL queries and mutations for it |
| 9.2 | 4h | Added login feature |
| 10.2 | 4h | Trying to figure out state/context for logged user |
| 11.2 | 4h | Figuring out connection btw users and sessions in backend |
| 11.2 | 2h | Figured a way to connect user w/ sessions in backend/db | 
| 11.2 | 2h | Research on React Hooks (React conf video on Youtube) |
| 15.2 | 4h | Edited routing, added session history page |
| 15.2 | 2h | Added passwords/encryption & signup page/possibility to add users |
| 19.2 | 2h | Edited main page, possibility to add subjects/login/see history while session is running |
| 19.2 | 2,5h | Configured eslint, fixed errors, replaced 'alert' and 'confirm' methodes with Material-UI ones |
| 19.2 | 2h | Research on integration testing on Apollo Server, and trying to configure tests for the backend | 
| 20.2 | 2h | Trying to fix a bug with Jest not quitting after succesful tests, no success |
| 22.2 | 4h | Wrote more tests for the backend, deployed to heroku |
| 23.2 | 1h | Set up a CI/CD pipeline for the backend with GitHub Actions, backend now live! |
| 23.2 | 3,5h | Started building unit tests for frontend |
| 23.2 | 2,5h | Finished (mostly) unit tests for frontend |
| 24.2 | 1h | Trying to get MockedProvider to work in unit tests - no luck |
| 24.2 | 2h | Finally got MockedProvider to work, finished frontend unit tests |
| 27.2 | 4h | Configured Cypress for e2e tests, build a simple GitHub pipeline |
| 28.2 | 4h | Configured forms with Formik, started to add private notes to subjects |
| 1.3 | 80h | Total hours so far, 4.57op |
| 1.3 | 2,5h | Added an option to add private notes to individual subjects, figured out current user hook instead of local storage |
| 1.3 | 1h | Fixed rendering issue when logging out, cypress tests are passing again |
| 1.3 | 2h | Added subject notes and total times to session history page |
| 2.3 | 8h | Migrated backend to TypeScript (phew!) |
| 2.3 | 1h | Fixed bug in session history unit test |
| 4.3 | 9h | Reconfigured backend schema to make keeping track of users notes and practice subjects simpler. Was harder than expected |
| 5.3 | 4,5h | Fixed frontend to display correct information from the new backend config, and fixed some errors on saving sessions |
| 5.3 | 1h | Fixing little errors on the frontend |
| 6.3 | 4h | Adding loading animation, backend tests broken for some reason, trying to fix |
| 6.3 | 4h | Had a hard time to find the bug, as tests passed and then failed without changing anything. Added a missing 'await' and updated dependencies. Fixed ensuing errors in frontend unit- and e2e-tests |
| 7.3 | 117h | Total hours so far, 6.69op |
| 7.3 | 3h | Added account info page that shows session history and subjects |
| 7.3 | 6h | Added a feature to add links to individual subjects, had some issues to get the page re-render instantly but figured that out. (Reading from a variable that wasn't updating in real time)
| 8.3 | 4,5h | Edited backend to check for tokens for most actions, added feature to frontend to add links while creating new subjects. Research into best practices of using JWT tokens. |
| 8.3 | 2h | Fixing some tests, first deployment through AWS at https://main.d33spb18ttvwwb.amplifyapp.com/!! |
| 8.3 | 3h | Spend some time trying to add AWS deployment to GitHub Actions, didn't work and decided to drop aws for now | 
| 8.3 | 0.5h | Found a way to combine GitHub actions pipeline with Amplify, so decided to go with it anyway |
| 9.3 | 6h | Added total time practiced & personal goals to backend user schema, and updated the resolvers. Trying to fix issues that arose in tests |
| 10.3 | 142h | Total hours so far, 8.11op
| 10.3 | 3h | Finally fixed an eventually occurring error in backend tests, switched a forEach method to Map and Promise.all in addSession mutation |
| 10.3 | 5h | Expanded backend to update individual goals based on sessions saved, added form to frontend to add new goals. |
| 10.3 | 2h | Configured a mutation to delete goals, updating frontend to display goals past and current goals, with symbols if they were met or not. 
| 10.3 | 2,5h | Wrote unit tests for all the new components added in the last couple of weeks |
| 11.3 | 154,5h | Total hours so far, 8.82op. |
| 11.3 | 2,5h | Added the option to see your goals from the front page and start practicing one directly |