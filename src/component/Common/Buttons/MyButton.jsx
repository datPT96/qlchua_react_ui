import { Button, ConfigProvider } from 'antd';

function MyButton({ children }) {
    return (
        <ConfigProvider
            componentSize="large"
            theme={{
                token: {
                    colorTextLightSolid: '#00ff00',
                    colorPrimary: '#ff0000',
                    borderRadius: 6,
                },
            }}
        >
            <Button type="primary">{children}</Button>
        </ConfigProvider>
    );
}

export default MyButton;
