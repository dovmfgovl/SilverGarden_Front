# 👨🏻‍🦳 노인데이케어센터 그룹웨어 SilverGarden README

![스크린샷 2024-03-07 오후 7 40 28](https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/2377b4ad-0c7e-4066-a48a-22d99e45025f)

**아직 설치중입니다**

## 실행방법

- **SilverGarden_back**에서 서버를 연다
- 그 후 SilverGarden_Front가 설치된 터미널에 **npm run silvergarden** 을 입력한다.

- 배포 URL : (배포 URL입력)
- Test ID : 202403_00000134
- Test PW : 1234

<br>

## 프로젝트 소개

- SilverGarden은 주간요양보호시설에서 사용하는 그룹웨어입니다.
- 노인들을 대상으로 하는 시설이 증가하고 있고 그에 따라 시설관리를 위한 전산프로그램 수요도 높아진다고 예상했습니다.
- 실제 현직자들을 대상으로 설문조사를 진행하여 구현 희망하는 기능을 반영하였습니다.


<br>

## 팀원 구성

<div align="center">

|                                                                **박정원**                                                                |                                                                **안수연**                                                                |                                                                **이지연**                                                                |                                                                **이슬기**                                                                |                                                                **고태규**                                                                |
| :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/388fde3e-1c74-4f93-8d49-887ef2698df3" height=150 width=150> | <img src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/0330a1c3-0f60-4569-814f-540401ab0346" height=150 width=150> | <img src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/0146902c-087f-48c9-a601-b4cb2fd9ebdd" height=150 width=150> | <img src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/ec35ce79-e1ce-42a1-88ea-4270fa3e1a87" height=150 width=150> | <img src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/f90f98f4-1dbf-42e5-bbb1-520a7dd36cc4" height=150 width=150> |

</div>






<br>

## 1. 개발 환경

![스크린샷 2024-03-11 오후 12 03 37](https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/50124ab8-5400-47e5-8d88-6af39d5272d7)



<br>

## 2. 채택한 개발 기술과 브랜치 전략

### React

- React
  - 컴포넌트 단위로 UI를 구성하여 통일감있게 개발할 수 있었습니다
  - Javascript 기반으로 상대적으로 낮은 러닝커브


### 브랜치 전략

<img width="778" alt="스크린샷 2024-03-11 오후 12 18 58" src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/3e567c36-48b1-4f74-b723-9a60215859e1">




- 메인에서 개발용dev브런치를 두고 각각의 기능에 맞는 브런치(기능1,2,3)에서 실제 개발을 진행했습니다.
- 기능이 완성되면 dev브런치에 merge를 하고 나머지 인원들은 dev 브런치에서 pull받습니다. 
- dev브런치에서 검증을 거친 후 마지막으로 main branch로 코드를 병합하는 방식으로 형상관리 전략을 세웠습니다.
- merge요청을 위해 pull request를 형상관리 담당자에게 보내면 담당자는 코드의 충돌을 확인한 후 최종 merge가 되도록 하여 최대한 충돌을 줄이고자 노력했습니다.

<br>

## 3. 프로젝트 구조

