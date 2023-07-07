import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Row } from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import styles from '~/component/Layouts/DefaultAdminLayuout/style.module.scss';
import userApi from '~/api/userApi';
import { useNavigate } from 'react-router-dom';

function UserInfo() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const loadUser = async () => {
        const id = localStorage.getItem('userId');
        const token = localStorage.getItem('AccessToken');
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const user = await userApi.getUserById(id, config);
            // console.log(user);
            setUser(user);
        } catch (error) {
            console.log(error);
        }
    };

    const doLogout = () => {
        localStorage.removeItem('AccessToken');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <Row justify="end" align="middle">
            <Avatar className={clsx(styles.mr1)} size="large" icon={<UserOutlined />} />
            <span className={clsx(styles.mr1)}>{user.ten}</span>
            <Button style={{ background: '#fff' }} onClick={doLogout}>
                Logout
            </Button>
        </Row>
    );
}

export default UserInfo;
