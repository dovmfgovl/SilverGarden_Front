import { Form, Input, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, saveEmpDetails, setDetail } from '../../redux/chooseEmpSlice';
import { changePw } from '../../services/api/mypageApi';

// 비밀번호 변경 모달 컴포넌트
const ChangePwModal = ({ show, handleClose }) => {
  // useForm을 사용하여 폼 상태 관리
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(state => state.chooseEmp.selectedEmployee) || {}; 
  const [originalEmployee, setOriginalEmployee] = useState(selectedEmployee);
  const [updatedEmployee, setUpdatedEmployee] = useState(selectedEmployee);
  
  
  // 선택된 직원이 변경되면 실행되는 useEffect
  useEffect(() => {
    if (!selectedEmployee) {
      setOriginalEmployee(selectedEmployee); 
    }
  }, [selectedEmployee]);
  
  // 선택된 직원의 비밀번호 가져오기
  const empDetail = useSelector(state => state.chooseEmp.selectedEmployee) || {};
  
  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { value } = e.target
    setUpdatedEmployee(empDetail => ({
      ...empDetail,
      E_PASSWORD: value
    }));
  };
  // 변경된 내용 저장 및 Redux 업데이트
  const handleSaveChanges = async () => {
   const updatedPassword = {
    E_NO:updatedEmployee.E_NO,
    E_PASSWORD: updatedEmployee.E_PASSWORD,
   }
   try {
      console.log(updatedPassword);
      const res = await changePw(updatedPassword)
      console.log(res.data);
      alert("비밀번호가 변경되었습니다!")
      handleClose()
   } catch (error) {
      console.error("비밀번호 변경에 실패했습니다.",error);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주십시오")
   }
  }
  
  // 폼 제출 핸들러
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          autoComplete="off"
          style={{
            maxWidth: 600,
          }}
          layout="vertical"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Item
            label="새 비밀번호"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호를 확인해주세요',
              },
            ]}
          >
            <Input.Password {...register("password")} />
          </Form.Item>
          <Form.Item
            label="비밀번호 확인"
            name="password2"
            hasFeedback
            rules={[
              {
                required: true,
                message: '비밀번호를 확인해주세요!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('입력하신 비밀번호가 서로 다릅니다!'));
                },
              }),
            ]}
          >
            <Input.Password {...register("password2")} onChange={handleInputChange} />
          </Form.Item>
          {/* 에러 메시지 출력 */}
          {errors.password && <p>{errors.password.message}</p>}
          {errors.password2 && <p>{errors.password2.message}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>
          취소
        </Button>
        <Button type="primary" onClick={handleSaveChanges}>저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePwModal;