```
├── README.md
├── .server.js
├── .gitignore
├── package-lock.json
├── package.json
│
├── public
│    ├── client.js
│    ├── favicon.ico
│    ├── index.html
│    ├── logo192.png
│    ├── logo512.png
│    ├── manifest.json
│    ├── robots.txt
│    └──  talk.css
├── src
│     ├── App.jsx
│     ├── EntryPoint.jsx
│     ├── index.js
│     ├── app.module.css
│     │
│     ├── assets
│     │     ├── fonts
│     │     │      └── Roboto.jsx
│     │     └── images
│     │            ├── loding2.gif
│     │            ├── silvergarden.png
│     │            ├── silvergardenlogo.png
│     │            ├── 결재.png
│     │            ├── 반려.png
│     │            └── 합의.png
│     │
│     │
│     ├── components
│     │     ├── Quill
│     │     │     ├── QuillEditor.jsx
│     │     │     └── quillEditor.css
│     │     ├── carousel
│     │     │     └── MemberCarousel.jsx
│     │     ├── chatting
│     │     │     ├── ChattingBar.jsx
│     │     │     └── chatting.module.css
│     │     ├── footer
│     │     │     ├── FootBar.jsx
│     │     │     └── footbar.module.css
│     │     ├── fullcalendar
│     │     │     ├── CommonCalendar.jsx
│     │     │     ├── CommonCalendar2.jsx
│     │     │     ├── CommonCalendarLogic.jsx
│     │     │     ├── CommonCalendarModal.jsx
│     │     │     ├── FullCalendarContainer.css
│     │     │     ├── WeekendToggle.jsx
│     │     │     ├── Wfullcalendar.module.css
│     │     │     └── 공통캘린더사용.txt
│     │     ├── header
│     │     │     ├── NavigationBar.jsx
│     │     │     └── navigation.module.css
│     │     ├── include
│     │     │     └── BootInclude.jsx
│     │     ├── pagination
│     │     │     └── PaginationCommon.jsx
│     │     ├── print
│     │     │     ├── Print.jsx
│     │     │     └── print.module.css
│     │     ├── rourter
│     │     │     └── AppRouter.jsx
│     │     └── sidebar
│     │     │     └── SidebarCommon.jsx
│     ├── pages
│     │     ├── admin
│     │     │     ├── Admin.jsx
│     │     │     ├── AtCalendar.jsx
│     │     │     ├── AtCalendarHome.jsx
│     │     │     ├── EmpCerti.jsx
│     │     │     ├── EmpCertiInsert.jsx
│     │     │     ├── EmpCertiRow.jsx
│     │     │     ├── EmpCreateRow.jsx
│     │     │     ├── EmpCreateModal.jsx
│     │     │     ├── EmpDetail.jsx
│     │     │     ├── EmpDetailInputField.jsx
│     │     │     ├── EmpEdu.jsx
│     │     │     ├── EmpEduRow.jsx
│     │     │     ├── EmpExcelDownload.jsx
│     │     │     ├── EmpExp.jsx
│     │     │     ├── EmpExpInsert.jsx
│     │     │     ├── EmpExpRow.jsx
│     │     │     ├── EmpInfos.jsx
│     │     │     ├── EmpListAll.jsx
│     │     │     ├── EmpListPagination.jsx
│     │     │     ├── EmpRow.jsx
│     │     │     ├── EmpUploadImg.jsx
│     │     │     ├── ExcelDownload.jsx
│     │     │     ├── ExcelForm.jsx
│     │     │     ├── admin.module.css
│     │     │     ├── atCalendar.module.css
│     │     │     ├── empDetailInfo.module.css
│     │     │     ├── empInfo.moudule.css
│     │     │     └── modal.module.css
│     │     ├── approval
│     │     │       ├── approvaldetail
│     │     │       │      ├── ApprovalDetailLine.jsx
│     │     │       │      ├── ApprovalDetailTable.jsx
│     │     │       │      ├── ApprovalDocDetail.jsx
│     │     │       │      ├── CommentModal.jsx
│     │     │       │      ├── ExpenseReportDetail.jsx
│     │     │       │      ├── ResultCommentModal.jsx
│     │     │       │      ├── VacationRequestDetail.jsx
│     │     │       │      └── approvalDetail.module.css
│     │     │       │
│     │     │       ├── approvalupdate
│     │     │       │      └── ApprovalDocUpdate.jsx
│     │     │       ├── approvalwrite
│     │     │       │      ├── ApprovalDocWrite.jsx
│     │     │       │      ├── ApprovalFlieUpload.jsx
│     │     │       │      ├── ApprovalLineModal.jsx
│     │     │       │      ├── ApprovalWriteLine.jsx
│     │     │       │      ├── ApprovalWriteTable.jsx
│     │     │       │      ├── DeptView.jsx
│     │     │       │      ├── ExpenseReportForm.jsx
│     │     │       │      ├── LineSelectBar.jsx
│     │     │       │      ├── SelectedAgreementLine.jsx
│     │     │       │      ├── SelectedApprovalLine.jsx
│     │     │       │      ├── VacationRequestForm.jsx
│     │     │       │      └── approvalWrite.module.css
│     │     │       ├── Approval.jsx
│     │     │       ├── ApprovalCompleteList.jsx
│     │     │       ├── ApprovalDenyList.jsx
│     │     │       ├── ApprovalListHeader.jsx
│     │     │       ├── ApprovalProgList.jsx
│     │     │       ├── ApprovalTempList.jsx
│     │     │       ├── ApprovalUpList.jsx
│     │     │       ├── ApprovalWaitList.jsx
│     │     │       └── approval.module.css
│     │     ├── crawling
│     │     │       ├── CrawlingHome.jsx
│     │     │       └── CrawlingComponent.jsx
│     │     ├── dept
│     │     │     ├── DeleteModal.jsx
│     │     │     ├── Dept.jsx
│     │     │     ├── DeptCreateModal.jsx
│     │     │     ├── DeptDetail.jsx
│     │     │     ├── DeptList.jsx
│     │     │     ├── DeptSideInfo.jsx
│     │     │     ├── DeptUpdate.jsx
│     │     │     └── dept.module.css
│     │     ├── emplist
│     │     │     ├── EmpListAll.jsx
│     │     │     ├── EmpList.jsx
│     │     │     └── emplist.module.css
│     │     ├── error
│     │     │     └── ErrorPage.jsx
│     │     ├── home
│     │     │     ├── AtEnd.jsx
│     │     │     ├── AtStart.jsx
│     │     │     ├── Home.jsx
│     │     │     ├── HomeCalendar.jsx
│     │     │     ├── HomeCalendarInfo.jsx
│     │     │     ├── HomeProfile.jsx
│     │     │     ├── MemberChart.jsx
│     │     │     ├── ProgramChart.jsx
│     │     │     └── home.module.css
│     │     ├── login
│     │     │     ├── AuthProvider.jsx
│     │     │     ├── Loading.jsx
│     │     │     ├── LoginForm.jsx
│     │     │     └── loginform.module.css
│     │     ├── member
│     │     │       ├── car
│     │     │       │      ├── CarCalendar.jsx
│     │     │       │      ├── CarCalendarLogic.jsx
│     │     │       │      ├── CarCalendarModal.jsx
│     │     │       │      ├── CarDetail.jsx
│     │     │       │      ├── CarInfo.jsx
│     │     │       │      ├── CarInsert.jsx
│     │     │       │      ├── CarStatistic.jsx
│     │     │       │      ├── CarStatisticAll.jsx
│     │     │       │      ├── CarStatisticPass.jsx
│     │     │       │      ├── CarStatisticRecord.jsx
│     │     │       │      ├── CarTimeLine.jsx
│     │     │       │      └── FullCalendarContainer.css
│     │     │       ├── counsel
│     │     │       │      ├── Counsel.jsx
│     │     │       │      ├── CounselCreate.jsx
│     │     │       │      ├── CounselDetail.jsx
│     │     │       │      ├── CounselRow.jsx
│     │     │       │      ├── CounselUpdate.jsx
│     │     │       │      ├── MemberDetail2.jsx
│     │     │       │      └── MemberInfo2.jsx
│     │     │       ├── Member.jsx
│     │     │       ├── MemberDelete.jsx
│     │     │       ├── MemberDetail.jsx
│     │     │       ├── MemberInfo.jsx
│     │     │       ├── MemberInsert.jsx
│     │     │       └── member.module.css
│     │     ├── memberhome
│     │     │       ├── MemberHome.jsx
│     │     │       └── memberhome.module.css
│     │     ├── message
│     │     │       ├── Message.jsx
│     │     │       ├── MessageAddressBook.jsx
│     │     │       ├── MessageDeleted.jsx
│     │     │       ├── MessageDeletedDetail.jsx
│     │     │       ├── MessageListHeader.jsx
│     │     │       ├── MessageListTable.jsx
│     │     │       ├── MessageProfile.jsx
│     │     │       ├── MessageReceive.jsx
│     │     │       ├── MessageReceiveDetail.jsx
│     │     │       ├── MessageSend.jsx
│     │     │       ├── MessageSendDetail.jsx
│     │     │       ├── MessageStored.jsx
│     │     │       ├── MessageStoredDetail.jsx
│     │     │       ├── MessageWrite.jsx
│     │     │       └── message.module.css
│     │     ├── mypage
│     │     │       ├── ChangePwModal.jsx
│     │     │       ├── Mypage.jsx
│     │     │       ├── MypageEdu.jsx
│     │     │       ├── MypageExp.jsx
│     │     │       ├── MypageInfo.jsx
│     │     │       ├── MypageMainCon.jsx
│     │     │       ├── MypageSubCon1.jsx
│     │     │       ├── MypageSubCon2.jsx
│     │     │       └── mypage.module.css
│     │     ├── notice
│     │     │       ├── CrawlList.jsx
│     │     │       ├── Notice.jsx
│     │     │       ├── NoticeDetail.jsx
│     │     │       ├── NoticeDetailHeader.jsx
│     │     │       ├── NoticeFileUpload.jsx
│     │     │       ├── NoticeList.jsx
│     │     │       ├── NoticePagination.jsx
│     │     │       ├── NoticeSearchBar.jsx
│     │     │       ├── NoticeTable.jsx
│     │     │       ├── NoticeUpdate.jsx
│     │     │       ├── NoticeWrite.jsx
│     │     │       └── notice.module.css
│     │     ├── paymenet
│     │     │       ├── ClientSearchModal.jsx
│     │     │       ├── InputNumber.jsx
│     │     │       ├── Payment.jsx
│     │     │       ├── PaymentDetail.jsx
│     │     │       ├── PaymentInfo.jsx
│     │     │       ├── PaymentList.jsx
│     │     │       ├── PaymentPagination.jsx
│     │     │       ├── RefundModal.jsx
│     │     │       ├── SnsModal.jsx
│     │     │       ├── payment.module.css
│     │     │       ├── paymentInfo.module.css
│     │     │       └── snsModal.module.css
│     │     ├── program
│     │     │       ├── ExceltDown.jsx
│     │     │       ├── Program.jsx
│     │     │       ├── ProgramDetail.jsx
│     │     │       ├── ProgramInfo.jsx
│     │     │       ├── ProgramInsert.jsx
│     │     │       ├── ProgramList.jsx
│     │     │       ├── ProgramPagination.jsx
│     │     │       ├── RightContent.jsx
│     │     │       └── programhome.module.css
│     │     ├── programcalendar
│     │     │       ├── ProgramCalendar.jsx
│     │     │       ├── ProgramCalendarHome.jsx
│     │     │       ├── ProgramListCalendar.jsx
│     │     │       └── programcalendarhome.module.css
│     │     ├── programdashboard
│     │     │       ├── ProgramCalChart.jsx
│     │     │       ├── ProgramChart.jsx
│     │     │       ├── ProgramDashboardHome.jsx
│     │     │       ├── ProgramProgressChart.jsx
│     │     │       └── programboard.module.css
│     │     └── schedule
│     │     │       └── TestCalendar.jsx
│     ├── redux
│     │     ├── calendarAdminSlice.js
│     │     ├── calendarAtSlice.js
│     │     ├── calendarCarSlice.js
│     │     ├── calendarSlice.js
│     │     ├── carSlice.js
│     │     ├── chooseEmpSlice.js
│     │     ├── commoncalendarSlice.js
│     │     ├── crawlingSlice.js
│     │     ├── deptSlice.js
│     │     ├── empInfosSlice.js
│     │     ├── memberSlice.js
│     │     ├── paymentClientSlice.js
│     │     ├── paymentSlice.js
│     │     ├── programSlice.js
│     │     ├── store.js
│     │     └── userInfoSlice.js
│     └── services
│          ├── api
│          │    ├── approvalApi.js
│          │    ├── attendanceApi.js
│          │    ├── carApi.js
│          │    ├── crawlingApi.js
│          │    ├── deptApi.js
│          │    ├── empCreateApi.js
│          │    ├── empInfosApi.js
│          │    ├── empListApi.js
│          │    ├── memberApi.js
│          │    ├── messageApi.js
│          │    ├── mypagelApi.js
│          │    ├── noticelApi.js
│          │    ├── paymentApi.js
│          │    └── programApi.js
│          ├── auth
│          │    ├── AuthApi.js
│          │    ├── UserApi.js
│          │    └── apInterceptor.js
│          └── firebase
│               └── firebaseEmp.js
└── talk
      ├── views
      │     └── talk.html
      └── main.js
```

