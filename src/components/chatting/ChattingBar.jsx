import React, { useEffect, useState } from 'react'
import styles from './chatting.module.css'
const ChattingBar = ({empData}) => {
  const [url, setUrl] = useState("")

  useEffect(()=>{
    setUrl("http://localhost:5000?e_name="+empData.e_name)
  },[])
  return (
    <div className={styles.chattingBar}>
      <iframe src={url} frameborder="0" style={{maxWidth:"100%"}}></iframe>
    </div>
  )
}

export default ChattingBar