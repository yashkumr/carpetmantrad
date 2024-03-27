import slugify from "slugify";
import sizeModel from "../modal/sizeModel.js";

//createSizeController
export const createSizeController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingColor = await sizeModel.findOne({ name });
    if (existingColor) {
      return res.status(200).send({
        success: false,
        message: "Color Already Exists",
      });
    }
    const color = await new sizeModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New Color Created Successfully",
      color,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error getting size",
    });
  }
};
//updateSizeController
export const updateSizeController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const size = await sizeModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Size Updated Successfully",
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error to updating size",
      error,
    });
  }
};

//sizeController
export const sizeController = async (req, res) => {
  try {
    const size = await sizeModel.find({});
    res.status(200).send({
      success: true,
      message: "All Size List",
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all size",
    });
  }
};

//singleSizeController
export const singleSizeController = async (req, res) => {
  try {
    const size = await sizeModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single size Successfully",
      size,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Size",
    });
  }
};
//deleteSizeController
export const deleteSizeController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModal.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Size Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting size",
      error,
    });
  }
};
