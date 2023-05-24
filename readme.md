# FULLSTACK REGISTRATION and LOGIN PAGE

This project implements a login and registration form using JavaScript, Node.js, Express, and PostgreSQL. It allows users to create an account, login with their credentials, and access protected routes.

Once you have clone it, make sure to you run 'npm install' command to install all libraries mention in package.json file.

# Make sure you have the following installed before running the application:

- Node.js (https://nodejs.org)
- PostgreSQL (https://www.postgresql.org)

## Installation

1. Clone the repository:
2. Navigate to the project directory:
3. Install the dependencies mentioned in the package.json file:
4. start the server npm start server and the server will be run locally on the machine.
5. You can now open your localhost client on the browser and see the UI will be running on web as well as the server is on.
   Locally it will run on localhost:3000 with two pages
   1, http://localhost:3000/login
   2.http://localhost:3000/register

6. Set up the database :

- Create a new PostgreSQL database.

# open command prompt, follow the steps;

# psql -U postgres

The command "psql -U postgres" is used to connect to a PostgreSQL database server using the command-line interface called "psql" and authenticating as the user "postgres".

# CREATE DATABASE loginpage;

You can give the database name as your own.

# \c loginpage;

\c the command is used to connect to the database.

# Creating table

CREATE TABLE USERS(id serial not null primary key, name varchar(255) not null, email varchar(255) not null unique, password varchar(255) not null);
SELECT \* FROM users will show all the information of loggined users.

Table will be created

you can access the pages
1, http://localhost:3000/login
2.http://localhost:3000/register


Now you can register a user and login a user as well and all the datas will be stored in the database table.

# With this application you can regsister and login users also show a login page as well as logout.

# SUMMARY- A FULL STACK WEB APPLICATION FOR REGISTRATION AND LOGIN FORM.




