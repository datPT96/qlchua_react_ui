import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import userApi from '~/api/userApi';

function LoginPage() {
    const [api, contextHolder] = notification.useNotification();
    let navigate = useNavigate();

    const onFinish = async (values) => {
        // console.log('Form data', values);
        try {
            const res = await userApi.signin(values);
            console.log(res);
            localStorage.setItem('userId', res.idPhatTu);
            localStorage.setItem('AccessToken', res.token);
            openNotificationWithIcon('success', 'Đăng nhập thành công');
            if (res.kieuThanhVien.code === 'ADMIN') {
                localStorage.setItem('isAdmin', true);
                return navigate('/admin');
            } else if (res.kieuThanhVien.code === 'MEMBER') {
                return navigate('/');
            }
            return null;
        } catch (error) {
            openNotificationWithIcon('error', 'Đăng nhập thất bại', 'Email/Password không đúng');
        }
    };

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message,
            description,
        });
    };

    return (
        <Row
            justify="center"
            align="middle"
            style={{
                height: '100vh',
            }}
        >
            {contextHolder}
            <Col span={4}>
                <h2>Welcome back</h2>
                <Form
                    name="loginForm"
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập email của bạn!',
                            },
                            {
                                type: 'email',
                                message: 'Email không hợp lệ',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập mật khẩu của bạn!',
                            },
                            {
                                pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}$',
                                message:
                                    'Mật khẩu phải có tối thiểu 8 ký tự có cả chữ hoa chữ thường và ký tự đặc biệt',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
                    </Form.Item>
                    {/* <Form.Item name="remember" noStyle valuePropName="checked">
                        <Checkbox>Lưu đăng nhập</Checkbox>
                    </Form.Item> */}
                    <Button type="link">
                        <Link>Quên mật khẩu?</Link>
                    </Button>
                    <Form.Item noStyle>
                        <Button
                            htmlType="submit"
                            type="primary"
                            style={{
                                width: '100%',
                                marginBottom: 10,
                            }}
                        >
                            Đăng nhập
                        </Button>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="link">
                            <Link to="/register">Đăng ký tài khoản</Link>
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
}

export default LoginPage;
