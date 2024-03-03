;(() => {
    const title = document.querySelector('#title')
    const socket = new WebSocket(`ws://${window.location.host}/ws`)
    const params = new URLSearchParams(window.location.search);
    const e_name = params.get('e_name');
    console.log(params.get('e_name'));
    //main.pug에서 form 엘리먼트 가져오기
    const formEl = document.querySelector('#form')
    const inputEl = document.querySelector('#input')
    const talksEl = document.querySelector('#talks')
    //const exitEl = document.querySelector('#exit')
    if(!formEl || !inputEl || !talksEl){
      throw new Error('Init failed!!!')
    }
    //톡 내용을 담을 배열 
    const talks = []

    formEl.addEventListener('submit', (event) => {
      //서브밋이 일어난 뒤 화면 갱신 방어하기
      event.preventDefault()
      console.log(`client 이벤트 반응 ${event.target.id}`);
      //이 때 send로 객체를 보낼 수 없어서 stringify를 씌워서 문자열로 보낸다
      socket.send(JSON.stringify({
        nickname: e_name,
        message: inputEl.value
      }))
      inputEl.value=''
    })

    const drawChats = () => {
      talksEl.innerHTML = ''; // 기존 대화 목록을 비웁니다.
      talks.forEach(({ message, nickname, curtime }) => {
        const wrapperDiv = document.createElement('div'); // 메시지를 감쌀 최상위 div
        wrapperDiv.className = 'chat-message'; // 스타일링을 위한 클래스 추가 (옵션)
    
        const nicknameDiv = document.createElement('div'); // 닉네임을 위한 div
        nicknameDiv.innerText = nickname;
        nicknameDiv.className = 'nickname'; // 스타일링을 위한 클래스 추가 (옵션)
    
        const messageDiv = document.createElement('div'); // 메시지를 위한 div
        messageDiv.innerText = message;
        messageDiv.className = 'message'; // 스타일링을 위한 클래스 추가 (옵션)
    
        const timeDiv = document.createElement('div'); // 시간을 위한 div
        const convertTime = convertTimeString(curtime); // 시간 변환
        timeDiv.innerText = convertTime;
        timeDiv.className = 'time'; // 스타일링을 위한 클래스 추가 (옵션)
    
        // 최상위 div에 각 요소를 추가
        wrapperDiv.appendChild(nicknameDiv);
        wrapperDiv.appendChild(messageDiv);
        wrapperDiv.appendChild(timeDiv);
    
        // 최상위 div를 대화 목록에 추가
        talksEl.appendChild(wrapperDiv);
      });
    
      // 자동 스크롤을 가장 최근 메시지로 이동
      talksEl.scrollTop = talksEl.scrollHeight;
    }

  const convertTimeString = (timeString) => {
    // 시간 문자열을 ':'으로 분리
    const parts = timeString.split(':');
    if(parts.length !== 4) {
        return '잘못된 형식입니다.';
    }
    let [hours, minutes, seconds, milliseconds] = parts;
    // 24시간제 시간을 12시간제로 변환하고, 오전/오후 결정
    const ampm = hours >= 12 ? '오후' : '오전';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0을 12로 변환
    // 결과 문자열 생성
    const result = `${ampm} ${hours}:${minutes}`;
    return result;
}

    // exitEl.addEventListener('click', (event) => {
    //     alert("채팅창이 종료됩니다");
    // })
    //서버에서 보낸 정보 받아서 출력해 보기
    socket.addEventListener('message', (event) => {//서버에서 보내온 메시지 받아오기
	    const { type, payload } = JSON.parse(event.data)
	    if(type === 'sync'){
		    const { talks: syncedChats } = payload
		    console.log(syncedChats)
            Object.keys(syncedChats).map((key)=> {
            console.log(syncedChats[key]);
            talks.push(syncedChats[key].payload)
        })
	    }else if(type === 'talk'){
		    const talk = payload
		    talks.push(talk)
	    }
	    drawChats() 
	})
})()