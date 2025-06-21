const express = require("express")
const mongoose = require("mongoose")
const multer  = require('multer')
const {storage} = require('./cloudConfig.js')
const cors = require('cors')
const nodemailer = require("nodemailer");
const Item = require('./models/item.js')
const upload = multer({ storage })

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


mongoose.connect("mongodb+srv://noobsingh674:N0YNwMUtBhozpy2L@cluster4.diwo8sm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4").then(()=>{
    console.log("connected to the database")
})

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})


app.post("/add", upload.fields([
    { name: 'cover_Image', maxCount: 1 },
    { name: 'additionalImages', maxCount: 10 }
  ]), async (req, res) => {
    try {


      const { itemName, itemType, Item_Description } = req.body;

      if (!req.files || !req.files['cover_Image']) {
        console.log('No cover image uploaded');
        return res.status(400).json({ message: "Cover image is required" });
    }

  
      const cover_Image = req.files['cover_Image']?.[0]?.path;
      const additionalImages = req.files['additionalImages']?.map(file => file.path) || [];
  
      const newItem = new Item({
        itemName,
        itemType,
        Item_Description,
        cover_Image,
        additionalImages
      });
  
      await newItem.save();
      res.status(200).json({ message: "Data added successfully" });
  
    } catch (e) {
      console.error("Error in /add route:", e);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });


app.get('/view',async (req,res)=>{
    let data = await Item.find({});
    console.log(data)
    res.send(data)
  })


app.post('/enquire',async (req,res)=>{
  let itemName = req.body.itemName


  if(!itemName){
    return res.status(400).json({message:"Missing item Name"});
  }
  try{
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
          user: 'cloyd.kirlin75@ethereal.email',
          pass: 'x3ZsKvpHaKABrUBzZH'
      }
  });

    await transporter.sendMail({
      from:'"Item Enquiry" <yourEmail@gmail.com>',
      to: "noobsingh674@gmail.com", // static email address
      subject: `Enquiry: ${itemName}`,
      text: 'A user has enquired about the item.',
      html: `${itemName}`,
    })
    res.status(200).json({ message: "Enquiry email sent successfully." });
  }
  catch(err){
    console.error("Error sending enquiry email:", err);
    res.status(500).json({ message: "Failed to send enquiry." });
  }
})