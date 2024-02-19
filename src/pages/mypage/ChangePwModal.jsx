import { Form, Input,Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getEmpList, saveEmpDetails, setDetail } from '../../redux/empInfosSlice';

const ChangePwModal = ({ show, handleClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(state => state.empInfos.selectedEmployee) || {}; 
  const [originalEmployee, setOriginalEmployee] = useState(selectedEmployee);
  const [updatedEmployee, setUpdatedEmployee] = useState(selectedEmployee);
  

  const handleSaveChanges = () => {
    dispatch(saveEmpDetails(updatedEmployee)) // 수정된 직원 정보 저장
    .then(() => {
      dispatch(setDetail(updatedEmployee)); // Redux 스토어에서 선택된 직원 정보 업데이트
      // 수정된 직원 정보를 Redux 스토어에서 가져와 전체 직원 목록을 업데이트
      dispatch(getEmpList()); // 전체 직원 목록 다시 가져오기
      handleClose();
    })
    .catch(error => {
      console.error('Error saving password details: ', error);
    });
  }
  
  useEffect(() => {
    if (!selectedEmployee) {
      setOriginalEmployee(selectedEmployee); 
    }
   }, [selectedEmployee]);


  const empDetail = useSelector(state => state.empInfos.selectedEmployee) || {};

  const selectedUserPw =empDetail.E_PASSWORD;


  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const {value}= e.target
    setUpdatedEmployee(empDetail => ({
      ...empDetail, E_PASSWORD : value //insert here register된 password2를 집어 넣기 
    }));
    console.log(updatedEmployee.E_PASSWORD);
  };

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
          {/* <Alert message=" 새 비밀번호를 입력하시고 비밀번호 확인에 해당 비밀번호를 입력해주세요." type="info" showIcon /> */}

          <Form.Item
            label="기존 비밀번호"
            name="originalPassword"
            initialValue={selectedUserPw}
            rules={[
              {
                required: true,
                message: '비밀번호를 확인해주세요',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('originalPassword') === selectedUserPw) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('기존 비밀번호가 아닙니다!'));
                },
              }),
            ]}
          >
            <Input {...register("originalPassword")} />
          </Form.Item>
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

          {/* Field */}
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

          {/* Error messages */}
          {errors.originalPassword && <p>{errors.originalPassword.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
          {errors.password2 && <p>{errors.password2.message}</p>}

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button  onClick={handleClose}>
          취소
        </Button>
        <Button type="primary" onClick={handleSaveChanges} >저장</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ChangePwModal;
