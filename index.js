const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require("./routes/user")

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URL
)
.then(() => console.log('DBConnection Succefull!!!'))
.catch((err) => {
  console.log(err);
});

app.use(express.json())
app.use('/api/users', userRouter)

app.listen(process.env.PORT || 5000, () => {
  console.log('backend')
})