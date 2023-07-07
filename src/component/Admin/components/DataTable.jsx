import { Table } from 'antd';

const columns = [
    {
        title: '#',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        width: 50,
    },
    {
        title: 'Thao tác',
        dataIndex: 'action',
        key: 'action',
        align: 'center',
        width: 100,
    },
    {
        title: 'Phật tử',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Ngày xuất gia',
        dataIndex: 'date',
        key: 'date',
        width: 250,
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
        key: 'phone',
        width: 250,
    },
    {
        title: 'Số buổi tham gia đạo tràng',
        dataIndex: 'attended',
        key: 'attended',
        width: 150,
    },
];
function DataTable({ dataSource, loading }) {
    return (
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
                bordered={true}
                loading={loading}
                pagination={false}
                scroll={{
                    y: 450,
                }}
            />
        </div>
    );
}

export default DataTable;
