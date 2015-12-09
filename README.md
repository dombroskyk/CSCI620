Plant Finder, Group 6 - CSCI620
-------------------------------
A website using the Plants dataset found at
http://archive.ics.uci.edu/ml/datasets/Plants. It can be used for exploring the
different species of plants and their geographic location found in the
United States and Canada. Intended to be run locally.

Authors
-------
Brittany Purcell
Kevin Dombrosky

PRIVATE GitHub Repository
-------------------------
https://github.com/kowzrule/CSCI620

Dependencies
------------
Node.js (https://nodejs.org/en/)
MySQL (https://www.mysql.com/)
ArcGIS (https://developers.arcgis.com/javascript/)

Sub-modules
-----------
npm dependencies:
	nodemon - Auto restarts the server when a file is changed
	express - Web framework for Node.js
	debug - Pretty prints debug statements
	mysql - Node.js MySQL driver
	jade - Templating language for HTML

Deployment Instructions
-----------------------
1) Unzip supplied files to a folder (alternatively pull from GitHub)

Setup MySQL and MySQL Server:
1) Ensure the computer is connected to the internet
2) Download the MySQL installer (http://dev.mysql.com/downloads/file/?id=459895)
and click "No thanks, just start my download."
3) Run the downloaded installer, mysql-installer-web-community-5.7.9.0.msi
It is recommended to install all products included (especially MySQL Server and
MySQL Workbench) to ensure everything required is included
4) Open MySQL Workbench
5) Make sure you are in the home tab, and create a new database connection by
clicking the wrench icon next to "MySQL Connections" and click "New"
6) Change the connection name to "Group6" and ensure that the hostname is
"localhost", the port is "3306", and the username is "root"
7) Click "Test Connection" and enter a password for the root user on the
MySQL server. (This can be anything)
8) Connect to the server by double clicking on the connection you just created
9) Open the supplied sql file, ./Documentation/DatabaseLoadFiles/sql_setup.sql
10) Correct the last three lines (load data local ...) so that the paths
in the commands reflect the absolute paths to your text files
11) Run sql_setup.sql

Setup Node and test website:
1) Install Node.js (https://nodejs.org/en/)
2) Using the command line, navigate to the folder the project was unzipped to
3) Run "npm install" to install node package modules in the dependency list
of package.json
4) Rename "./config.js.sample" to "./config.js"
5) Open ./config.js and change the MYSQL.PASS field to be the password used to
connect to the MySQL server connection that was setup 
6) Run "node bin/dev-www" to start the server
7) Open a web browser and navigate to localhost:3000 to confirm it's working

Contact
-------
Any questions or problems, please contact kfd6490@rit.edu or blp6903@rit.edu