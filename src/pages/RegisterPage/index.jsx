import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Upload, message } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import userApi from '~/api/userApi';

import styles from '~/pages/RegisterPage/styles.module.scss';
const formItemLayout = {
    labelAlign: 'left',
    labelWrap: true,
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
        md: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
        md: {
            span: 16,
        },
    },
};
// const tailFormItemLayout = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 16,
//             offset: 8,
//         },
//     },
// };

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

function RegisterPage() {
    const [fileList, setFileList] = useState([]);
    const [imageUrl, setImageUrl] = useState();

    const getBase64 = (img) => {
        let reader = new FileReader();
        let base64String;
        reader.readAsDataURL(img);
        reader.onload = function () {
            base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
            setImageUrl(base64String);
            // console.log(base64String);
        };
    };
    const handleChange = (info) => {
        console.log(info);
        if (info.file.status === 'removed') {
            setImageUrl('');
        }
    };

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            // getBase64(e.file?.originFileObj);
            return e;
        }
        return e?.fileList;
    };

    const onFinish = (value) => {
        try {
            value.anhChup = imageUrl;
            console.log(value);
            const res = userApi.signup(value);
            console.log(res);
            message.success('Đăng ký thành công');
        } catch (error) {
            message.error('Đăng ký thất bại');
        }
    };

    return (
        <div className={clsx(styles.container)}>
            <Form
                name="registerFrom"
                {...formItemLayout}
                initialValues={{
                    gioiTinh: 'nam',
                }}
                onFinish={onFinish}
                style={{
                    paddingTop: 64,
                }}
            >
                <Row gutter={(16, 16)} justify="center">
                    <Col span={8}>
                        <Form.Item
                            label="Họ"
                            name="ho"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập họ',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập họ" />
                        </Form.Item>
                        <Form.Item
                            label="Tên đệm"
                            name="tenDem"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên đệm',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên đệm" />
                        </Form.Item>
                        <Form.Item
                            label="Tên"
                            name="ten"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập tên',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên" />
                        </Form.Item>
                        <Form.Item
                            label="Pháp danh"
                            name="phapDanh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập pháp danh',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập pháp danh" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày sinh"
                            name="ngaySinh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập ngày sinh',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập ngày sinh" />
                        </Form.Item>
                        <Form.Item
                            label="Số điện thoại"
                            name="soDienThoai"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập số điện thoại',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập số điện thoại" />
                        </Form.Item>
                        <Form.Item
                            label="Ngày xuất gia"
                            name="ngayXuatGia"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập ngày xuất gia',
                                },
                            ]}
                        >
                            <Input placeholder="Nhập ngày xuất ra" />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="Giới tính" name="gioiTinh">
                            <Select placeholder="Giới tính">
                                <Select.Option value="nam">Nam</Select.Option>
                                <Select.Option value="nu">Nữ</Select.Option>
                                <Select.Option value="other">Khác</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Chùa" name="chua">
                            <Select placeholder="Chọn chùa">
                                <Select.Option value="1">Chùa 1</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập email',
                                },
                                {
                                    type: 'email',
                                    message: 'Email không hợp lệ',
                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập mật khẩu',
                                },
                                {
                                    pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&+=]).{8,}$',
                                    message:
                                        'Mật khẩu phải có tối thiểu 8 ký tự có cả chữ hoa chữ thường và ký tự đặc biệt',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Nhập lại mật khẩu',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu nhập không trùng khớp!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Nhập lại mật khẩu" />
                        </Form.Item>
                        <Form.Item
                            name="anhChup"
                            label="Ảnh chụp"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                maxCount={1}
                                customRequest={(info) => {
                                    getBase64(info.file);
                                    setFileList(info.file);
                                }}
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                <Button icon={<UploadOutlined />}></Button>
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>
                <Row align="middle" justify="center">
                    <Form.Item>
                        <Button htmlType="submit" type="primary">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Row>
            </Form>
        </div>
    );
}

export default RegisterPage;
