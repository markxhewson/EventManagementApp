const verifyToken = async (token) => {
    try {
        const response = await fetch(`/api/auth/verify`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api-key': "43d44abf-qlgl-6322-jujw-3b3a9e711f75",
                'authorization': `${token}`
            }
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        return null;
    }
};

export default verifyToken;