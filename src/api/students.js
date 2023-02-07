import api from "./api";

export default {
  getAllStudents: function (data) {
    return api.post(`/api/student`, data);
  },

  getStudentById: function (id) {
    return api.get(`/api/student/byid/${id}`);
  },

  createStudent: function (data) {
    return api.post(`/api/student/create`, data);
  },

  addEnrollment: function (data) {
    return api.post(`/api/student/addCourse`, data);
  },

  addFamily: function (data) {
    return api.post(`/api/student/addParent`, data);
  },

  updateStudent: function (data) {
    return api.put(`/api/student/update`, data);
  },
    
};