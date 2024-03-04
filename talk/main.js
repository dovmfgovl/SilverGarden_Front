const Koa = require('koa');//1
const render = require('koa-ejs');
const path = require('path');//3
const route = require('koa-route')//4
const serve = require('koa-static')
const mount = require('koa-mount')
const websockify = require('koa-websocket');//5
require('dotenv').config();
const app = websockify(new Koa());
const firebase = require('@firebase/app')
const { getDatabase, ref, onValue, set, get } = require('firebase/database');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FS_APIKEY,
  authDomain: process.env.REACT_APP_FS_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_FS_DATABASEURL,
  projectId: process.env.REACT_APP_FS_PROJECTID,
  storageBucket: process.env.REACT_APP_FS_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FS_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FS_APPID
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
console.log(firebaseApp);

let curtime=''
let today=''
let id=0

const setClock = () => {
	const dateInfo = new Date(); 
	id = dateInfo.getTime()
	const hour = modifyNumber(dateInfo.getHours());
	const min = modifyNumber(dateInfo.getMinutes());
	const sec = modifyNumber(dateInfo.getSeconds());
	let milisec = dateInfo.getMilliseconds()
	const year = dateInfo.getFullYear();
  	const month = modifyNumber(dateInfo.getMonth()+1); //monthIndex를 반환해주기 때문에 1을 더해준다.
	const date = dateInfo.getDate();
	curtime = hour + ":" + min  + ":" + sec + ':' + milisec
	today = year+""+month+""+date
}

const modifyNumber =  (time) => {
	if(parseInt(time)<10){
		return "0"+ time;
	}
	else
		return time;
}

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'talk',
  viewExt: 'html',
  cache: false,
  debug: false,
});

app.use(mount('/public', serve('public'))) 
//1초마다 현재 시간정보 수정하기 -미들웨어
app.use(async (ctx) => {
	await ctx.render('talk')
	await setInterval(setClock,1000); //1초마다 setClock 함수 실행	
});
//firebase db 연결
const _client = getDatabase(firebaseApp);

const talks = ''
//firebase 추가
const getTalksCollection = async () => {
	console.log('getTalksCollection : ');
	const client = await _client;
	let value;
	const query = ref(client, `talk${today}`);
	const snapshot = await get(query)//onValue를 사용하면 상태가 바뀔때마다 반복해서 가져옴
	value = snapshot.val()
	return value	
}//end of getTalksCollection

app.ws.use(
  // ws는 websocket을 의미한다  
	route.all('/ws', async (ctx) => {
		console.log('새로운 사람이면...');
    	console.log(ctx.websocket);
		// 새로운 사람이 입장하면 여기서 부터 실행됨
		const talks = await getTalksCollection()
		console.log('talks : ' + talks);
		ctx.websocket.send(JSON.stringify({
			type:'sync',
			payload: {
				talks,
			}
		}))

		ctx.websocket.on('message',async (data) => {//콜백 핸들러가 반응했다는 것을 알 수 있음
			console.log('client.js에서 보낸 메시지 듣기 : ' + data);
			console.log(typeof data);
			if(typeof JSON.stringify(data) !== 'string'){//날아오는 데이터가 string이 아니면 그냥 리턴처리함
				console.log('string이 아니면');
				return;
			}
			const talk = JSON.parse(data);
			console.log(`client msg : ` +talk);
			const { message, nickname } = talk
			console.log(`message:${message}, nickname:${nickname}`);
			//Realtime Database에 추가
			await set(ref(_client, `talk${today}/${id}`), {
				type: 'talk',
				payload: {
					message:message,
					nickname:nickname,
					curtime:curtime,
				}				
			})
			.then(() => {
			  console.log('저장성공');
			}).catch((error)=> {
			  console.log('저장 실패!!!');
			})
			//멀티캐스트를 위한 코드 추가
			const { server } = app.ws
			if(!server){
				return
			}

			server.clients.forEach((client) => {
				client.send(JSON.stringify({
					type: 'talk',
					payload: {
						message:message,
						nickname:nickname,
						curtime:curtime,
					}
				}))
			})//end of forEach - 멀티캐스트 
		})//end of on
	})//end of route all
)//end of use

app.listen(5050);