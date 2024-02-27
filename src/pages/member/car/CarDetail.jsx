import { Descriptions } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

const CarDetail = () => {
  const dispatch= useDispatch();
  const selectedCar = useSelector(state => state.carSlice.selectedCar);
  const memoSelectedCar=useMemo(()=>selectedCar || {},[selectedCar])
  const [updatedCar, setUpdatedCar] = useState(memoSelectedCar);
  const [originalCar, setOriginalCar] = useState(memoSelectedCar);


  useEffect(() => {
    setUpdatedCar(prevCar =>{
      if (prevCar !== memoSelectedCar) {
        return memoSelectedCar;
      }
      return prevCar
    })
    setOriginalCar(memoSelectedCar)
}, [memoSelectedCar])

  return (
    <Stack direction='vertical'>      
    <div className='ms-auto'>
    <Stack direction='horizontal'>
        <Button>정보수정</Button>
        <Button>정보삭제</Button>
        </Stack>
    </div>
<Descriptions bordered>
            <Descriptions.Item label="차량번호" span={3}>{memoSelectedCar.SHUTTLE_CARNUM}</Descriptions.Item>
            <Descriptions.Item label="차량종류"span={3}>{memoSelectedCar.SHUTTLE_TYPE}</Descriptions.Item>
            <Descriptions.Item label="차량운전자" span={3}>{memoSelectedCar.SHUTTLE_DRIVER}</Descriptions.Item>
          </Descriptions>
           
    <div>
    </div>
    </Stack>
    
  )
}

export default CarDetail