const mongoose = require("mongoose");
const dns = require("dns");

try { dns.setServers(["8.8.8.8", "1.1.1.1"]); } catch (e) {}

// Amaresh's Atlas URL
const ATLAS_URL = "mongodb+srv://amaresh_db_user:86ViVzoPt5xKOKTh@cluster0.yzrgyr4.mongodb.net/WebTech?retryWrites=true&w=majority";

const RecordSchema = new mongoose.Schema({
  id:     { type: Number, unique: true },
  first:  { type: String, required: true },
  second: { type: String, default: "" },
  third:  { type: String, default: "" },
  fourth: { type: String, default: "" }
});
const Record = mongoose.model("Record", RecordSchema);

const sampleData = [
  { id: 1, first: "Alice Johnson", second: "Computer Science", third: "Semester 6", fourth: "Grade A" },
  { id: 2, first: "Bob Smith", second: "Information Technology", third: "Semester 6", fourth: "Grade B" },
  { id: 3, professional: "Charlie Brown", second: "Electronics", third: "Semester 4", fourth: "Grade A" }
];

async function checkAndSeed() {
  try {
    console.log("Connecting to Amaresh's MongoDB Atlas ('WebTech')...");
    await mongoose.connect(ATLAS_URL);
    console.log("Connected successfully!");

    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in WebTech:", collections.map(c => c.name));

    // Check records count
    const count = await Record.countDocuments();
    console.log(`Current records in 'records' collection: ${count}`);

    if (count === 0) {
      console.log("No existing records found. Inserting default sample data...");
      await Record.insertMany([
        { id: 1, first: "Alice Johnson", second: "Computer Science", third: "Semester 6", fourth: "Grade A" },
        { id: 2, first: "Bob Smith", second: "Information Technology", third: "Semester 6", fourth: "Grade B" },
        { id: 3, first: "Charlie Brown", second: "Electronics", third: "Semester 4", fourth: "Grade A" }
      ]);
      console.log("Seeded 3 sample records successfully without touching any other database!");
    } else {
      console.log("Existing records found (NOT overwriting):");
      const records = await Record.find().sort({ id: 1 });
      console.log(records);
    }
  } catch (err) {
    console.error("Connection error:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

checkAndSeed();

