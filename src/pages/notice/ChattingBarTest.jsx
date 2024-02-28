import React, { useEffect, useState } from 'react'
import styles from "./notice.module.css";
import { Button, Form, InputGroup } from 'react-bootstrap';


const ChattingBarTest = ({empData}) => {
  const [url, setUrl] = useState("")
  useEffect(()=>{
    setUrl("http://localhost:5000?e_name="+empData.e_name)
  },[])

  return (
    <div className={styles.chattingBarContent}>
      <iframe src={url} frameborder="0" style={{maxWidth:"100%"}}></iframe>
    </div>
  )
}

export default ChattingBarTest