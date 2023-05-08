import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
////////////////Connection of app with Mongodb atlas ////
mongoose
  .connect(
    "mongodb+srv://19-Arid-839:19arid839@cluster0.6hv8mt2.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Unable to make connection with mongodb", err));
/////Connection of app with Mongodb atlas ////
//  API for Saving Like of NFT in DataBase   //
app.post("/api/like", async (req, res) => {
  try {
    const { _id } = req.body;
    const nft = await Nft.findOneAndUpdate(
      { _id },
      { $inc: { productLikes: 1 } },
      { new: true }
    );
    console.log(nft); // add this line
    if (!nft) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ likes: nft.productLikes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//  API for Saving Likes in DataBase   //
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//  API for Saving NFT Data in DataBase   //
const NftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  price:{type:String,required:true},
   ownerAddress:{type:String,required:true},
   sellerAddress:{type:String,required:true},
  productLikes: {type: Number, default:0// add a default value here
},
  //  createdDate: { type: Date, default: Date.now },
});
const Nft = mongoose.model("Nft", NftSchema);
/////////////////////////////////////////////////////

//////////////////////////////////////////////
app.post("/nfts", async (req, res) => {
  try {
    const { name,  description, fileUrl, price ,ownerAddress,sellerAddress} = req.body;
    const nft = new Nft({ name,  description, fileUrl, price ,ownerAddress,sellerAddress});
    const result = await nft.save();
    // console.log(req.body);
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
//  API for Saving NFT Data in DataBase   //
//////////////////////////////////////////////////////////////////////////////
// API for fetching NFT data from the database
app.get('/api/nfts', async (req, res) => {
  try {
    const nfts = await Nft.find();
    res.json(nfts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// API for showing data from database     //
// API for deleting NFT from the database
app.delete('/api/nfts/:id', async (req, res) => {
  try {
    const nft = await Nft.findOneAndDelete({ _id: req.params.id });
    if (!nft) {
      return res.status(404).json({ message: "NFT not found" });
    }
    res.json({ message: "NFT deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
//////////////////////////////////////////////////////////////////////////////
// Define the schema for the new asset schema
const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  fileUrl: { type: String, required: true },
  price: { type: String, required: true },
  ownerAddress: { type: String, required: true },
  sellerAddress: { type: String, required: true },
  // createdDate: { type: Date, default: Date.now },
});
const Asset = mongoose.model("Asset", AssetSchema);



// API for deleting NFT from the database and transferring to the new asset schema
app.post("/api/buy-now", async (req, res) => {
  try {
    const { _id } = req.body;
    const nft = await Nft.findOne({ _id });
    if (!nft) {
      return res.status(404).json({ message: "NFT not found" });
    }
    const asset = new Asset(nft);
    const result = await Promise.all([
      Nft.deleteOne({ _id }),
      asset.save(),
    ]);
    res.json({ message: "NFT bought successfully", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server running on ${port} `));
////////////////////////////////////////////////////////

