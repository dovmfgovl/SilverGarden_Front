import React, { useState } from 'react';
import { storage } from '../../services/firebase/firebaseEmp';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { setEmpInfo } from '../../redux/userInfoSlice'

const EmpUploadImg = ({ imageUrlChange }) => {
  const [image, setImage] = useState(null); // 이미지 상태 관리
  const [imageUrl, setImageUrl] = useState(''); // 이미지 URL 상태 관리
  const dispatch = useDispatch();

  // 이미지 변경 핸들러
  const handleChange = (e) => {
    if (e.target.files[0]) { // 이벤트에서 파일 가져옴
      setImage(e.target.files[0]); // 이미지 상태 설정
      const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
      reader.onload = (event) => { // 파일 로딩 완료되면 콜백 함수 설정
        setImageUrl(event.target.result); // 이미지 URL 상태를 설정
      };
      reader.readAsDataURL(e.target.files[0]); // 파일 데이터를 URL로 읽어옴
    }
  };

  // 이미지 업로드 핸들러
  const handleUpload = async () => {
    if (image) { // 이미지 존재하면
      const storageRef = ref(storage, `empImages/${image.name}`); // 이미지 저장할 firebase storage 참조 생성
      const uploadTask = uploadBytesResumable(storageRef, image); // 이미지 업로드하는 비동기 작업 생성

      try {
        const snapshot = await uploadTask; // 업로드 작업 수행 및 스냅샷 가져오기
        const downloadURL = await getDownloadURL(snapshot.ref); // 업로드된 이미지의 다운로드 URL 가져오기
        if (imageUrlChange) { // 이미지 URL 변경 콜백 함수가 존재하면
          imageUrlChange(downloadURL); // 함수 호출하여 업로드된 이미지 다운로드 URL 담기
        }

        // e_profile을 변경하여 Redux를 바로 업데이트
        dispatch(setEmpInfo({ e_profile: downloadURL }))
      } catch (error) {
        console.error('이미지 업로드 중 에러 발생:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>사진 저장</button>
      {imageUrl && ( /* 이미지 URL 존재할 경우 이미지 출력 */
        <div>
          <img src={imageUrl} alt="Uploaded" style={{ width: '200px' }} />
        </div>
      )}
    </div>
  );
}

export default EmpUploadImg;