// // admin/src/api/robotApi.js
// import axios from "axios";

// // Base API URL
// const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api/robot";

// // ==============================
// // Create Robot (with images upload)
// // ==============================
// export const createRobot = async (formData, token) => {
//   try {
//     const res = await axios.post(API_URL, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// // ==============================
// // Get All Robots
// // ==============================
// export const getRobots = async (token) => {
//   try {
//     const res = await axios.get(API_URL, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// // ==============================
// // Get Single Robot by ID
// // ==============================
// export const getRobotById = async (id, token) => {
//   try {
//     const res = await axios.get(`${API_URL}/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// // ==============================
// // Update Robot
// // ==============================
// export const updateRobot = async (id, formData, token) => {
//   try {
//     const res = await axios.put(`${API_URL}/${id}`, formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };

// // ==============================
// // Delete Robot
// // ==============================
// export const deleteRobot = async (id, token) => {
//   try {
//     const res = await axios.delete(`${API_URL}/${id}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw error.response?.data || error.message;
//   }
// };
