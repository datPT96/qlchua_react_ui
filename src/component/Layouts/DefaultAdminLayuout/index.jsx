import React from 'react';
import { Layout } from 'antd';

import HeaderBar from './HeaderBar';
import SideBar from './SideBar';
const { Header, Content, Sider } = Layout;

function DefaultLayout({ children }) {
    return (
        <Layout>
            <Header
                style={{
                    margin: '0 10px',
                    position: 'sticky',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                }}
            >
                <HeaderBar />
            </Header>
            <Layout>
                <Sider
                    width={250}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        marginTop: 64,
                    }}
                >
                    <SideBar />
                </Sider>
                <Content
                    style={{
                        marginLeft: 250,
                    }}
                >
                    <div className="container">{children}</div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;
