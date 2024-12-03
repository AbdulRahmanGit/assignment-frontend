/*const API_BASE_URL = 'http://localhost:5000';*/
const API_BASE_URL = 'https://assignment-portal-mu.vercel.app';


const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
};

const getHeaders = (token, contentType = 'application/json') => ({
  'Content-Type': contentType,
  ...(token && { 'Authorization': `Bearer ${token}` }),
});

export const api = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  getAdmins: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/users/admins`, {
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  getUserAssignments: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/users/assignments`, {
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  submitAssignment: async (token, formData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    return handleResponse(response);
  },

  getAdminAssignments: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/assignments`, {
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  updateAssignmentStatus: async (token, assignmentId, action) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/assignments/${assignmentId}/${action}`, {
      method: 'POST',
      headers: getHeaders(token),
    });
    return handleResponse(response);
  },

  addFeedback: async (token, assignmentId, feedback) => {
    const response = await fetch(`${API_BASE_URL}/api/admin/assignments/${assignmentId}/feedback`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify({ feedback }),
    });
    return handleResponse(response);
  },
};

