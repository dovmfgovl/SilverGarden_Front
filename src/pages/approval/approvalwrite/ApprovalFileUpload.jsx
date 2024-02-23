import React, { useRef, useState } from 'react'
import styles from './approvalWrite.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';

const ApprovalFileUpload = ({fileList, handleFile}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) =>{
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  const handleRemoveFile = (deletedFilename) => {
    const updatedFileList = fileList.filter(file => file.name !== deletedFilename);
    handleFile(updatedFileList); // 파일 리스트에서 해당 파일을 제거
  };

  return (
    <>
    <div className={styles.approvalFileUploadBar}>
      <div>
        <input ref={fileInputRef} type="file" onChange={handleFileChange} style={{width: '300px'}}/>
        <button onClick={(e)=> {
          e.preventDefault();
            if(selectedFile){
              const list = fileList.filter(element => element.name !== selectedFile.name)
              console.log(list);
              handleFile([...list, selectedFile])
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }
          }}><FontAwesomeIcon icon={faSquarePlus} /></button>
      </div>
      {fileList && fileList.map((file, index)=>(
        <div key={index}>
          <button onClick={() => handleRemoveFile(file.name)}><FontAwesomeIcon icon={faSquareMinus} /></button>
          {file.name}
        </div>
      ))}
    </div>
    </>
  )
}

export default ApprovalFileUpload