import React, { useEffect, useState } from 'react'
import {  ConfigProvider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const MypageEdu = () => {
    const { Column } = Table;

    const selectedEmployee = useSelector(state => state.chooseEmp.selectedEmployee) || {};
    const dispatch = useDispatch();

  

    const data = [
      { label: 'HIGH_SCHOOL', 
        period: selectedEmployee.HIGH_SCHOOL_PERIOD, 
        name: selectedEmployee.HIGH_SCHOOL_NAME, 
        major: selectedEmployee.HIGH_SCHOOL_MAJOR,
        status: selectedEmployee.HIGH_SCHOOL_STATUS },
      { label: 'UNIVERSITY', 
        period: selectedEmployee.UNIVERSITY_PERIOD, 
        name: selectedEmployee.UNIVERSITY_NAME, 
        major: selectedEmployee.UNIVERSITY_MAJOR, 
        status: selectedEmployee.UNIVERSITY_STATUS },
      { label: 'GRADUATE_SCHOOL', 
        period: selectedEmployee.GRADUATE_SCHOOL_PERIOD, 
        name: selectedEmployee.GRADUATE_SCHOOL_NAME, 
        major: selectedEmployee.GRADUATE_SCHOOL_MAJOR, 
        status: selectedEmployee.GRADUATE_SCHOOL_STATUS },
    ];
      return (
        <>
        <h2>&nbsp;&nbsp;학력</h2>
        <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            borderColor: '#d9d9d9', //hex색표 
                                },
                            },
                        }}
            >
                <Table dataSource={data} pagination={false} bordered>
                    <Column title="기간" dataIndex="period" key="period" />
                    <Column title="학교명" dataIndex="name" key="name" />
                    <Column title="학과명" dataIndex="major" key="major" />
                    <Column title="졸업구분" dataIndex="status" key="status" />
              </Table>
        </ConfigProvider>
        </>
      )
    }

export default MypageEdu