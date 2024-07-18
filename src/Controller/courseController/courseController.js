import courseModel from "../../Model/Courses/courseModel.js";

const courseController = {
  createCourse: async (req, res) => {
    const { title, price, description, imageUrl, videoUrl } = req.body;

    try {
      const course = await courseModel.create({
        title,
        price,
        description,
        imageUrl,
        videoUrl,
      });

      res.status(201).json(course); // Respond with the newly created course object
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  getAllCourse: async (req, res) => {
    try {
      const courses = await courseModel.findAll();
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: "Courses not found" });
      }

      res.json({ message: "Courses are", courses });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },

  getSingleCourse: async (req, res) => {
    const { id } = req.params;
    try {
      let course = await courseModel.findByPk(id);
      if (!course) {
        return res.status(400).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  },
};
export default courseController;
