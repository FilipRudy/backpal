export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    const expiresAt = localStorage.getItem('tokenExpiresAt');

    if (!token || !expiresAt) {
        return false;
    }

    const currentTime = new Date().getTime();
    return currentTime < parseInt(expiresAt, 10);
};