<br>

## 4. 역할 분담

### 😎박정원
 **프로젝트 총괄**
- **UI,기능 및 페이지**
  - 전자결재, 공지게시판, 쪽지기능, 채팅

<br>
    
### 🐰안수연

- **UI,기능 및 페이지**
  - 로그인(인증), 부서관리, 이용자 결제

<br>

### 🐿이지연

- **UI,기능 및 페이지**
  - 프로그램관리, 공통 캘린더, 크롤링 게시판

<br>

### 👩‍🦱이슬기

- **UI,기능 및 페이지**
  - 직원관리, 공공데이터, 근태관리, 홈 화면, 그룹웨어 내 css 세부 조정


<br>

### 🦦고태규

- **UI,기능 및 페이지**
  - 이용자관리, 차량서비스, 직원조회, 마이페이지

<br>

## 5. 개발 기간 및 작업 관리

### 개발 기간

- 전체 개발 기간 :
<img width="528" alt="스크린샷 2024-03-12 오전 9 24 04" src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/3e1dc465-39d9-476f-814d-dd043618b480">


<br>

### 작업 관리

- GitHub Projects와 Issues를 사용하여 진행 상황을 공유했습니다.
- 주간회의를 진행하며 작업 순서와 방향성에 대한 고민을 나누고 Notion에 회의 내용을 기록했습니다.

