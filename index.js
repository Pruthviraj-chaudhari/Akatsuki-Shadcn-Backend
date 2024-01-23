const express = require("express");
const database = require("./config/database");
const member = require("./models/member");
const cors = require("cors");
const bodyParser = require("body-parser");
const { addMember } = require("./controllers/addMember");
const PORT = 3001 || process.env.PORT;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
	cors({
		origin:["http://localhost:5173", "https://akatsuki-shadcn-frontend.vercel.app", "https://akatsuki-shadcn-frontend.vercel.app/#"],
		credentials:true,
	})
)

database.connect();

app.get('/', (req, res)=>{
	res.json({
		success: true,
		message: `Server is Running on PORT ${PORT}🎉`
	});
})
app.post('/api/addmember', addMember);

app.listen(PORT, ()=>{
    console.log(`Server Listening on Port ${PORT}`)
})

