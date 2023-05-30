const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/register', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Check if the connection was successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Seed initial data
  seedData();
});

// Function to seed initial data
const seedData = async () => {
  try {
    // Define sample users
    const users = [
        {
            "id": 1,
            "name": "Meet",
            "hobbies": [
              "Music",
              "Chess",
              "Drawing"
            ]
          },
        {
          "id": 2,
          "name": "Pari Singh",
          "hobbies": [
            "Music",
            "Cooking",
            "Reading"
          ]
        },
        {
          "id": 3,
          "name": "Naina Patel",
          "hobbies": [
            "Music",
            "Chess",
            "Dance"
          ]
        },
      {
          "id": 4,
          "name": "Amy Bhatt",
          "hobbies": [
            "Cooking"
          ]
        }
      ];

    // User schema
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      hobbies: { type: [String], required: true },
    });

    // User model
    const User = mongoose.models.User || mongoose.model('User', userSchema);

    // Insert users into the database
    await User.insertMany(users);

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hobbies: { type: [String], required: true },
});

// User model
const User = mongoose.models.User || mongoose.model('User', userSchema);

// API endpoint for getting potential matches based on hobbies
app.get('/match/:user_id', async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Find the user by ID
    const user = await User.findById(userId);

    // Find potential matches with common hobbies
    const potentialMatches = await User.find({
      _id: { $ne: userId }, // Exclude the current user
      hobbies: { $in: user.hobbies }, // Find users with at least one common hobby
    });

    res.json(potentialMatches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
