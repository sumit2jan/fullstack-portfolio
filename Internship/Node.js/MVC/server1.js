const express = require('express');
const app = express();
const port = 8000;

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/practice").then(() => console.log("Server is connected")).catch((err) => console.log("err: ", err));



app.use(express.urlencoded(
    { entended: true }
));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
});



const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true, match: [/^.+@.+\..+$/, "Please use a valid email"] },
    gender: { type: String, enum: ['male', 'female'] },
    age: Number
});

userSchema.index({ email: 1 }, { unique: true });

const User = mongoose.model("user", userSchema);

app.get("/get_user", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }
});

app.get("/users/read/:id", async (req,res) => {

    try {

        const {id}= req.params;
        const users = await User.findById(id);
        if(!users){
            return res.status(404).json({
                success: false,
                data: null,
                message: "User Not Found"
            });
        }
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }


})

app.post("user/create", async (req, res) => {
    try {
        const { name, email, gender, age } = req.body;

        if (!name || !email) {
            return res.status(500).json({
                success: false,
                data: null,
                message: "Both Name and Email are required."
            })
        }

        const user = new User({
            name, email, gender, age
        });

        await user.save();

        res.status(201).json({
            sucess: true,
            message: "User Added Successfully.",
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            sucess: false,
            data: null,
            message: "Error occured", error
        });
    }

});


app.put("/user/update/:id", async (req, res) => {

    console.log("Id recevied: ", req.params.id);

    try {
        const { id } = req.params;

        const UpdatedUsers = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!UpdatedUsers) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: UpdatedUsers
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
        });
    }

});

app.delete("/user/delete/:id", async (req, res) => {

    console.log("ID recevied", req.params.id);

    try {
        const { id } = req.params;
        const DeletedUsers = await User.findByIdAndDelete(id);

        if (!DeletedUsers) {
            return res.status(404).json({
                sucess: false,
                data: null,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data:DeletedUsers,
            message: "User Deleted Successfully"
        })

    }

    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: error.message
            }
        )

    }
});