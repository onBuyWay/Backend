'use strict'
const { faker } = require('@faker-js/faker')
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Products',
      [
        {
          name: 'Levis 寬鬆版牛仔鋪棉連帽外套 / 精工香草綠洗舊 男款 A3222-0004 熱',
          image: 'https://down-tw.img.susercontent.com/file/tw-11134201-7r98z-lq8ml1etrdg8e0',
          description: `
          #中午前下單完款當日下午出貨
          # LEVI’S百貨專櫃皆可免費修改褲長，皮帶打洞
          #換貨免運費，不用怕尺寸不合
          #鑑賞期內退貨免運費，退貨時必須回復至您收到商品時的原始狀態，包含主商品、配件、包裝吊牌完整、活動贈品及出貨單等。
          復古休閒單品 精工香草綠洗舊 百搭基本款
          `,
          stockQuantity: 50,
          costPrice: 2000,
          sellPrice: 3000,
          productStatus: true,
          categoryId: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '【DIFF】韓版簡約氣質百搭設計感小眾長袖上衣 女裝 衣服 寬鬆上衣 顯瘦上衣 素色 冬裝 長袖t恤 素T【W201】',
          image: 'https://down-tw.img.susercontent.com/file/tw-50009109-51d719155810219f31e6b78cea0069e4',
          description: `
          我的天啊闆闆終於新進這款了
          大概萬年不退流行就非它莫屬了
          出門完全不用想穿搭
          穿上它你就是女神了
          沒有人不被它的美所吸引到  你在不下手 又要缺貨了

          尺寸:
          衣長61  肩寬37  胸圍94  袖長58

          📣洗滌方式+貼心提醒📣
          ⭐商品尺寸皆為手工測量，誤差1-3cm皆為正常範圍
          ⭐若商品有些線頭或是未開眼，再麻煩美女自行修剪以及開扣眼唷
          ⭐任何衣服建議單獨洗滌，避免造成衣物顏色互染的情形
          ⭐布料首次洗滌時易釋出染劑，屬於正常現象
          ⭐商品勿長時間浸泡、勿使用漂白水、勿使用烘衣機
          `,
          stockQuantity: 1000,
          costPrice: 100,
          sellPrice: 200,
          productStatus: true,
          categoryId: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'Timberland 男款小麥色全粒面皮革Atwells Ave防水查卡靴|A5SAM231',
          image: 'https://down-tw.img.susercontent.com/file/tw-11134201-7r98o-lkkwue8mc6dc04',
          description: `
          ．銀級鞣皮皮革

          ．橡膠大底
          
          ．經典品牌標誌
          
          享受我們完全防水的 ATWELLS AVE 中筒靴帶來的舒適感。採用優質 Timberland® 皮革製成，配有我們舒適的 GreenStride™ 鞋底，採用 EVA 混合物製成，包括至少 65% 來自甘蔗和負責任種植橡膠的生物基質材料。
          
          
          
          ．商品系列: Atwells Ave WP Chukka
          
          
          
          ．商品材質：
          
            。鞋面採用國際皮革工作組織（LWG）銀級認證皮革廠的優質防水皮革
          
            。ReBOTL™織物內裡
          
          
          
          ．商品特色
          
            。綁帶式設計
          
            。EVA鞋墊
          
            。壓模EVA大底
          
            。GreenStride™鞋底
          
            。接縫密封結構
          
            。橡膠大底
          
          ．楦型說明：此鞋款楦型屬亞洲版型，楦頭較寬，符合亞洲人腳部結構設計，給予雙腳舒適空間
          
          ＊材質：
          
          鞋類-皮革/聚脂纖維(實際依吊牌標示為主)
          
          服飾類-棉質/聚脂纖維(實際依吊牌標示為主)
          
          配件類-尼龍/聚脂纖維(實際依吊牌標示為主)
          
          ＊此為官方唯一旗艦店，若有需協助事項可透過蝦皮聊聊與客服聯繫
          `,
          stockQuantity: 50,
          costPrice: 2500,
          sellPrice: 4500,
          productStatus: true,
          categoryId: 3,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'FJ K3 獨家38段液晶顯頻筋膜按摩槍 USB充電 2400mAh內置電池 AI晶片系統 筋膜槍 按摩槍【買一送十】',
          image: 'https://down-tw.img.susercontent.com/file/tw-50009109-51d719155810219f31e6b78cea0069e4',
          description: `
          品名：USB深層筋膜肌肉按摩槍
          💓型號：K3
          💓尺寸：160*65*210(mm)
          💓重量：710g
          💓顏色：白色/黑色
          💓材質：ABS+電子元件
          💓內建電量:可充式電池2400mAh(不可拆卸)
          💓充電接口:Micro USB
          💓充電電壓：5V/2A
          💓輸出功率：30-50W
          💓產地：中國
          💓保固期：原廠保固3個月,憑發票保固
          💓包裝內容物:主機,按摩頭*6,USB線,收納包,說明書,保固卡
          💓包裝尺寸:270*210*100(mm)
          💓包裝重量:1150g
          `,
          stockQuantity: 200,
          costPrice: 300,
          sellPrice: 699,
          productStatus: true,
          categoryId: 4,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '多用途汽車雙掛鉤 I OPP包裝 黑色 掛勾 車上配件 收納 日常用品 現貨 外出用品 【國王皇后】',
          image: 'https://down-tw.img.susercontent.com/file/tw-50009109-51d719155810219f31e6b78cea0069e4',
          description: `
          材質:材質：ABS

          尺寸:110x100x10mm

          產地: 中 國

          包裝：0pp包裝

          產品列表：1×椅背鉤

          承重：3公斤

          產品特點：採用優質材料，實用耐用的。尺寸緊湊，重量輕。

          使用簡單，攜帶方便。


          建議用途：將此掛鉤一頭鉤在汽車座位上，另兩個掛鉤就可以掛置一些物品

          使用安全：設計合理，安全性能佳。

          使用性能：你是否有這樣的情況，去超市購物回家，零零散散的把一堆堆袋袋往車上一放，有時會弄髒了車子，有時東西在行駛的過程中從座位上掉下，很麻煩，現在有了這個掛鉤，無論是掛在前面還是後面，都可以將物品牢牢的固定在那裡。十分方便~ 是你駕車購物生活的好幫手哦！

          使用方便：易於存放、取用自如。
          `,
          stockQuantity: 20,
          costPrice: 10,
          sellPrice: 49,
          productStatus: true,
          categoryId: 5,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '李施德霖全效護理抗敏感漱口水750ml',
          image: 'https://down-tw.img.susercontent.com/file/sg-11134201-7rbml-ll504o4jcn8sca',
          description: `
          商品規格
          商品簡述:李施德霖全效護理抗敏感漱口水750ml
          原產地:泰國
          深、寬、高:11.0x6.0x25.5
          淨重:750.0g
          保存環境:室溫
          有效期限:依產品標示為主
          
          藥商許可執照:
          藥商諮詢專線:0800-051-148
          許可執照字號:北市衛藥販（松）字第620101C611號 
          藥商名稱:台灣屈臣氏個人用品商店股份有限公司
          藥商地址:台北市松山區八德路四段760號11樓之1、之2及14樓
          藥商諮詢專線:(02)27421234
          `,
          stockQuantity: 200,
          costPrice: 50,
          sellPrice: 200,
          productStatus: true,
          categoryId: 6,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '檸檬泡椒鳳爪小吃170G 大陸零食 泡椒雞腳 零食 麻辣 滷味 無骨雞爪 辣椒 泡椒小米辣 辣椒醬 冷凍食品【m104】',
          image: 'https://down-tw.img.susercontent.com/file/a9ba61b74d4b5c24041b2fc010ef4041',
          description: `
          限全家冷凍超取或宅配

          柳丁愛麻辣滷味，采用秘制香料精心烹制而成，辣的世界，也分很多國界，柳丁愛麻辣滷味融入楚湘傳統美食烹饪技法，結合中式漢方食譜，博采衆長，積數年心血研制。



          成份：檸檬、鳳爪、醬油、水、辛香料、辣椒、花椒

          品牌：柳丁愛麻辣製作所

          規格:170g

          保存期限:冷藏7天，冷凍6個月

          產地：台灣

          營養標：如圖示



          保存方式:本產品為熟食宅配，只需將產品拿出冷凍，含袋子，待解凍後撕開包裝即可食用。

          最佳賞味方式：



          保存期限：冷藏可放7天，冷凍可放一年個月 



          ps：本產品皆不含防腐劑請儘快食用，保證食品新鮮送到您手中！

          製造日期見包裝說明
          `,
          stockQuantity: 8000,
          costPrice: 50,
          sellPrice: 140,
          productStatus: true,
          categoryId: 7,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: '日本木村 可樂／汽水(240ml) 款式可選 【小三美日】限宅配/空運禁送',
          image: 'https://down-tw.img.susercontent.com/file/6c899a673a8261a8568f8611f8d25bb2',
          description: `
          【商品特色】

          日本知名飲料大廠！
          
          濃濃的日本風加上獨特玻璃瓶
          
          櫻花風味可樂/富士山頂可樂/富士山汽水/富士山柚子風味汽水/紅富士山葡萄汽水/靜岡綠茶可樂
          
          
          
          
          
          產品說明：
          
          櫻花風味可樂
          
          萃取日本產櫻花精華，伴隨著碳酸氣入喉後可以感受到櫻花香氣，是一款有著淡雅粉紅色澤且具和風概念的可樂。
          
          
          
          富士山頂可樂
          
          以覆蓋美麗白雪的雄偉富士山為意象所製作出來的可樂。擁有如同富士山頂上澄澈空氣般的透明柔滑口感。
          
          
          
          富士山汽水
          
          使用獲得"Monde Selection"最高金賞肯定的「富士山萬年水」為基底，以富士山為意象所製作出當地代表性的汽水。
          
          
          
          富士山柚子風味汽水
          
          使用柚子果汁製造而成，清新爽口的滑順口感、暢快的尾韻，是一款充滿柚子香味的蘇打汽水。
          
          
          
          紅富士山葡萄汽水
          
          使用富士山的天然水以及日本山梨縣產的優良葡萄汁，香味濃郁無比，是一款奢華感十足的汽水。
          
          
          
          靜岡綠茶可樂
          
          日本靜岡縣產的名品綠茶中加入可樂，不可思議的口感請您嘗試。
          
          
          
          製造廠商或國內負責廠商名稱: 友士股份有限公司
          
          製造廠商或國內負責廠商地址:台北市中正區忠孝東路一段85號20樓
          
          製造廠商或國內負責廠商電話:02-2393-4825
          
          食品業者登錄字號:A-104242698-00000-3
          
          投保產品責任險字號: 華南產物產品責任保險單1400第122050496號 
          `,
          stockQuantity: 2000,
          costPrice: 40,
          sellPrice: 85,
          productStatus: true,
          categoryId: 8,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: `POLYWELL USB3.2 Type-C 4埠高速集線器 分線器 擴展器 10Gbps Hub 寶利威爾 台灣現貨`,
          image: 'https://down-tw.img.susercontent.com/file/tw-50009109-148f80bd55c70d2d0b93dfdaad8bfcac',
          description: `
          ◎ 產品名稱: USB-C 3.2 Gen2 4合一高速集線器

          ◎ 產品型號: PW15-T02-A043
          
          ◎ 輸入形式: USB3.2 Gen2 Type-C公 x1
          
          ◎ 輸出形式: USB3.2 Gen2 Type-C母 x4
          
          ◎ 輸出速率: 10Gbps Max.
          
          ◎ 電源輸入: DC 5V-2A
          
          ◎ 線總長: 約19公分
          
          ◎ 產品重量: 32g
          
          ◎ 產品認證: 台灣BSMI D3E498 (非本公司授權經銷商不得使用, 盜用必究!)
          
          ◎ 產品特色:
          
            - 輕便型Type-C擴充器, 具OTG功能適合連接隨身碟, 讀卡機, 耳機麥克風... 等
          
            - 4埠全支援 USB3.2 Gen2規格, 傳輸速率可達10Gbps Max.
          
            - 使用台製, 創惟 GL3590 USB3.2控制晶片, 穩定傳輸不過熱不掉線
          
            - Windows/Mac/IOS/Android 電腦筆電, 手機iPhone15 Android, iPad 隨插即用, 不需安裝軟體
          `,
          stockQuantity: 800,
          costPrice: 250,
          sellPrice: 450,
          productStatus: true,
          categoryId: 9,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          name: 'GoKids玩樂小子桌上遊戲/狼人真言/中文版/Werewords eslite誠品',
          image: 'https://down-tw.img.susercontent.com/file/tw-11134207-7qul0-lfj2r4s2yuwab5',
          description: `
          狼人的嚎叫近在咫尺，只有4分鐘的時間尋找魔法咒語，

          保護先知，拯救你們的小鎮吧！
          
          搭配行動裝置《狼人真言》應用程式。
          
          在Gokids.com.tw 下載應用程式(APP)
          
          遊戲適合8歲以上，4-10位玩家，時間10分鐘。
          
          狼人的嚎叫近在咫尺，只有4分鐘的時間尋找魔法咒語，保護先知，拯救你們的小鎮吧！ 搭配行動裝置《狼人真言》應用程式。在Gokids.com.tw 下載應用程式(APP)遊戲適合8歲以上，4-10位玩家，時間10分鐘。
          `,
          stockQuantity: 200,
          costPrice: 200,
          sellPrice: 500,
          productStatus: true,
          categoryId: 10,
          created_at: new Date(),
          updated_at: new Date()
        }
      ]
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', {})
  }
}
