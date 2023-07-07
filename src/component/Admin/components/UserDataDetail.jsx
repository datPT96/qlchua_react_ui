import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Row } from 'antd';

function UserDetailData({ img, name, email }) {
    return (
        <Row align="middle">
            <Col span={2}>
                <Avatar size={64} icon={<UserOutlined />} src="img" />
            </Col>
            <Col>
                <p style={{ fontWeight: 600 }}>{name}</p>
                <p>{email}</p>
            </Col>
        </Row>
    );
}

export default UserDetailData;
