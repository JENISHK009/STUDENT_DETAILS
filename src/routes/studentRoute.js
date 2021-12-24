import express from "express";
import { studentController, feedbackController } from "../controllers";

export default express
  .Router()
  .post("/", studentController.saveStudentData)
  .get("/", studentController.getStudentData)
  .delete("/", studentController.deleteAllStudentData)

  .get("/:_id", studentController.getStudentDataById)
  .put("/:_id", studentController.updateStudentDataById)
  .delete("/:_id", studentController.deleteCertainDataById)
  .post("/addRemoveMarks/:_id", studentController.addRemoveMarksById)

  .get("/:_id/feedback", feedbackController.getFeedbackByStdId)
  .post("/:_id/feedback", feedbackController.addFeedbackByStdId)
  .delete("/:_id/feedback", feedbackController.deleteAllFeedbackByStdId)

  .get("/:_id/feedback/:feedback_id", feedbackController.getFeedbackByStdIdAndFdId)
  .post("/:_id/feedback/:feedback_id", feedbackController.updatePostedFeedback)
  .put("/:_id/addRemoveFeedbackArray", feedbackController.addRemoveFeedbackArray)
 



