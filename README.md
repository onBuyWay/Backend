# onBuyWay-Node

onBuyWay 是一個電子商務後端專案，它使用 Express 和 PostgreSQL 進行建立，並以 RESTful 的風格設計 API。此外，我們利用 GitHub Actions 建立了一個 CI/CD 流程，並最終將專案部署到 AWS EC2 上。

## 目錄

- [Origin of Project - 專案緣起](#origin-of-the-project---專案緣起)
- [Features - 專案功能](#Features---專案功能)
- [DB Architecture - 資料庫架構](#DB-Architecture---資料庫架構)
- [APIs Document- API 文件](#apis-document--api-文件)
- [Environment SetUp - 環境建置](#Environment-SetUp---環境建置)
- [Navigating the Project Installation - 專案安裝流程](#navigating-the-project-installation---本地專案安裝流程)

## Origin of the Project - 專案緣起

在那些平淡無奇的服役日子裡，我有幸遇見了一位名叫 Ning 的朋友。

我們的友誼在無數的課堂閒聊中逐漸深化，我們分享著各自的志向，期待著退伍後的新生活。

我渴望成為一位優秀的後端工程師，而 Ning 則希望能夠成為一位前端工程師。

於是，一個念頭在我們心中萌芽：為何不攜手合作，共同創建一個專案呢？

就這樣，我們的專案在這種期待和抱負中誕生了。這不僅是一個專案的開始，也是我們實現抱負的第一步。

## Features - 專案功能

- 消費者 CRUD - 商品瀏覽、加入購物車、創建訂單、訂單瀏覽、結帳付款
- 管理員 CRUD - 商品管理、商品分類管理、訂單管理
- 整合 Jest / supertest 完成 API 測試
- 使用 Github Actions 建立自動化整合(CI)，執行 Jest 測試
- CI 流程使用 Docker 將專案環境自動更新至 Docker Hub
- 使用 Github Actions 建立自動化部署（CD）至 AWS EC2
- 串接第三方藍新金流，提供多種支付方式
- 使用 passport.js 實作 Session Cookie Authentication
- 以 nodemailer 實現商品下訂、付款、寄送後 Email 通知功能
- 採用 multer 對接前後端檔案程式
- 使用 imgur API，雲端保存商品圖片
- 採用 bcrypt 處理使用者明碼

## DB Architecture - 資料庫架構

<p align="center">
  <img src="https://github.com/onBuyWay/Backend/onBuyWay _DataBase_Arc.png" alt="onBuyWay _DataBase_Arc"/>
</p>

## APIs Document- API 文件

- [APIs Document](http://ec2-13-55-20-11.ap-southeast-2.compute.amazonaws.com/api-docs/)

## Environment SetUp - 環境建置

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker-onbuyway-node](https://hub.docker.com/r/kevin71336099/onbuyway-node)
- [Docker-PostgreSQL](https://hub.docker.com/_/postgres)

## Navigating the Project Installation - 本地專案安裝流程

1. 使用 terminal，Clone 此專案至本機

```
git clone https://github.com/onBuyWay/Backend
```

2. 進入專案的資料夾

```
cd Backend
```

3. 使用 npm 安裝專案相關套件

```
npm intall
```

4. 環境變數設定

請自行設定.env 對應的環境變數

```
IMGUR_CLIENT_ID= imgur api參數
IMGUR_CLIENT_SECRET= imgur api參數
IMGUR_REFRESH_TOKEN= imgur api參數
IMGUR_ALBUM_ID= imgur api參數
GMAIL_USER= 商店email
GMAIL_PASS= Gmail API和oauth2.0憑證密碼
URL = 專案host URL
HASH_KEY = 藍新商店HASH_KEY
HASH_IV = 藍新商店HASH_IV
MERCHANT_ID = 藍新商店ID
```

5. 資料庫遷移

依據 NODE_ENV 對不同資料庫進行遷移

```
npx sequelize db:migrate
```

6. 產生種子資料

```
npx sequelize db:seed:all
```

7. 測試

於測試環境進行 API 測試

```
npm run test
```

8. 啟動應用程式，執行 server.js 檔案

```
npm run dev
```
