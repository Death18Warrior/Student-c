export async function getStudentProfile() {
    try {
        const response = await fetch('http://16.16.25.254:8000/api/v1/students/profile/2/');
        if (!response.ok) {
            throw new Error('Failed to fetch student profile');
        }
        const data = await response.json();
        
        const firstName = data.full_name ? data.full_name.split(' ')[0] : 'User';

        return { ...data, firstName };
    } catch (error) {
        console.error('Error fetching student profile:', error);
        return { firstName: 'User' }; // Return a default value
    }
}
