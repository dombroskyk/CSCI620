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

Database Files
--------------
For this I wrote a quick and simple Java program that read in the original database information, and broke it down into 3 files. The three files were plant_data.text, state_data.text, and plant_to_state_data.text. 

First I will start with plant_data.text. This information was originally taken from the information located on this part of the database http://archive.ics.uci.edu/ml/machine-learning-databases/plants/plants.data . As you can see, there is a long list of plants with abbreviated places listed after it. I simply ran through the file, and took out the first element of each line. This was the plants name. Then, in order the ID was assigned, and the file plant_data.text was created with the plantID followed by the plants actual name. (The name is what will be used in the visualization)

Then, I focused on the state_data.text file. The states were listed in the above database using their abbreviations. In the visualization we want to have the name of the states, so the program ran through this http://archive.ics.uci.edu/ml/machine-learning-databases/plants/stateabbr.txt , and took the name of the state, which was the second item on each line. This was a little more complicated since things were separated by spaces rather than a comma, so there had to be an additional step which, after the first space (which separated the abbreviation from the name of the place), the other spaces just meant spaces in the name. The name had to be put back together, and then it was associated with an ID (which again was created by the program). This information was then put into the state_data.text file, which was the ID followed by the state name. 

The last step was the hardest step, since the database is storing the connection between the plants and states based entirely on their ID's. So, there had to be a check between http://archive.ics.uci.edu/ml/machine-learning-databases/plants/plants.data this database and the database with the abbreviations for the places. An Array List was created which held all the information on the plants and the states (this included names, ID's, and abbreviations). Also, one line in the first database can have many places associated with it. The database has only one plant name and one state. So, if a plant could be found in more then one place it had to be repeated. This being the case, each individual line needed to be looked at and broken down. The first element in the list being the plant name. A simple look up in the ArrayList could associate the plant name with the ID that was needed. The trickier part was the abbreviations. Since the ID's were all associated with the states full names, the abbrevations had to be stored in the State Objects in the ArrayList. Once all that was sorted out, it again was a simple search on the abbreviation to find which state ID belonged in the list. Finally, the plant_to_state_data.text file was created holding the plant_ID and the state_ID.

 
Input into the Database
------------------------
Once the files were all created, and the database and tables were set up it only took a simple call to fill in the tables with the information from the files. 

LOAD DATA LOCAL INFILE 'file\location' INTO TABLE table_name COLUMNS TERMINATED BY '\t';

It was that simple. The database would take a few seconds to input all of the information into the table, but then the database was set up in MySQL, and is now ready to be queried. 


Problems
--------
Originally when the tables were populated, there was a problem with Prince Edward Island. In the dataset, Prince Edward Island did not have an abbreviation. So, when a search was done to see if there were any plants in Prince Edward Island none were found. This item was then taken out of the states dataset because it was useless information. It turned out that the dataset was wrong. The abbreviation for Prince Edward Island was pe, but that was not in the dataset. Manually, it was added and the information was run back through to recreate the files so they included Prince Edward Island.

Contact
-------
Any questions or problems, please contact kfd6490@rit.edu or blp6903@rit.edu


