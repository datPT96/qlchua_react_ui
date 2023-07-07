import { Breadcrumb, Col, Divider, Form, Input, Layout, Pagination, Popconfirm, Row, Select, message } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useRef, useState } from 'react';
import { DeleteOutlined, FormOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import userApi from '~/api/userApi';
import DataTable from './DataTable';
import UserDetailData from './UserDataDetail';

const items = [
    {
        title: 'Home',
    },
    {
        title: 'Danh sách phật tử',
    },
];

const token = localStorage.getItem('AccessToken');
const config = {
    headers: {
        Authorization: `Bearer ${token}`,
    },
};

function ListMember() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState(0);
    const [params, setParams] = useState({
        phapDanh: '',
        gioiTinh: '',
        trangThai: '',
    });

    const formRef = useRef();

    const navigate = useNavigate();

    const onChange = () => {
        formRef.current.submit();
        setLoading(true);
    };

    const onFinish = (e) => {
        setParams({
            phapDanh: e.phapDanh,
            gioiTinh: e.gioiTinh === 0 ? null : e.gioiTinh,
            trangThai: e.trangThai === 0 ? null : e.trangThai,
        });
    };

    const onPageChange = (page) => {
        // console.log(page);
        setPage(page);
    };

    const onShowSizeChange = (current, pageSize) => {
        setPage(current);
        setSize(pageSize);
    };

    useEffect(() => {
        const getAll = async (page, size, params) => {
            try {
                const response = await userApi.getAll({ page, size, ...params }, config);
                // console.log(response.content);
                const listAttended = response?.content?.phatTuDaoTrangList?.filter((item) => item.daThamGia);
                const listData = response?.content.map((item, index) => {
                    return {
                        key: `${index}`,
                        index: `${item.idPhatTu}`,
                        name: (
                            <UserDetailData
                                img={item.anhChup}
                                name={`${item.ho} ${item.tenDem === null ? '' : item.tenDem} ${item.ten}`}
                                email={item.email}
                            />
                        ),
                        date: `${item.ngayXuatGia}`,
                        phone: `${item.soDienThoai}`,
                        attended: `${listAttended?.length ? listAttended.length : 0}`,
                        action: (
                            <>
                                <FormOutlined
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        navigate(`${item.idPhatTu}`);
                                    }}
                                />
                                <Divider type="vertical" />
                                <Popconfirm
                                    title="Xóa phật tử"
                                    onConfirm={() => {
                                        try {
                                            userApi.deleteById(item?.idPhatTu, config);
                                            message.success('Xóa thành công');
                                        } catch (error) {
                                            message.error('Xoa thất bại');
                                        }
                                    }}
                                >
                                    <DeleteOutlined style={{ cursor: 'pointer' }} />
                                </Popconfirm>
                            </>
                        ),
                    };
                });
                // console.log(response.totalElements);
                setTotalPage(response?.totalElements);
                setDataSource(listData);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getAll(page, size, params);
    }, [page, size, params]);
    return (
        <Layout>
            <Content>
                <Breadcrumb separator=">" items={items} />
                <Row>
                    <h3>Danh sách phật tử</h3>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form
                            ref={formRef}
                            initialValues={{
                                phapDanh: '',
                                gioiTinh: 0,
                                trangThai: 0,
                            }}
                            onFinish={onFinish}
                        >
                            <b>Tìm kiếm phật tử</b>
                            <Row>
                                <Col span={8} style={{ padding: '0 10px' }}>
                                    <p>Pháp danh</p>
                                    <Form.Item name="phapDanh">
                                        <Input onInput={onChange} />
                                    </Form.Item>
                                </Col>
                                <Col span={8} style={{ padding: '0 10px' }}>
                                    <p>Giới tính</p>
                                    <Form.Item name="gioiTinh">
                                        <Select
                                            onChange={onChange}
                                            placeholder="Giới tính"
                                            options={[
                                                {
                                                    value: 0,
                                                    label: 'Tất cả',
                                                },
                                                {
                                                    value: 1,
                                                    label: 'Nam',
                                                },
                                                {
                                                    value: 2,
                                                    label: 'Nữ',
                                                },
                                                {
                                                    value: 3,
                                                    label: 'Other',
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8} style={{ padding: '0 10px' }}>
                                    <p>Trạng thái</p>
                                    <Form.Item name="trangThai">
                                        <Select
                                            onChange={onChange}
                                            placeholder="Trạng thái"
                                            options={[
                                                {
                                                    value: 0,
                                                    label: 'Tất cả',
                                                },
                                                {
                                                    value: false,
                                                    label: 'Chưa hoàn tục',
                                                },
                                                {
                                                    value: true,
                                                    label: 'Đã hoàn tục',
                                                },
                                            ]}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Row align="middle" justify="end">
                            <Pagination
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                onChange={onPageChange}
                                current={page}
                                // defaultCurrent={1}
                                total={totalPage}
                            />
                            <Col>
                                <Input prefix={<SearchOutlined />} placeholder="Tìm kiếm" />
                            </Col>
                        </Row>
                        <DataTable dataSource={dataSource} loading={loading} />
                    </Col>
                </Row>
            </Content>
        </Layout>
    );
}

export default ListMember;
