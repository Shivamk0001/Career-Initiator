import College from "../models/College.js";
import Course from "../models/Course.js";
import Exam from "../models/Exam.js";
import Career from "../models/Career.js";
import Blog from "../models/Blog.js";

export const resourceMap = {
  colleges: College,
  courses: Course,
  exams: Exam,
  careers: Career,
  blogs: Blog
};
