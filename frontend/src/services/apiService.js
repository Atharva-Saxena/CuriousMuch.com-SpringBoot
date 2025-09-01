import api from './api';

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  }
};

export const questionService = {
  getAllQuestions: async (page = 0, size = 10) => {
    const response = await api.get(`/questions?page=${page}&size=${size}`);
    return response.data;
  },

  getQuestionById: async (id) => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  },

  createQuestion: async (questionData) => {
    const response = await api.post('/questions', questionData);
    return response.data;
  },

  updateQuestion: async (id, questionData) => {
    const response = await api.put(`/questions/${id}`, questionData);
    return response.data;
  },

  deleteQuestion: async (id) => {
    const response = await api.delete(`/questions/${id}`);
    return response.data;
  },

  searchQuestions: async (query, page = 0, size = 10) => {
    const response = await api.get(`/questions/search?q=${query}&page=${page}&size=${size}`);
    return response.data;
  },

  getQuestionsByCategory: async (category, page = 0, size = 10) => {
    const response = await api.get(`/questions/category/${category}?page=${page}&size=${size}`);
    return response.data;
  }
};

export const answerService = {
  getAnswersByQuestionId: async (questionId) => {
    const response = await api.get(`/questions/${questionId}/answers`);
    return response.data;
  },

  createAnswer: async (questionId, answerData) => {
    const response = await api.post(`/questions/${questionId}/answers`, answerData);
    return response.data;
  },

  updateAnswer: async (id, answerData) => {
    const response = await api.put(`/answers/${id}`, answerData);
    return response.data;
  },

  deleteAnswer: async (id) => {
    const response = await api.delete(`/answers/${id}`);
    return response.data;
  },

  markAsBestAnswer: async (id) => {
    const response = await api.post(`/answers/${id}/mark-best`);
    return response.data;
  },

  voteOnAnswer: async (id, voteData) => {
    const response = await api.post(`/answers/${id}/vote`, voteData);
    return response.data;
  },

  removeVote: async (id) => {
    const response = await api.delete(`/answers/${id}/vote`);
    return response.data;
  }
};