const API_BASE_URL = 'http://localhost:5000/api';

export const getAllTeamMembers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch team members:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/me`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch current user:", error);
    throw error;
  }
};

export const createTeamMember = async (memberData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(memberData)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not create team member:", error);
    throw error;
  }
};

export const updateTeamMemberStatus = async (memberId, status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${memberId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not update status for member ${memberId}:`, error);
    throw error;
  }
};

export const updateTeamMemberWorkingHours = async (memberId, workingHours) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${memberId}/working-hours`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ workingHours })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not update working hours for member ${memberId}:`, error);
    throw error;
  }
};

export const updateTeamMemberTimezone = async (memberId, timezone) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${memberId}/timezone`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ timezone })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not update timezone for member ${memberId}:`, error);
    throw error;
  }
};

export const deleteTeamMember = async (memberId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${memberId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.status === 204 ? null : await response.json();
  } catch (error) {
    console.error(`Could not delete team member ${memberId}:`, error);
    throw error;
  }
};

export const testMongoDBConnection = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/test-connection`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Could not test MongoDB connection:", error);
      throw error;
    }
  };
