import React from "react";
import { Alert, Space } from "antd";

const Spacee = () => {
  return (
    <Space direction="vertical">
      <Alert message="Ошибка" description="Нет соеденения с интернетом" type="error" closable />
    </Space>
  );
};

export default Spacee;
