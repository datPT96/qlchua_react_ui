import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, Input, Row, Select, Upload, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import chuaApi from '~/api/chuaApi';

import userApi from '~/api/userApi';
const token = localStorage.getItem('AccessToken');
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

function UserDetail() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [chuas, setChuas] = useState([]);

    const [form] = Form.useForm();

    const onFinish = (value) => {
        console.log(value);
        userApi.updateUser(value.idPhatTu, value, config);
        return message.success('Sửa thành công');
    };

    useEffect(() => {
        form.resetFields();
        const getChuas = async () => {
            const list = await chuaApi.getAll(config);
            console.log(list);
            setChuas(list);
        };
        getChuas();

        const getUser = async (id) => {
            const user = await userApi.getUserById(id, config);
            setUser(user);
            console.log(user);
        };
        getUser(id);
        form.setFieldsValue({
            idPhatTu: user.idPhatTu,
            ho: user?.ho,
            tenDem: user?.tenDem,
            ten: user?.ten,
            phapDanh: user?.phapDanh,
            soDienThoai: user.soDienThoai,
            ngaySinh: user?.ngaySinh,
            ngayXuatGia: user?.ngayXuatGia,
            chua: user.chua?.idChua,
            gioiTinh: user?.gioiTinh === 1 ? 'nam' : user?.gioiTinh === 2 ? 'nu' : 'other',
        });
    }, [
        id,
        form,
        user.idPhatTu,
        user?.ho,
        user?.tenDem,
        user?.ten,
        user?.phapDanh,
        user.soDienThoai,
        user?.ngaySinh,
        user?.ngayXuatGia,
        user.chua?.idChua,
        user?.gioiTinh,
    ]);

    return (
        <Form
            name="user"
            form={form}
            onFinish={onFinish}
            style={{
                paddingTop: 64,
            }}
        >
            <Row gutter={(16, 16)} justify="center">
                <Col span={8}>
                    <Form.Item name="idPhatTu" label="#">
                        <Input disabled />
                    </Form.Item>
                    <Form.Item label="Họ" name="ho">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Tên đệm" name="tenDem">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Tên" name="ten">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Pháp danh" name="phapDanh">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ngày sinh" name="ngaySinh">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="soDienThoai">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Ngày xuất gia" name="ngayXuatGia">
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Giới tính" name="gioiTinh">
                        <Select>
                            <Select.Option value="nam">Nam</Select.Option>
                            <Select.Option value="nu">Nữ</Select.Option>
                            <Select.Option value="other">Khác</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Chùa" name="idChua">
                        <Select>
                            {chuas &&
                                chuas.map((item) => {
                                    return (
                                        <Select.Option key={item?.idChua} value={item?.idChua}>
                                            {item?.tenChua}
                                        </Select.Option>
                                    );
                                })}
                            {/* <Select.Option value="1">Chùa 1</Select.Option> */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="anhChup"
                        label="Ảnh chụp"
                        valuePropName="fileList"
                        // getValueFromEvent={normFile}
                    >
                        <Upload
                        // maxCount={1}
                        // customRequest={(info) => {
                        //     getBase64(info.file);
                        //     setFileList(info.file);
                        // }}
                        // beforeUpload={beforeUpload}
                        // onChange={handleChange}
                        >
                            <Button icon={<UploadOutlined />}></Button>
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            <Row align="middle" justify="center">
                <Form.Item>
                    <Button htmlType="submit" type="primary">
                        Sửa thông tin
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
}

export default UserDetail;
