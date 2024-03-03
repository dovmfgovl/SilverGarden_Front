import React, { useState } from 'react';
import { storage } from '../../services/firebase/firebaseEmp';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import styles from './empDetailInfo.module.css';

const EmpUploadImg = ({ imageUrlChange }) => {
  const [image, setImage] = useState(null); // 이미지 상태 관리
  const [imageUrl, setImageUrl] = useState(''); // 이미지 URL 상태 관리

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

        // 업로드 성공 시 알림창
        alert('업로드 되었습니다.');

      } catch (error) {
        console.error('이미지 업로드 중 에러 발생:', error);
        // 업로드 실패 시 알림창
        alert('업로드가 되지 않았습니다.')
      }
    }
  };

  return (
    <div className={styles.uploadWrap}>
      <input type="file" id="fileInput" className={styles.choiceHiddenButton} onChange={handleChange} />
      <label for="fileInput" className={styles.choiceButton}>파일 선택</label>
      <button className={styles.uploadButton} onClick={handleUpload}>사진업로드</button>
      {imageUrl && ( /* 이미지 URL 존재할 경우 이미지 출력 */
        <div className={styles.previewImg}>
          <h5>미리보기</h5>
          <img src={imageUrl} alt="업로드사진" />
        </div>
      )}
    </div>
  );
}

export default EmpUploadImg;