<br>

## 6. 신경 쓴 부분

- 로그인 전략: 리액트와 스프링이 세션을 공유할 수 없는 문제가 있었고 이를 해결하기 위해 jwt를 채택하였습니다.
- 토큰을 이용한 요청방식:
  - 서버가 클라이언트의 요청이 적절한 것인지 판단하기 위해서 매 요청마다 헤더에 토큰을 삽입하여 검증하는 필터를 거치게 하였습니다.
  - 모든 요청에 토큰을 삽입해야 했기 때문에 일괄처리가 필요하다고 느꼈고 axios요청에 일괄처리를 가능하게 하는 axios 필터를 적용하였습니다.
- 권한에 따른 분기처리
  - 일반 사용자과 관리자로 권한을 나누고 프론트와 백앤드에서 이중으로 권한 분기처리를 했습니다.
    -  프론트에서는 프라이빗 라우터라는 것으로 페이지 라우팅을 할 때 권한이 없으면 권한이 없다는 페이지로 넘기도록 처리를 해주었습니다.
    -  백엔드에서는 요청이 넘어왔을 때 토큰검증과 함께 권한검증도 같이 하여 권한이 없는 사용자의 요청의 경우 403을 리턴하도록 구현하였습니다.
- 상태관리
  - depth가 깊어질 때 생기는 props의 사용 문제를 해결하기 위해 상태관리 라이브러리인 redux를 채택했습니다.

