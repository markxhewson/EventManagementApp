const registerUser = async (formData) => {
    try {
        const data = await fetch(`/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
            },
            body: JSON.stringify(formData)
        });

        const response = await data.json();

        if (data.ok) {
            return response;
        } else {
            if (response.error) {
                return response;
            } else {
                return null;
            }
        }
    } catch (exception) {
        return null;
    }
};

export default registerUser;