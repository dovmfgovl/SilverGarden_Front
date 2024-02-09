import React, { useState } from 'react'
import styles from './notice.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const NoticeFileUpload = ({handleFile, fileList}) => {

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) =>{
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  return (
    <>
    <div className={styles.noticeFileUploadBar}>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button style={{'outline':'none'}} onClick={(e)=> {
          e.preventDefault();
            if(selectedFile){
              const list = fileList.filter(element => element.name !== selectedFile.name)
              console.log(list);
              handleFile([...list, selectedFile])
            }
          }}>추가</button>
      </div>
      {fileList && fileList.map((file, index)=>(
        <div key={index}>
          <button onClick={(e)=>{
            console.log(e.target);
          }
          }>-</button>
          {index+1+"."+file.name}
        </div>
      ))}
    </div>
    </>
  )
}

export default NoticeFileUpload