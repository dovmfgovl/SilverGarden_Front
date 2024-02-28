import { Col, Descriptions } from 'antd';
import { Image, Stack} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


const MypageInfo = () => {
   const dispatch = useDispatch();
   const userData = useSelector(state=> state.userInfoSlice)


   // select who에서 선택한 직원을 selectedEmployee로 설정하고 사용합니다.
   const empDetail = useSelector(state => state.chooseEmp.selectedEmployee) || {};

   const items = [
    {
      key: '1',
      label: '이름',
      children: empDetail.E_NAME,
    },
    {
      key: '2',
      label: '사원번호',
      children: empDetail.E_NO,
    },
    {
      key: '3',
      label: '연락처',
      children: empDetail.E_PHONE,
    },
    {
      key: '4',
      label: '이메일',
      children: empDetail.E_EMAIL,
    },
    {
      key: '5',
      label: '부서',
      children: empDetail.DEPT_NAME,
    },
    {
      key: '6',
      label: '담당직종',
      children: empDetail.E_OCCUP,
      
    },

  ];

  return (
    <>
    <Stack direction="horizontal" gap={0}>
      <Col span={5}>
      <img width={210} height={180} alt="프로필사진" src={empDetail.E_PROFILE} rounded className='p-2 ms-auto'/>
      </Col>
      <Col span={16}>
      <Descriptions title="내 정보" bordered items={items} />
      </Col>
      <Col span={2}></Col>
    </Stack>
    </>
  )
}

export default MypageInfo

 