## 스트리머 돌림판 만들어 주기

우연한 계기로 스트리머 전용 돌림판을 만들게 되었습니다.

코드는 다소 난잡하지만, 추후에 전체적인 코드 정리를 진행할 예정입니다.

## 구현된 기능

|Feature|Description|
|---|---|
|SPIN, STOP|돌림판을 회전한 후에 원하는 타이밍에 정지하여 긴장감 넘치는 결과를 기대할 수 있습니다.|
|룰렛 추가|룰렛 아이템을 원하는 만큼 추가하여 돌림판을 돌릴 수 있습니다.|
|스크린샷 저장|룰렛을 감싸고 있는 DOM을 캡처하여 결과 상태를 이미지로 다운로드 할 수 있습니다.|
|이름 수정|아이템을 추가한 후 다시 아이템 이름을 수정할 수 있습니다.|
|개수 수정|아이템을 추가한 후에 개수는 1개로 지정되므로 아이템을 추가한 이후에 개수를 수정하여 확률을 조정할 수 있습니다.|

## 화면

![image](https://github.com/user-attachments/assets/84f8cc7f-368f-47fe-96e1-e6ff1dbc9c59)

## 동작 화면

<img src="/preview/Animation.gif" width="100%" height=""/>

## 라이브러리

|Library|Description|
|---|---|
|confetti|파티클 효과를 쉽게 사용이 가능합니다.|
|html2canvas|DOM을 선택하여 캡처하고, 이미지로 추출이 가능합니다.|

## 폰트

|Fonts|Description|
|---|---|
|Neo둥근모|픽셀 폰트, 무료로 사용이 가능한 폰트입니다.|

출처 : https://neodgm.dalgona.dev/downloads/neodgm.html

## DEMO
[jiwooproity.github.io/game-spinner/](https://jiwooproity.github.io/game-spinner/)
