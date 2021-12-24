import { studentModel } from "../models";
import { ObjectID } from "mongodb";


// TAST 1 :  GET :Getting the details of the student based on class (single and multiple params to bepassed)
const getStudentData = async (req, res) => {
  try {
    let { Class } = req.body;
    let filter = {};
    if (Class) {
      filter = { ...filter, class: { $in: Class } }
    }

    let studentData = await studentModel
      .find(filter)
      .sort({ class: -1 });

    if (!studentData) throw new Error("student data not found");

    studentData &&
      res.status(200).send({
        success: true,
        data: studentData,
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


// TAST 1 :  POST -User should be able to Post Data into the above mentioned fields
const saveStudentData = async (req, res) => {
  try {
    let { body } = req;
    let { admissionNumber } = body;

    let admissionNumberAvailable = await studentModel.findOne({
      admissionNumber,
    });
    if (admissionNumberAvailable)
      throw new Error("Admission number already register");

    let studentDataSaved = await studentModel.create(body);

    studentDataSaved &&
      res.status(200).send({
        success: true,
        message: "Student data saved successfully",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


// TAST 1 : Delete all data
const deleteAllStudentData = async (req, res) => {
  try {
    let studentDataDeleted = await studentModel.deleteMany();

    if (!studentDataDeleted)
      throw new Error("Something went wrong while deleting student details");

    studentDataDeleted &&
      res.status(200).send({
        success: true,
        messsage: "Student details deleted successfully",
      });
  } catch (error) {
    res.status(400).send({
      success: fasle,
      message: error.message,
    });
  }
};

//TAST 2 : Get - User should able to get the data based on the id
const getStudentDataById = async (req, res) => {
  try {
    let { _id } = req.params;
    if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

    let studentData = await studentModel.findOne({ _id });
    if (!studentData) throw new Error("student data not found");

    studentData &&
      res.status(200).send({
        success: true,
        data: studentData,
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//TASK 2 : can use for handling string items if needed
//   2.1- User should able to update the strings params already posted .
const updateStudentDataById = async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, Class } = req.body;
    if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

    let studentData = await studentModel.findOne({ _id });
    if (!studentData) throw new Error("student data not found");
    let update = {};
    if (name) update = { ...update, name: name.toString() };
    if (Class) update = { ...update, class: Class.toString() };

    let updatedStringData = await studentModel.updateOne({ _id }, update);
    updatedStringData &&
      res
        .status(200)
        .send({ success: true, message: "Student data updated successfully" });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//TASK 2 : Delete - Deleting the certain item
const deleteCertainDataById = async (req, res) => {
  try {
    let { _id } = req.params;
    if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

    let studentDataDeleted = await studentModel.findOneAndRemove({ _id })
    if (!studentDataDeleted) throw new Error('student data not found')

    studentDataDeleted &&
      res.status(200).send({
        success: true,
        message: "Stunde details deleted successfully",
      });

  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// TASK 2 : 2.2- User should be able to add consecutive items into the array params and also should able to delete items from the array list
const addRemoveMarksById = async (req, res) => {
  try {
    let { _id } = req.params;
    let { addMarks, removeMarks } = req.body;
    if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

    let studentData = await studentModel.findOne({ _id });
    if (!studentData) throw new Error("Student not found");

    let marksArray = studentData.marks;
    if (removeMarks) {
      let onlyOneRemove = false;
      marksArray = marksArray.filter((obj) => {
        if (obj != removeMarks.toString()) {
          return obj;
        } else if ((onlyOneRemove == false, obj == removeMarks.toString())) {
          removeMarks = "";
        }
      });
    }
    if (addMarks) {
      marksArray.push(addMarks.toString());
    }
    let updateMarksData = await studentModel.findOneAndUpdate(
      { _id },
      { marks: marksArray }
    );

    updateMarksData &&
      res.status(200).send({
        success: true,
        marks: marksArray,
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};


export default {
  saveStudentData,
  getStudentData,
  deleteAllStudentData,
  getStudentDataById,
  updateStudentDataById,
  addRemoveMarksById,
  deleteCertainDataById
};
