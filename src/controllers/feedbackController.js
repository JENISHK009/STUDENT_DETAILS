import { studentModel } from "../models";
import { ObjectID } from "mongodb";

//TASK 3 :Get- User should able to get all the feedbackschema details for the certain student
const getFeedbackByStdId = async (req, res) => {
  try {
    let { _id } = req.params;
    if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

    let studentData = await studentModel.findOne({ _id });
    if (!studentData) throw new Error("Student details not found");

    studentData.feedback &&
      res.status(200).send({
        success: true,
        data: studentData.feedback,
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//task 3 : Post - User should be able to add data into the feedback schema parameters
const addFeedbackByStdId = async (req, res) => {
  try {
    let { _id } = req.params;
    let { feedback, starRating } = req.body;
    if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

    let studentData = await studentModel.findOne({ _id });
    if (!studentData) throw new Error("Student details not found");
    let update = [
      ...studentData.feedback,
      { feedback: feedback, starRating: starRating },
    ];

    let feedbackSaved = await studentModel.findOneAndUpdate(
      { _id },
      { feedback: update }
    );
    if (!feedbackSaved) throw new Error("something went wrong");

    feedbackSaved &&
      res.status(200).send({
        success: true,
        data: "Feedback saved successfully",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//TASK 3 : Delete- deleting all the feedback schema details 
const deleteAllFeedbackByStdId = async (req, res) => {
  try {
    let { _id } = req.params;
    if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

    let studentData = await studentModel.findOne({ _id });
    if (!studentData) throw new Error("Student details not found");

    studentData.feedback = [];
    let feedbackDeleted = await studentModel.findOneAndUpdate(
      { _id },
      studentData
    );

    feedbackDeleted &&
      res.status(200).send({
        success: true,
        data: "All feedback deleted",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

// task 3.1 :Get- Getting the data for the schema based on the feedback schema id
const getFeedbackByStdIdAndFdId = async (req, res) => {
    try {
        let { _id, feedback_id } = req.params;
        if (!ObjectID.isValid(_id)) throw new Error("Invalid id");

        let studentData = await studentModel.findOne({
            _id,
            "feedback._id": feedback_id,
        });
        if (!studentData) throw new Error("Student feedback not found");

        studentData.feedback = studentData.feedback.filter((obj) => {
            if (obj._id == feedback_id) {
                return obj;
            }
        });

        studentData.feedback &&
            res.status(200).send({
                success: true,
                data: studentData.feedback,
            });
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
        });
    }
};

//TASK 3.1 : Post- User should able to update the strings params already posted.
const updatePostedFeedback = async (req, res) => {
  try {
    let { _id, feedback_id } = req.params;
    let { feedback } = req.body;
    if (!ObjectID.isValid(_id) && !ObjectID.isValid(feedback_id))
      throw new Error("Invalid id");

    let studentData = await studentModel.findOne({
      _id,
      "feedback._id": feedback_id,
    });
    if (!studentData) throw new Error("Student feedback not found");
    studentData.feedback = studentData.feedback.map((obj) => {
      if (obj._id == feedback_id) {
        obj.feedback = feedback ? feedback : obj.feedback;
      }
      return obj;
    });
    let feedbackUpdated = await studentModel.findOneAndUpdate(
      { _id },
      studentData
    );

    feedbackUpdated &&
      res.status(200).send({
        success: true,
        data: "feedback updated",
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

//task 3.2 : User should be able to add consecutive items into the array params and also shouldable to delete items from the array list
const addRemoveFeedbackArray = async (req, res) => {
  try {
    let { _id } = req.params;
    let { needToDeleteFeedback, addFeedback } = req.body;
    let studentData = await studentModel.findOne({
      _id,
    });
    if (!studentData) throw new Error("Student feedback not found");

    if (needToDeleteFeedback) {
      studentData.feedback = studentData.feedback.filter((obj) => {
        if (obj._id != needToDeleteFeedback) {
          return obj;
        }
      });
    }
    if (addFeedback) {
      studentData.feedback.push({
        feedback: addFeedback.feedback ? addFeedback.feedback : "",
        starRating: addFeedback.starRating ? addFeedback.starRating : "",
      });
    }

    let saveData = await studentModel.findOneAndUpdate({ _id }, studentData);
    saveData &&
      res.status(200).send({
        success: true,
        data: studentData.feedback,
      });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export default {
  getFeedbackByStdId,
  addFeedbackByStdId,
  deleteAllFeedbackByStdId,
  updatePostedFeedback,
  getFeedbackByStdIdAndFdId,
  addRemoveFeedbackArray,
};
