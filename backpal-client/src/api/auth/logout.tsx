export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiresAt');
};