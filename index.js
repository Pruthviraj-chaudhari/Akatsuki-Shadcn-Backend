const express = require("express");
const database = require("./config/database");
const member = require("./models/member");
const cors = require("cors");
const bodyParser = require("body-parser");
const { addMember } = require("./controllers/addMember");

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
	cors({
		origin:["http://localhost:5173", "https://akatsuki-shadcn-frontend.vercel.app"],
		credentials:true,
	})
)

database.connect();

app.post('/api/addmember', addMember);

const PORT = 3000 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port ${PORT}`)
})

