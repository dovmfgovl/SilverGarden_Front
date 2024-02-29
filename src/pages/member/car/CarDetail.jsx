import { Descriptions, Input} from 'antd'
import styles from '../member.module.css';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Col, Form,  Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getEmpList } from '../../../redux/chooseEmpSlice'
import { getCarList, saveCarDetails, setDetail } from '../../../redux/carSlice'
import { shuttleDelete } from '../../../services/api/carApi'
import CarStatistic from './CarStatistic';

const CarDetail = () => {
  const dispatch= useDispatch();
  const selectedCar = useSelector(state => state.carSlice.selectedCar);
  const memoSelectedCar=useMemo(()=>selectedCar || {},[selectedCar])
  const [updatedCar, setUpdatedCar] = useState(memoSelectedCar);
  const [originalCar, setOriginalCar] = useState(memoSelectedCar);
  const [editing, setEditing] = useState(false);
  const empList = useSelector(state => state.chooseEmp.value);
  const userData =useSelector(state => state.userInfoSlice);

  useEffect(() => {
    dispatch(getEmpList());
  }, [dispatch]);
  useEffect(() => {
    setUpdatedCar(prevCar =>{
      if (prevCar !== memoSelectedCar) {
        return memoSelectedCar;
      }
      return prevCar
    })
    setOriginalCar(memoSelectedCar)
}, [memoSelectedCar])

const handleEdit = () => {
  setEditing(true);
};
const handleCancel=()=>{
  setEditing(false);
  setUpdatedCar(originalCar);
}
const handleChange = (key, value) => {
  setUpdatedCar(prevState => ({
    ...prevState,
    [key]: value
  }));
}
const handleSaveChanges=()=>{
  const FinalupdatedCar={
    ...updatedCar,
    MOD_ID: userData.e_no,
  }

  dispatch(saveCarDetails(FinalupdatedCar))
  .then(()=>{
    dispatch(setDetail(FinalupdatedCar))
    alert("차량 정보가 성공적으로 저장되었습니다.");
    setEditing(false);
    dispatch(getCarList())
  })
  .catch(error=>{
    console.error('Error saving car details: ', error);
  })
}
const handleDelete= async()=>{
  if(window.confirm("이 차량을 삭제하시겠습니까?")){
    const res = await shuttleDelete(selectedCar.SHUTTLE_NO);
    console.log(res.data);
    alert("삭제되었습니다");
    window.location.reload(); 
  }

}

  return (
    <>
    <div className={styles.rightMemberLayout1}>
    <Col><h2>&nbsp;▶︎&nbsp;차량상세</h2></Col>
      {selectedCar && Object.keys(selectedCar).length>0 &&(
        <Stack direction='horizontal' gap={3}>
          {editing ? (
            <>
             <div className='ms-auto'>
                <Button variant="outline-secondary" onClick={handleSaveChanges}>저장</Button>
              </div>
                <Button variant="outline-danger" onClick={handleCancel}>취소</Button>
            </>
          ):(
            <>        
          <div className='ms-auto'>
      <Button variant="outline-primary" onClick={handleEdit}>수정</Button>
        </div>
        <Button variant="outline-secondary" onClick={handleDelete}>삭제</Button>
            </>
          )}
        </Stack>
      )}
      {editing ?(
        <Descriptions bordered>
                    <Descriptions.Item label="차량번호" span={3}>
                        <Input
                          value={updatedCar.SHUTTLE_CARNUM}
                          onChange={e => handleChange('SHUTTLE_CARNUM', e.target.value)}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="차량종류"span={3}> 
                    <Input
                          value={updatedCar.SHUTTLE_TYPE}
                          onChange={e => handleChange('SHUTTLE_TYPE', e.target.value)}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="차량운전자" span={3}>
                    <Form.Select
                            style={{ width: '100%' }}
                            value={updatedCar.SHUTTLE_DRIVER}
                            onChange={e => handleChange('SHUTTLE_DRIVER', e.target.value)}
                          >
                            <option>분류선택</option>
                            {empList.map(emp => (
                              emp.DEPT_NAME === "사회복지팀" &&emp.E_STATUS !=="퇴직" && (
                            <option  key={emp.E_NAME} value={emp.E_NAME}>{emp.E_NAME}</option>
                            )
                            ))}
                      </Form.Select>  
                    </Descriptions.Item>
                  </Descriptions>
      ):(
        <Descriptions bordered>
                  <Descriptions.Item  label="차량번호" span={3}>{memoSelectedCar.SHUTTLE_CARNUM}</Descriptions.Item>
                  <Descriptions.Item label="차량종류"span={3}>{memoSelectedCar.SHUTTLE_TYPE}</Descriptions.Item>
                  <Descriptions.Item label="차량운전자" span={3}>{memoSelectedCar.SHUTTLE_DRIVER}</Descriptions.Item>
                </Descriptions>
      )}  
    </div>
    <div className={styles.rightMemberLayout3}>
        <CarStatistic selectedCar={selectedCar}/>
    </div>
    </>
  )
}

export default CarDetail