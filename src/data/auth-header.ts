export function authHeader(): { 'Authorization'?: string } {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export function isAdmin() {
    const user = JSON.parse(localStorage.getItem('user'));

    return user && user.token;
}