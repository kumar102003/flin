const admin = require("firebase-admin");
const User = require("../models/UserSchema"); 


admin.initializeApp();

const verifyToken = async (token) => {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid Firebase Token");
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, password, googleId } = req.body;

  try {
    if (googleId) {

      const user = await User.findOne({ googleId });

      if (!user) {
        const newUser = new User({
          firstName,
          lastName,
          email,
          googleId,
          avatar: req.body.avatar, 
        });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
      } else {
        res.status(400).json({ message: "User already exists" });
      }
    } else {

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
      const newUser = new User({ firstName, lastName, email, password });
      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

const login = async (req, res) => {
  const { email, password, token } = req.body;

  try {
    let decodedToken;
    
    if (token) {
     
      decodedToken = await verifyToken(token);
      const user = await User.findOne({ email: decodedToken.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.status(200).json({ message: "Login successful", user });
    } else {

      const user = await User.findOne({ email });

      if (!user || user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      res.status(200).json({ message: "Login successful", user });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
module.exports = { signup, login };