const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")


let schema = mongoose.Schema({
    // Username : {type: String, required: true },
    Username: { type: String, required: true, unique: true },
    Number: { type: Number, required: true },
    Email: { type: String, unique: true, required: true },
    Password: { type: String, required: true },
})


const saltRounds = 10;
schema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    try {
      const hashedPassword = await bcrypt.hash(this.Password, saltRounds);
      this.Password = hashedPassword;
      next();
    } catch (err) {
      console.error("Error hashing password:", err);
      next(err);
    }
  } else {
    next();
  }
});



schema.methods.compareUser = async function (userPass) {
  try {
    const user = await bcrypt.compare(userPass, this.Password)
    console.log(this.Password);
    return user

  } catch (err) {
    console.log(err);
  }
}

const Userschema = mongoose.model("userfunding", schema)
module.exports = {Userschema}