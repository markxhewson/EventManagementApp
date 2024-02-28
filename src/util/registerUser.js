const registerUser = async (formData) => {
    try {
        const data = await fetch(`http://81.0.246.142:3001/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
            },
            body: JSON.stringify(formData)
        });
    
        if (!data.ok) {
            return null;
        }
    
        return await data.json();
    } catch (exception) {
        return null;
    }
};

export default registerUser;