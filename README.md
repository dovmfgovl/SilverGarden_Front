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
- 로그인이 되어 있는 경우 : README 홈 화면


| 초기화면 |
| -------- |

![로그인 화면](https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/a017fa5f-ba5b-4bf4-9be6-384520449c7b)

<br>

### [ 예시 로그인]

- 내용
- 내용
- 내용


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

## 8. 트러블 슈팅
- 데이터 처리 시간
- CORS이슈
- 공통코드화


<br>

## 9. 프로젝트 후기

<img width="822" alt="스크린샷 2024-03-12 오전 11 48 07" src="https://github.com/Suyeon12345/SilverGarden_Front/assets/144109053/289fe901-4246-4943-91ef-955a8e69a6c5">

