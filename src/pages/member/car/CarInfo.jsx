import React, { useEffect } from 'react';
import { Col, Row, Stack} from 'react-bootstrap';
import styles from '../member.module.css';
import CarDetail from './CarDetail';
import CarInsert from './CarInsert';
import { useDispatch, useSelector } from 'react-redux';
import { getCarList, setDetail } from '../../../redux/carSlice';
import { ConfigProvider, Table } from 'antd';

const CarInfo = () => {
  const dispatch = useDispatch();
  const carList = useSelector((state) => state.carSlice.value);

  useEffect(() => {
    dispatch(getCarList());
  }, [dispatch]);

  const handleRowClick = (car) => {
    dispatch(setDetail(car));
  };

  return (
    <>
      <div className={styles.InnerMemberLayout3}>
        <div className={styles.leftMemberLayout}>
          <Row>
            <Col>
              <h2>&nbsp;▶︎&nbsp;차량목록</h2>
            </Col>
          </Row>
          <Stack>
            <div className="col border border-white border-2">
            <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                borderColor: '#d9d9d9', //hex색표 
                                    },
                                },
                            }}
            >
                  <Table
                dataSource={carList}
                bordered
                pagination={{ position: ['bottomCenter'], size: ['small'], defaultPageSize: [10] }}
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                  style: { cursor: 'pointer' }
                })}
              >
                <Table.Column title="차량명" dataIndex="SHUTTLE_TYPE" key="SHUTTLE_TYPE" align='center' />
                <Table.Column title="차량번호" dataIndex="SHUTTLE_CARNUM" key="SHUTTLE_CARNUM" align='center' />
                <Table.Column title="운전자명" dataIndex="SHUTTLE_DRIVER" key="SHUTTLE_DRIVER" align='center' />
              </Table>
       </ConfigProvider>
              <CarInsert />
            </div>
          </Stack>
        </div>
        <CarDetail />
      </div>
    </>
  );
};

export default CarInfo;
