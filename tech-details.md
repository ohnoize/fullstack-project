Full Stack Project 2020 - A time management tool for serious musicians

App to help serious musicians organize and optimize their practice time.

Technical structure:

Frontend:
	-React
	-React Native for mobile (at some point)

Backend:
	-Node.js
	-Express
	-GraphQl

DB:
	-Mongo DB?

Database

Schemas:
	-User
	-Session
	-Subject

	User: { id, username, totalTime, subjectsStudied: { id, time } }
	Session: { id, totalLength, individualSubjects: { id, length }, notes }
	Subject: { id, name, description, timePracticed }

Backend

API (graphQL) endpoints to access individual user, subject, and session. Mutations to add new users, add new session, and add subjects to study. 

