const loginUser = async (username, password) => {
    try {
        const response = await fetch(`/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75"
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        return null;
    }
}

export default loginUser;