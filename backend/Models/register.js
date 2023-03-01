const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define MongoDB schema
const formDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
  });
  
  const FormData = mongoose.model("FormData", formDataSchema);

  // API endpoint to save form data to MongoDB
app.post("/api/data", (req, res) => {
    const formData = new FormData(req.body);
    formData.save((error) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send("Form data saved to MongoDB!");
      }
    });
  });