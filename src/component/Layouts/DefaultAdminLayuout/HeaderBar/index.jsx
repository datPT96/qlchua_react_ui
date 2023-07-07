import { Button, Col, Image, Row } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import logo from '~/assets/images/logo192.png';
import UserInfo from '~/component/Common/UserInfo';

function HeaderBar() {
    return (
        <Row>
            <Col md={12}>
                <Row justify="start" align="middle">
                    <Button style={{ border: 'none', background: '#fff' }}>
                        <MenuOutlined style={{ fontSize: 20, color: 'orange' }} />
                    </Button>
                    <Link to="/admin">
                        <Image width={40} src={logo} preview={false} />
                    </Link>
                </Row>
            </Col>
            <Col md={12}>
                <UserInfo />
            </Col>
        </Row>
    );
}

export default HeaderBar;
