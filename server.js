//현재 react 3000번 포트 프로젝트에서 iframe을 이용하여 채팅서버를 화면에 띄워주고 있다. 이 때 // node_modules 에 있는 express 관련 파일을 가져온다.
const express = require('express');
const path = require('path');
const cors = require('cors');
// express 는 함수이므로, 반환값을 변수에 저장한다.
const app = express();

app.use(express.json());
// 7000 포트로 서버 오픈
app.use(cors());
app.use(express.static('build'));
//app.use('/favicon.png', express.static(path.join(__dirname + '/build/favicon.png')));
const port = 7000;

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/build", "index.html"));
}); 

app.listen(port, ()=>{console.log(path.join(__dirname + "/build", "index.html")) });


// 이제 터미널에 node server.js 를 입력해보자.
//JavaScript 파일 내에서 Node.js 명령을 실행하려면, child_process 모듈을 사용할 수 있습니다. 
//child_process 모듈은 외부 명령을 실행하고 해당 명령의 출력을 받아오는 기능을 제공합니다. 
// executeCommand.js
const { exec } = require('child_process');

// 실행할 명령어
const command = 'node talk/main.js';

// 명령어 실행
exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  console.log(`Output: ${stdout}`);
  console.error(`Error Output: ${stderr}`);
});
//이와 같은 방식으로 채팅서버를 리액트 서버 가동시 실행하도록 하려면 프로젝트 디렉토리 구성과 방법을 어떻게 해야할까?
