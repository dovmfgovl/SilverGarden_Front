import { Button, ConfigProvider, Space, Table } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState, useEffect } from 'react'
import styles from './emplist.module.css'
import Title from 'antd/es/typography/Title';

const EmpListAll = ({ empList, sendEmpList,dept }) => {
  const [keyword, setKeyword] = useState("");
  const [find, setFind]=useState("e_name");
  const [numOfRecords, setNumOfRecords] = useState(0); // 추가: 출력된 정보의 개수를 저장하기 위한 상태

  useEffect(() => {
    // empList가 변경될 때마다 출력된 정보의 개수를 업데이트
    setNumOfRecords(empList.length);
  }, [empList]);


  // empList 배열을 콘솔에 출력하여 확인합니다.
  // console.log(empList);
  // console.log(JSON.stringify(empList));
  // console.log(dept);
  // empList 배열을 사용하여 데이터를 동적으로 생성합니다.
  const data = empList.map(emp => ({
    // 각 사원의 정보를 새로운 객체에 매핑합니다.
    e_name: emp.E_NAME,       // 사원명
    dept_name: emp.DEPT_NAME, // 부서명
    e_rank: emp.E_RANK,       // 직급
    e_occup: emp.E_OCCUP,     // 직종
    e_email: emp.E_EMAIL,     // 이메일
    e_status: emp.E_STATUS,
    ext_value:emp.EXT_VALUE,
  }));

  //empList.map()은 empList 배열의 각 요소에 대해 새로운 객체를 반환합니다.
  // 생성된 데이터를 테이블로 렌더링합니다.

  const onSearch = () => {
    if(keyword !== "" ){
      const params={find: find, keyword: keyword }
      sendEmpList(params);
      setKeyword("");
    }
  }

  const handleRefresh = () => {
    // 부서명이 '전체'인 경우에는 전체 조회를 합니다.
    if (dept === '전체') {
      sendEmpList();
    } else {
      // 그렇지 않은 경우에는 해당 부서명으로 조회를 합니다.
      const params = { gubun: 'menuTitle', menuTitle: dept };
      sendEmpList(params);
    }
  }

  return (
    <container style={{color:['red']}}>
    <ConfigProvider
      theme={{
        components: {
          Table: {
            borderColor: '#d9d9d9', //hex색표 
          },
        },
      }}
      >
      <Space align='center' className={styles.container}>
        <Button className={styles.refreshButton} type="primary" onClick={handleRefresh}>전체조회</Button>
        <Search className={styles.searchbar}placeholder="이름을 검색해주세요" onSearch={onSearch}
          value={keyword} onChange={(e)=>setKeyword(e.target.value)} 
          enterButton style={{width: 200}}  />
      </Space>
      <Table dataSource={data} bordered pagination={{position:['bottomCenter']}} >
        {/* 각 열은 테이블의 컬럼으로 정의됩니다. */}
        <Table.Column title="사원명" dataIndex="e_name" key="E_NAME" align='center'/>
        <Table.Column title="부서명" dataIndex="dept_name" key="DEPT_NAME" align='center'/>
        <Table.Column title="직급" dataIndex="e_rank" key="E_RANK" align='center'/>
        <Table.Column title="직종" dataIndex="e_occup" key="E_OCCUP"align='center' />
        <Table.Column title="이메일" dataIndex="e_email" key="E_EMAIL" align='center'/>
        <Table.Column title="내선번호" dataIndex="ext_value" key="EXT_VALUE"  align='center'/>
      </Table>
      <Title level={5} className={styles.result} >전체: {numOfRecords}건</Title> {/* 추가: 출력된 정보 개수 표시 */}
    </ConfigProvider>
    </container>
  );
};

export default EmpListAll;
