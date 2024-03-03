import React from 'react'
import {  ConfigProvider, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import styles from './mypage.module.css'

const MypageExp = () => {
  const selectedEmployee = useSelector(state => state.chooseEmp.selectedEmployee) || {};
    const dispatch = useDispatch();
  
  const { Column } = Table;
  const data = [
    {
      exp_name: selectedEmployee.EXP_NAME,
      exp_dept: selectedEmployee.EXP_DEPT,
      exp_rank: selectedEmployee.EXP_RANK,
      exp_duty: selectedEmployee.EXP_DUTY,
      exp_period:selectedEmployee.EXP_PERIOD
    },
  ];
  return (
    <>
    <h2>&nbsp;&nbsp;경력</h2>
    <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            borderColor: '#d9d9d9', //hex색표 
                                },
                            },
                        }}
    >
                <Table className={styles.myTable} dataSource={data} pagination={false} bordered>
                    <Column title="회사명" dataIndex="exp_name" key="firstName" align='center' />
                    <Column title="부서" dataIndex="exp_dept" key="age"  align='center'/>
                    <Column title="직급" dataIndex="exp_rank" key="address" align='center'/>
                    <Column title="담당업무" dataIndex="exp_duty" key="address" align='center'/>
                    <Column title="재직기간" dataIndex="exp_period" key="address" align='center'/>
              </Table>
    </ConfigProvider>
    </>
  )
}

export default MypageExp