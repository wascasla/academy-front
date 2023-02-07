import api from "./api";

export default {
  getAllCourses: function () {
    return api.get(`/api/course`);
  },

  getCourseById: function (id) {
    return api.get(`/api/course/byid/${id}`);
  },

  createCourse: function (data) {
    return api.post(`/api/course`, data);
  },

  updateCourse: function (data) {
    return api.put(`/api/course/update`, data);
  },
};