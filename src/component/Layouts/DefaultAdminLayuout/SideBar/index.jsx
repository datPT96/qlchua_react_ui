import React from 'react';
import { Menu } from 'antd';
import { FileOutlined, HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function getItem(label, key, icon, children) {
    return {
        label,
        key,
        icon,
        children,
    };
}
const items = [
    getItem(<Link to="../admin">Bảng tin</Link>, '1', <HomeOutlined />),
    getItem('Phật Tử', 'sub1', <UserOutlined />, [getItem(<Link to="phat-tu">Danh sách phật tử</Link>, '2')]),
    getItem('Duyệt Đơn', 'sub2', <TeamOutlined />, [getItem('Đơn chưa duyệt', '3'), getItem('Đơn đã duyệt', '4')]),
    getItem('Files', '5', <FileOutlined />),
];

function SideBar() {
    const onClick = (e) => {};

    return (
        <Menu
            onClick={onClick}
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
                height: '100%',
                borderRight: 0,
            }}
            items={items}
        />
    );
}

export default SideBar;
