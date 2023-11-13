import { BaseApi } from '@/utils/BaseApi';
const api = new BaseApi();

export async function setupAdminAccount(formData) {
  try {
    const response = await api.loadByPost('/api/init', formData);

    if (response.status === 200) {
      return { success: true, message: 'Admin account setup successful!' };
    } else {
      console.error('Error setting up admin account');
      return { success: false, message: 'Failed to set up admin account. Please try again.' };
    }
  } catch (error) {
    console.error('Error:', error);
    return { success: false, message: 'An error occurred while setting up the admin account.' };
  }
}
