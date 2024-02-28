import { Descriptions, Input, Select } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getEmpList } from '../../../redux/chooseEmpSlice'
import { saveCarDetails, setDetail } from '../../../redux/carSlice'

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
    setEditing(false);
  })
  .catch(error=>{
    console.error('Error saving car details: ', error);
  })
}


  return (
    <Stack direction='vertical'>      
      {selectedCar && Object.keys(selectedCar).length>0 &&(
        <Stack direction='horizontal'>
          {editing ? (
            <>
             <div className='ms-auto'>
                <Button variant="outline-secondary" onClick={handleSaveChanges}>저장</Button>
              </div>
                <Button variant="outline-danger" onClick={handleCancel}>취소</Button>
            </>
          ):(
          <div className='ms-auto'>
      <Button variant="outline-success" onClick={handleEdit}>정보수정</Button>
        <Button>정보삭제</Button>
        </div>
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
                            <Select.Option>분류선택</Select.Option>
                            {empList.map(emp => (
                              emp.DEPT_NAME === "사회복지팀" && (
                            <Select.Option  key={emp.E_NAME} value={emp.E_NAME}>{emp.E_NAME}</Select.Option>
                            )
                            ))}
                      </Form.Select>  
                    </Descriptions.Item>
                  </Descriptions>
      ):(
      <Descriptions bordered>
                  <Descriptions.Item label="차량번호" span={3}>{memoSelectedCar.SHUTTLE_CARNUM}</Descriptions.Item>
                  <Descriptions.Item label="차량종류"span={3}>{memoSelectedCar.SHUTTLE_TYPE}</Descriptions.Item>
                  <Descriptions.Item label="차량운전자" span={3}>{memoSelectedCar.SHUTTLE_DRIVER}</Descriptions.Item>
                </Descriptions>
      )}  
    <div>
    </div>
    </Stack>
    
  )
}

export default CarDetail