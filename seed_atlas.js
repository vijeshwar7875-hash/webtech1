const mongoose = require("mongoose");
const dns = require("dns");

try { dns.setServers(["8.8.8.8", "1.1.1.1"]); } catch (e) {}

const ATLAS_URL = "mongodb+srv://vijeshwar_db_user:B3sIwf1kGnpOHYfI@cluster0.yzrgyr4.mongodb.net/webtech?retryWrites=true&w=majority";

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
  { id: 3, first: "Charlie Brown", second: "Electronics", third: "Semester 4", fourth: "Grade A" }
];

async function run() {
  try {
    console.log("Connecting to MongoDB Atlas (webtech)...");
    await mongoose.connect(ATLAS_URL);
    console.log("Connected to Atlas successfully!");

    const count = await Record.countDocuments();
    console.log(`Current records in Atlas 'webtech' database: ${count}`);

    if (count === 0) {
      console.log("No records found in Atlas. Seeding sample records...");
      await Record.insertMany(sampleData);
      console.log("3 Sample records inserted successfully into Atlas!");
    } else {
      console.log("Records present in Atlas:");
      const records = await Record.find().sort({ id: 1 });
      console.log(records);
    }
  } catch (err) {
    console.error("Atlas connection/seeding failed:", err.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected.");
  }
}

run();

