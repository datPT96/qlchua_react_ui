const { redirect } = require('react-router-dom');

const loadAdmin = () => {
    const token = localStorage.getItem('AccessToken');
    const isAdmin = localStorage.getItem('isAdmin');
    if (token === null && !isAdmin) {
        return redirect('/login');
    }
    return null;
};

export default loadAdmin;
