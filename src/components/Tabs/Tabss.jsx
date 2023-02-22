import React from 'react';
import './Tabss.css'

import { Tabs } from 'antd';
// const onChange = (key) => {
//   console.log(key);
// };

// const items = [
//   {
//     key: '1',
//     label: `Search`,
//   },
//   {
//     key: '2',
//     label: `Rated`,
//   },
// ];
// defaultActiveKey="1" items={items} onChange={onChange}

const Tabss = () => {
    return(
      <Tabs>
      <Tabs.TabPane tab="tab1" key="tab1">
        <div>Hey</div>
      </Tabs.TabPane>
      <Tabs.TabPane tab="tab2" key="tab2">
        <div>Hey2</div>
      </Tabs.TabPane>
      </Tabs>
)
}
export default Tabss;