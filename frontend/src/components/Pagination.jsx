import React from 'react';
import { Pagination as AntdPagination } from 'antd';

const Pagination = ({ total, pageSize, current, onChange }) => {
  return (
    <AntdPagination
      total={total}
      pageSize={pageSize}
      current={current}
      onChange={onChange}
      showSizeChanger={false} />
  );
};

export default Pagination;