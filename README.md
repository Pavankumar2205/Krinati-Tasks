# Krinati-Task Round 1
Assume you are a part of dating app backend team. You are asked to design a feature which can help users to get their potential match based on hobbies (just to keep it simple).

For ex.,
Meet is a user who has signed up for the app. He has inserted his hobbies as, Music, Chess, Drawing.

He goes to our app and his client calls your API to get potential matches. Your API should return all the potential matches based on the degree of compatibility.

Explanantion-Server.js
1-Import the required modules: The code imports the express and mongoose modules. express is used to create the server and define routes, while mongoose is used to interact with the MongoDB database.

2-Create an Express application and define the port: The code creates an instance of the Express application using express() and assigns it to the app variable. The port variable is set to 3000, specifying the port on which the server will listen for incoming requests.

3-Connect to MongoDB: The code establishes a connection to the MongoDB database using the mongoose.connect() method. It specifies the connection URL(mongodb://localhost:27017/register) and sets some options like useNewUrlParser and useUnifiedTopology to ensure a successful connection.

4-Check if the connection was successful: The code defines an event listener on the db object (representing the MongoDB connection) to listen for the 'open' event. If the connection is successfully opened, it logs a message to the console indicating that it is connected to MongoDB.

5-Seed initial data: The code defines a function called seedData() that is responsible for inserting sample user data into the MongoDB database. This function is called after the MongoDB connection is established.

6-User schema and model: The code defines a schema and a model for the User collection in the MongoDB database. The userSchema defines the structure of a user document, specifying the fields name (a required string) and hobbies (an array of strings, also required). The User model is created using mongoose.model().

7-Insert sample users into the database: The seedData() function defines an array of sample users and uses the User model to insert them into the MongoDB database using the User.insertMany() method. The sample users include IDs, names, and hobbies.

8-API endpoint for getting potential matches: The code defines an API endpoint (/match/:user_id) using app.get(). It expects a user_id parameter in the URL. Inside the endpoint, it retrieves the user by ID using User.findById() and finds potential matches by searching for users with at least one common hobby using User.find(). The potential matches are returned as a JSON response.

9-Start the server: The code uses app.listen() to start the server and make it listen on the specified port (in this case, port 3000). Once the server is started, it logs a message to the console.
