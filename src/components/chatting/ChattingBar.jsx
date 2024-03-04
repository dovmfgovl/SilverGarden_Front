import React, { useEffect, useState } from 'react'
import styles from './chatting.module.css'
const ChattingBar = ({empData}) => {
  const [url, setUrl] = useState("")
  const chatServerIP = process.env.REACT_APP_CHAT_IP;

  useEffect(()=>{
    setUrl(chatServerIP+"?e_name="+empData.e_name)
  },[])
  
  return (
    <div className={styles.chattingBar}>
      <iframe src={url} frameborder="0" style={{maxWidth:"100%"}}></iframe>
    </div>
  )
}

export default ChattingBar