<br>

## 7. 페이지별 기능

### [초기화면]

- 로그인이 되어 있지 않은 경우 : 로그인 페이지
- 로그인이 되어 있는 경우 : silverGarden 홈 화면


| 초기화면 |
| -------- |

![로그인 화면](https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/a017fa5f-ba5b-4bf4-9be6-384520449c7b)

<br>

### [ 예시 로그인]

- 기본적인 사용자 검증이 수행되며, 로그인 완료 시 JWT토큰이 발급되어 토큰은 localstorage에 저장됩니다.
  


| 로그인                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------- |
| ![login](https://user-images.githubusercontent.com/112460466/210177956-c716414e-01c2-4c1e-b1f7-6562b9b7a857.gif) |

<br>

### [로그아웃]

- 로그아웃시 로컬 저장소의 토큰 값과 사용자 정보를 삭제하고 초기화면으로 이동합니다.

| 로그아웃                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------- |
| ![logout](https://user-images.githubusercontent.com/112460466/210178009-11225733-7af5-4b8b-aa1c-fe264af01797.gif) |

<br>
<br>

### [권한 처리]

- 권한을 USER A, USER B, ADMIN으로 나누었습니다. 권한이 없는 페이지를 접근할 때는 권한이 없다는 페이지로 라우팅 되도록 프라이빗 라우터 처리를 해주었습니다. 
- 혹여나 요청 url로 직접 백엔드 서버에 요청을 하더라도 시큐리티 필터체인에서 권한검증을 거치기 때문에 이중으로 권한 처리가 됩니다. 

| 권한 처리                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- |
| 권한 처리 이미지나 움짤 |

<br>

<br>

### [토큰 만료 여부]

- 토큰 만료 여부는 일정 시간 단위로 자동으로 체크되며 만료 시간이 1분 남았을 때 토큰 연장 팝업이 노출됩니다.  

- 해당 팝업에서 [확인] 버튼 클릭 토큰이 재발급되어 로그인 시간이 자동으로 연장되고
- [취소] 버튼 클릭 시 로그인 시간이 연장되지 않고 토큰만료시 자동 로그아웃 됩니다.

| 토큰만료                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------- |
| 토큰만료 이미지나 움짤 |

<br>
<br>

### [홈화면]

- 결재, 공지사항, 쪽지, 일정 등의 주요기능을 한 화면에 볼 수 있도록 메인화면을 구성했습니다.
- 근태관리를 위한 출퇴근 기능과 사원 전체가 채팅할 수 있는 채팅기능도 왼편에 배치되어있습니다.

| 홈화면                                                                                              |
| ----------------------------------------------------------------------------------------------------------------- |
| 홈화면 이미지나 움짤 |

<br>
<br>

### [채팅, 근태, 내 결재 - 홈화면]

- 채팅은 매일자정에 초기화되며 모든 사원이 사용할 수 있도록 구현하였습니다.

- 근태는 출근 버튼 클릭 시 근태 상태가 결근이 되고, 퇴근 버튼을 누르는 시점에 따라 결근, 지각, 조퇴, 정상출근으로 표기됩니다

- 휴가는 결재에서 휴가신청서가 최종승인이 되면 근태에 반영되도록 구현하였습니다. 

| 채팅, 근태, 내 결재 - 홈화면                                                                                              |
| ----------------------------------------------------------------------------------------------------------------- |
| 채팅, 근태, 내 결재 - 홈화면 이미지나 움짤 |

<br>

<br>

### [전자결재]

- 품의서, 휴가신청서, 지출결의서 세가지 양식을 선택 가능합니다.
- 주요 기능으로는 결재선설정, 상신, 상신문서 회수, 승인/반려 등이 있습니다.

| 전자결재                                                                                             |
| ----------------------------------------------------------------------------------------------------------------- |
| 전자결재 이미지나 움짤 |

<br>
<br>

### [직원조회]

- 직원목록을 확인할 수 있습니다.

- 검색기능을 통해 원하는 직원을 검색할 수도 있으며 사이드바의 부서목록을 클릭해 해당 부서의 직원만 검색할 수도 있습니다.

| 직원조회                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- |
| 직원조회 이미지나 움짤 |

<br>
<br>

### [이용자관리]

- 이용자정보와 상담관리, 차량서비스를 관리합니다.

- 등록된 이용자 정보를 목록에서 선택한 후 등록,수정,삭제할 수 있습니다. 

- 상담관리는 상담일지를 관리합니다. 목록에서 이용자를 선택에 상담 내역을 관리합니다.

- 차량관리는 시설에서 보유중인 차량의 정보와 운행기록을 관리합니다.

- 차량서비스관리는 차량운행을 캘린더 통해 예약할 수 있고 운행 일정을 관리합니다.
| 이용자관리                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- |
| 이용자관리 이미지나 움짤 |

<br>
<br>

### [프로그램관리]

- 시설을 이용하는 이용자들이 참여할 수 있는 프로그램을 등록하고 그 일정을 관리하는 기능입니다. 

- 센터에서 진행되는 프로그램의 현황을 확인하고, 해당 대쉬보드의 출력이 가능합니다. 

- 프로그램 정보를 등록하고 관리할 수 있습니다.  

- 프로그램 등록 시 '시작, 종료, 주기, 요일'에 따라 프로그램 일정 데이터도 함께 생성되고 관리할 수 있습니다. 

- 프로그램 정보가 수정, 삭제되는 경우, 수정일시 이후의 프로그램 일정 또한 일괄 수정, 삭제될 수 있도록 구현하였습니다. 

- 각 프로그램 일정들 또한 생성, 수정, 삭제가 가능하며 각 분야별, 일정명으로 필터된 데이터만 일정으로 조회할 수 있습니다. 
| 프로그램관리                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- |
| 프로그램관리 이미지나 움짤 |

<br>
<br>

### [게시판]

- 공지사항 게시판은 위지윅 텍스트 에디터인 퀼 에디터를 사용하여 구현하였습니다. 멀티파일 업로드와 다운로드가 가능하도록 구현하였습니다.

- 관련정보 게시판은 puppetier라이브러리를 이용하여 복지관련 웹사이트에서 크롤링한 데이터 목록을 보여줍니다. 

- 스케쥴러를 사용하여 매일 자정 자동으로 크롤링되도록 하였고, 링크를 통해 해당 웹사이트에 접근 가능합니다.
  
| 게시판                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- |
| 게시판 이미지나 움짤 |

<br>

### 관리자페이지
<br>

### [인적사항 관리]

- 직원 목록은 엑셀 파일로 다운로드 받을 수 있습니다.

- 직원의 프로필 사진은 파일서버를 별도로 두어Firebase Storage에 저장되도록 구현하였습니다.

- 직원의 학력, 경력, 자격증도 입력할 수 있습니다.
  
| 인적사항 관리                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- |
| 인적사항 관리 이미지나 움짤 |

<br>
<br>

### [근태관리]

- 근태 관리는 전체 직원의 근태 상태를 변경하고 삭제할 수 있습니다.

- 매일 자정 기준으로 전 직원의 근태 데이터가 결근상태로 일괄 생성됩니다. 일괄생성을 위해 스프링 부트의 스케쥴링 기능을 사용하였습니다.

- 공휴일 데이터는 공공데이터 API를 사용하였습니다.
| 근태관리                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- |
| 근태관리 이미지나 움짤 |

<br>
<br>

### [부서관리]

- 부서 관리에서는 부서 등록, 수정, 직종추가, 부서별 직원 목록을 조회할 수 있습니다.

- 부서 등록시에는 중복 검사가 진행되며 필수 값이 모두 채워져야 등록 가능합니다.

| 부서관리                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- |
| 부서관리 이미지나 움짤 |

<br>
--------------------------------
<br>

### [이용자결제]

- 결제 요청 시 회원에게 결제 링크가 생성되어 문자메시지로 발송되며 
- 회원이 링크에 접속하여 결제 완료가 되면 결제 내역에 업데이트 됩니다.
- 결제요청 모달을 호출해 결제 요청을 보냅니다.
- 사용자에게 문자메시지가 도착하면 결제링크를 클릭하고 결제화면으로 넘어갑니다.
- 결제 완료된 청구에는 [환불] 버튼이 노출됩니다.
- 버튼 클릭 시 환불 처리를 할 수 있습니다.

| 이용자결제                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- |
| 이용자결제 이미지나 움짤1 |
| 이용자결제 이미지나 움짤2 |
| 이용자결제 이미지나 움짤3|

<br>
<br>

### [쪽지]

- 받은 쪽지를 읽었을 때 혹은 보낸 쪽지를 상대방이 읽었을 때 읽음 처리되는 것을 구현하였습니다. 

- 검색필터를 기간검색과 조건검색으로 두어 여러 조건으로 검색할 수 있도록 하였습니다.
  
| 쪽지                                                                                      |
| ----------------------------------------------------------------------------------------------------------------- |
| 쪽지 이미지나 움짤 |

<br>
<br>

### [마이페이지]

- 직원의 개인정보를 열람하고 비밀번호를 변경할 수 있습니다. 

- 근태 정보는 근태정보를 조회하며  한 달 단위로 근태정보를 열람할 수 있습니다. 

- 비밀번호 변경은 새 비밀번호와 비밀번호 확인이 같을 경우에만 비밀번호 변경이 가능합니다.였습니다.
  
| 마이페이지                                                                                  |
| ----------------------------------------------------------------------------------------------------------------- |
| 마이페이지 이미지나 움짤 |

<br>


## 8. 트러블 슈팅
- 데이터 처리 시간
- CORS이슈
- 공통코드화


<br>

## 9. 프로젝트 후기

<img width="822" alt="스크린샷 2024-03-12 오전 11 48 07" src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/289fe901-4246-4943-91ef-955a8e69a6c5">

