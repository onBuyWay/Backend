const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'onBuyWay API',
    description: 'Description'
  },
  definitions: {
    SignUpUser_Body: {
      $name: 'user_example',
      $password: 'password_example',
      passwordCheck: 'password_example',
      $email: 'email_example',
      birthday: '1990-01-01',
      phone: 'xxxxxxxxxx',
      gender: 'boy'
    },
    SignUpUser_Success: {
      status: 'success',
      data: {
        id: 5,
        name: 'user_example',
        password:
          '$2a$10$IMzB0FRUV.KVw1D458iLNOycwLmPiGfsrPnqxSkBCJrgra2W9cRoG',
        email: 'email_example',
        birthday: '1990-01-01',
        phone: 'xxxxxxxxxx',
        gender: 'boy',
        isAdmin: false,
        updatedAt: '2024-01-17T08:18:28.238Z',
        createdAt: '2024-01-17T08:18:28.238Z'
      }
    },
    SignUpUser_Error_FiledNotEmpty: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '帳號、密碼、姓名欄位不能為空!!'
      }
    },
    SignUpUser_Error_PasswordValidationFailed: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '密碼驗證未通過!'
      }
    },
    SignUpUser_Error_CONFLICT: {
      status: 'error',
      error: {
        name: 'CONFLICT',
        message: 'eamil已經註冊過!'
      }
    },
    SignInUser_Body: {
      password: 'password_example',
      email: 'email_example'
    },
    SignInUser_Sucess: {
      status: 'success',
      data: {
        id: 5,
        name: 'user_example',
        password:
          '$2a$10$IMzB0FRUV.KVw1D458iLNOycwLmPiGfsrPnqxSkBCJrgra2W9cRoG',
        email: 'email_example',
        birthday: '1990-01-01',
        phone: 'xxxxxxxxxx',
        gender: 'boy',
        address: 'null',
        isAdmin: false,
        updatedAt: '2024-01-17T08:18:28.238Z',
        createdAt: '2024-01-17T08:18:28.238Z'
      }
    },
    SignInUser_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '帳號或是密碼錯誤'
      }
    },
    GetUser_Success: {
      status: 'success',
      data: {
        id: 3,
        name: 'user_example',
        email: 'email_example',
        password:
          '$2a$10$IMzB0FRUV.KVw1D458iLNOycwLmPiGfsrPnqxSkBCJrgra2W9cRoG',
        phone: 'xxxxxxxxxx',
        birthday: '1990-01-01',
        gender: 'boy',
        address: 'null',
        isAdmin: false,
        createdAt: '2024-01-17T08:18:28.000Z',
        updatedAt: '2024-01-17T08:18:28.000Z'
      }
    },
    GetUser_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    GetUser_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該使用者'
      }
    },
    PutUser_Body: {
      name: 'user_example',
      birthday: '1998-04-27',
      phone: '0958280647',
      gender: 'boy',
      address: '974 花蓮縣壽豐鄉中正一邨13號'
    },
    PutUser_Success: {
      status: 'success',
      data: {
        id: 3,
        name: 'user_example',
        email: 'email_example',
        password:
          '$2a$10$IMzB0FRUV.KVw1D458iLNOycwLmPiGfsrPnqxSkBCJrgra2W9cRoG',
        phone: '0958280647',
        birthday: '1998-04-27',
        gender: 'boy',
        address: '974 花蓮縣壽豐鄉中正一邨13號',
        isAdmin: false,
        createdAt: '2024-01-17T08:18:28.000Z',
        updatedAt: '2024-01-20T10:26:25.284Z'
      }
    },
    PutUser_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    PutUser_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該使用者'
      }
    },
    PutUser_Conflict: {
      status: 'error',
      error: {
        name: 'CONFLICT',
        message: '使用者名稱已經註冊過!'
      }
    },
    AdminGetProducts_Success: {
      status: 'success',
      data: [
        {
          id: 65,
          name: 'Gorgeous Fresh Fish',
          image:
            'https://loremflickr.com/640/480/product?lock=3148228558061568',
          description:
            'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
          stockQuantity: 133,
          costPrice: 197,
          sellPrice: 595,
          productStatus: '1',
          categoryId: 40,
          createdAt: '2024-01-25T08:29:27.000Z',
          updatedAt: '2024-01-25T08:29:27.000Z',
          CategoryId: 40,
          Category: {
            id: 40,
            name: '女裝',
            createdAt: '2024-01-25T08:29:27.000Z',
            updatedAt: '2024-01-25T08:29:27.000Z'
          }
        }
      ]
    },
    AdminGetProducts_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminGetProduct_Success: {
      status: 'success',
      data: {
        id: 65,
        name: 'Gorgeous Fresh Fish',
        image: 'https://loremflickr.com/640/480/product?lock=3148228558061568',
        description:
          'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
        stockQuantity: 133,
        costPrice: 197,
        sellPrice: 595,
        productStatus: '1',
        categoryId: 40,
        createdAt: '2024-01-25T08:29:27.000Z',
        updatedAt: '2024-01-25T08:29:27.000Z',
        CategoryId: 40,
        Category: {
          id: 40,
          name: '女裝',
          createdAt: '2024-01-25T08:29:27.000Z',
          updatedAt: '2024-01-25T08:29:27.000Z'
        }
      }
    },
    AdminGetProduct_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminGetProduct_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該商品'
      }
    },
    AdminPostProduct_Body: {
      name: '可樂',
      stockQuantity: '100',
      costPrice: '10',
      sellPrice: '35',
      productStatus: 'true',
      categoryId: '1',
      description: '可樂超好喝',
      image: 'image_file'
    },
    AdminPostProduct_Success: {
      status: 'success',
      data: {
        id: 3,
        name: '可樂',
        image: 'https://i.imgur.com/ckn2tzv.jpg',
        description: '可樂超好喝',
        stockQuantity: '100',
        costPrice: '10',
        sellPrice: '35',
        productStatus: true,
        categoryId: '1',
        updatedAt: '2024-01-22T06:17:31.482Z',
        createdAt: '2024-01-22T06:17:31.482Z'
      }
    },
    AdminPostProduct_BadRequest: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '商品資訊欄位不能為空!'
      }
    },
    AdminPostProduct_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminPostProduct_Conflict: {
      status: 'error',
      error: {
        name: 'CONFLICT',
        message: '商品名稱已經註冊過!'
      }
    },
    AdminPutProduct_Body: {
      name: '可樂',
      stockQuantity: '200',
      costPrice: '15',
      sellPrice: '40',
      productStatus: 'true',
      categoryId: '1',
      description: '可樂超好喝!!!',
      image: 'image_file'
    },
    AdminPutProduct_Success: {
      status: 'success',
      data: {
        id: 3,
        name: '可樂',
        image: 'https://i.imgur.com/IILT3WL.jpg',
        description: '可樂超好喝!!!',
        stockQuantity: '200',
        costPrice: '15',
        sellPrice: '40',
        productStatus: true,
        categoryId: '1',
        createdAt: '2024-01-22T06:17:31.000Z',
        updatedAt: '2024-01-22T10:44:15.110Z'
      }
    },
    AdminPutProduct_BadRequest: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '商品資訊欄位不能為空!'
      }
    },
    AdminPutProduct_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminPutProduct_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該商品'
      }
    },
    AdminPutProduct_Conflict: {
      status: 'error',
      error: {
        name: 'CONFLICT',
        message: '商品名稱已經註冊過!'
      }
    },
    AdminDeleteProduct_Success: {
      status: 'success',
      data: {}
    },
    AdminDeleteProduct_Unauthorized: {
      status: 'error',
      error: { name: 'Unauthorized', message: '使用者未登入!' }
    },
    AdminDeleteProduct_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該商品!'
      }
    },
    AdminPostCategory_Body: {
      name: '零食'
    },
    AdminPostCategory_Success: {
      status: 'success',
      data: {
        id: 1,
        name: '零食',
        updatedAt: '2024-01-23T17:03:37.630Z',
        createdAt: '2024-01-23T17:03:37.630Z'
      }
    },
    AdminPostCategory_BadRequest: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '類別名稱欄位不能為空!'
      }
    },
    AdminPostCategory_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminPostCategory_Conflict: {
      status: 'error',
      error: {
        name: 'CONFLICT',
        message: '類別名稱已經註冊過!'
      }
    },
    AdminPutCategory_Body: {
      name: '零食'
    },
    AdminPutCategory_Success: {
      status: 'success',
      data: {
        id: 1,
        name: '零食',
        createdAt: '2024-01-23T17:03:37.000Z',
        updatedAt: '2024-01-23T17:03:37.000Z'
      }
    },
    AdminPutCategory_BadRequest: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '類別名稱欄位不能為空!'
      }
    },
    AdminPutCategory_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminPutCategory_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該類別!'
      }
    },
    AdminPutCategory_Conflict: {
      status: 'error',
      error: {
        name: 'CONFLICT',
        message: '類別名稱已經註冊過!'
      }
    },
    AdminGetCategories_Success: {
      status: 'success',
      data: [
        {
          id: 1,
          name: '零食',
          createdAt: '2024-01-23T17:03:37.000Z',
          updatedAt: '2024-01-23T17:03:37.000Z'
        }
      ]
    },
    AdminGetCategories_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminGetCategory_Success: {
      status: 'success',
      data: {
        id: 1,
        name: '零食',
        createdAt: '2024-01-23T17:03:37.000Z',
        updatedAt: '2024-01-23T17:03:37.000Z'
      }
    },
    AdminGetCategory_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminGetCategory_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該類別'
      }
    },
    AdminDeleteCategory_Success: {
      status: 'success',
      data: {}
    },
    AdminDeleteCategory_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AdminDeleteCategory_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該類別!'
      }
    },
    PostFavorite_Success: {
      status: 'success',
      data: {
        productId: '66',
        userId: 32,
        updatedAt: '2024-01-25T13:45:27.307Z',
        createdAt: '2024-01-25T13:45:27.307Z'
      }
    },
    PostFavorite_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    PostFavorite_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該商品'
      }
    },
    PostFavorite_Conflict: {
      status: 'error',
      error: {
        name: 'CONFLICT',
        message: '已加入最愛名單中!'
      }
    },
    DeleteFavorite_Success: {
      status: 'success',
      data: {}
    },
    DeleteFavorite_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    DeleteFavorite_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '該商品不在最愛名單中'
      }
    },
    GetProducts_Success: {
      status: 'success',
      data: [
        {
          id: 65,
          name: 'Gorgeous Fresh Fish',
          image:
            'https://loremflickr.com/640/480/product?lock=3148228558061568',
          description: 'designed to give easy fit....',
          stockQuantity: 133,
          costPrice: 197,
          sellPrice: 595,
          productStatus: '1',
          categoryId: 40,
          createdAt: '2024-01-25T08:29:27.000Z',
          updatedAt: '2024-01-25T08:29:27.000Z',
          CategoryId: 40,
          Category: {
            id: 40,
            name: '女裝',
            createdAt: '2024-01-25T08:29:27.000Z',
            updatedAt: '2024-01-25T08:29:27.000Z'
          },
          numOfFavorite: 1,
          isFavorited: false
        }
      ]
    },
    GetProduct_Success: {
      status: 'success',
      data: {
        id: 65,
        name: 'Gorgeous Fresh Fish',
        image: 'https://loremflickr.com/640/480/product?lock=3148228558061568',
        description:
          'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
        stockQuantity: 133,
        costPrice: 197,
        sellPrice: 595,
        productStatus: '1',
        categoryId: 40,
        createdAt: '2024-01-25T08:29:27.000Z',
        updatedAt: '2024-01-25T08:29:27.000Z',
        CategoryId: 40,
        Category: {
          id: 40,
          name: '女裝',
          createdAt: '2024-01-25T08:29:27.000Z',
          updatedAt: '2024-01-25T08:29:27.000Z'
        },
        isFavorited: false
      }
    },
    GetProduct_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該商品'
      }
    },
    PostCart_Success: {
      status: 'success',
      data: {
        cartItem: {
          quantity: 1,
          cartId: 1,
          productId: '66',
          updatedAt: '2024-01-27T08:31:03.096Z',
          createdAt: '2024-01-27T08:31:03.096Z'
        },
        addProduct: {
          id: 66,
          name: 'Tasty Steel Soap',
          image:
            'https://loremflickr.com/640/480/product?lock=8423580974972928',
          description:
            'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
          stockQuantity: 194,
          costPrice: 111,
          sellPrice: 691,
          productStatus: '1',
          categoryId: 39,
          createdAt: '2024-01-25T08:29:27.000Z',
          updatedAt: '2024-01-25T08:29:27.000Z'
        }
      }
    },
    PostCart_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    PostCart_NotFound: {
      status: 'error',
      error: {
        name: 'Not Found',
        message: '商品庫存不足'
      }
    },
    GetCart_Success: {
      stauts: 'success',
      data: {
        cartProducts: [
          {
            id: 66,
            name: 'Tasty Steel Soap',
            image:
              'https://loremflickr.com/640/480/product?lock=8423580974972928',
            description:
              'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
            stockQuantity: 194,
            costPrice: 111,
            sellPrice: 691,
            productStatus: '1',
            categoryId: 39,
            createdAt: '2024-01-25T08:29:27.000Z',
            updatedAt: '2024-01-25T08:29:27.000Z',
            CategoryId: 39,
            CartItem: {
              quantity: 3,
              cartId: 1,
              productId: 66,
              createdAt: '2024-01-27T12:48:22.000Z',
              updatedAt: '2024-01-27T12:48:26.000Z'
            }
          }
        ],
        totalPrice: 2073
      }
    },
    GetCart_Success_Empty: {
      stauts: 'success',
      message: '目前購物車中沒有商品~'
    },
    GetCart_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    DeleteCartItem_Success: {
      status: 'success',
      data: {}
    },
    DeleteCartItem_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    DeleteCartItem_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '找不到該商品'
      }
    },
    AddCartItem_Success: {
      status: 'success',
      data: {
        cartItem: {
          id: 5,
          quantity: 3,
          cartId: 1,
          productId: 66,
          createdAt: '2024-01-28T15:28:58.000Z',
          updatedAt: '2024-01-28T15:36:00.000Z'
        }
      }
    },
    AddCartItem_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    AddCartItem_NotFound: {
      status: 'error',
      error: {
        name: 'Not Found',
        message: '商品庫存不足'
      }
    },
    SubCartItem_Success: {
      status: 'success',
      data: {
        cartItem: {
          id: 5,
          quantity: 2,
          cartId: 1,
          productId: 66,
          createdAt: '2024-01-28T15:28:58.000Z',
          updatedAt: '2024-01-28T15:52:50.633Z'
        }
      }
    },
    SubCartItem_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    CheckCart_Success: {
      stauts: 'success',
      data: {
        cartProducts: [
          {
            id: 66,
            name: 'Tasty Steel Soap',
            image:
              'https://loremflickr.com/640/480/product?lock=8423580974972928',
            description:
              'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
            stockQuantity: 100,
            costPrice: 111,
            sellPrice: 691,
            productStatus: '1',
            categoryId: 39,
            createdAt: '2024-01-25T08:29:27.000Z',
            updatedAt: '2024-01-25T08:29:27.000Z',
            CategoryId: 39,
            CartItem: {
              id: 5,
              quantity: 2,
              cartId: 1,
              productId: 66,
              createdAt: '2024-01-28T15:28:58.000Z',
              updatedAt: '2024-01-28T15:52:50.000Z'
            }
          }
        ],
        totalPrice: 1382
      }
    },
    CheckCart_BadRequest: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '購物車中沒有商品，無法送出訂單。'
      }
    },
    CheckCart_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    PostOrder_Body: {
      userId: '33',
      name: 'Hong',
      amount: '4146',
      phone: '0958280906',
      address: '興亥路一段19巷47號',
      paymentStatus: '未付款',
      shippingStatus: '待出貨'
    },
    PostOrder_Success: {
      status: 'success',
      data: {
        id: 6,
        userId: '33',
        name: 'Hong',
        amount: '4146',
        phone: '0958280906',
        address: '興亥路一段19巷47號',
        paymentStatus: '未付款',
        shippingStatus: '待出貨',
        updatedAt: '2024-01-30T18:33:21.223Z',
        createdAt: '2024-01-30T18:33:21.223Z'
      }
    },
    PostOrder_BadRequest: {
      status: 'error',
      error: {
        name: 'BAD REQUEST',
        message: '請填寫訂單取貨資訊'
      }
    },
    PostOrder_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    PostOrder_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '以下商品庫存不足: Tasty Steel Soap'
      }
    },
    GetOrders_Success: {
      status: 'success',
      data: [
        {
          id: 1,
          userId: 33,
          sn: null,
          amount: 3455,
          name: 'Hong',
          phone: '0958280906',
          address: '興亥路一段19巷47號',
          paymentStatus: '未付款',
          shippingStatus: '待出貨',
          createdAt: '2024-01-30T18:21:40.000Z',
          updatedAt: '2024-01-30T18:21:40.000Z',
          orderProducts: [
            {
              id: 66,
              name: 'Tasty Steel Soap',
              image:
                'https://loremflickr.com/640/480/product?lock=8423580974972928',
              description:
                'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
              stockQuantity: 0,
              costPrice: 111,
              sellPrice: 691,
              productStatus: '1',
              categoryId: 39,
              createdAt: '2024-01-25T08:29:27.000Z',
              updatedAt: '2024-01-30T18:28:11.000Z',
              CategoryId: 39,
              OrderItem: {
                productId: 66,
                orderId: 2,
                quantity: 5,
                createdAt: '2024-01-30T18:22:30.000Z',
                updatedAt: '2024-01-30T18:22:30.000Z'
              }
            }
          ]
        }
      ]
    },
    GetOrders_NoOrder: {
      stauts: 'success',
      data: [],
      message: '目前還未訂購任何商品喔~'
    },
    GetOrders_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    CancelOrder_Success: {
      status: 'success',
      message: '編號id:1的訂單已取消'
    },
    CancelOrder_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    CancelOrder_NotFound: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '訂單不存在或是已經取消'
      }
    },
    GetPayment_Success: {
      status: 'success',
      data: {
        order: {
          id: 3,
          userId: 33,
          sn: 1706774645,
          amount: 3455,
          name: 'Hong',
          phone: '0958280906',
          address: '興亥路一段19巷47號',
          paymentStatus: '未付款',
          shippingStatus: '待出貨',
          createdAt: '2024-01-30T18:23:55.000Z',
          updatedAt: '2024-02-01T08:04:05.726Z'
        },
        mpgParams: {
          MerchantID: 'MS151399032',
          TradeInfo:
            '6027cf385133cdd989cb84557828a4f8409b29b77c603638564230fb93d9ce47ef79f03a4ac3078202a5f68fffd05d5aa462e2dcb513da5f84eb59aeede820ad7c0ee8ca3656655b16488620e4e100dc306bf1cb04c9cf1fcb7de6b5db4c7118c3d76f27c8134b90a3879b1761287e1fb193783306af6249440980e1f1b26a9cbcb65ca31b9a8bdb6026acd1988e2a815cf661ba138d5b512a0b20f5e1d7942ca31753cb328dbc1611048d6f65339fcfb8e0d9548c9838110c600e22c75c67eeb4bb5a1e2cca19c854c37c565060d4eae28221318f2364e4aaa4caea2884d720a72efc60a8ab4ce41897a61c49de7de55e0eb955947d0a7e2ef1d4b415d0bcd08f5b5eee521dc4d16ff1cd8a80e440c4bcc8cf9e6f512a83a60c93a8b4d3900ae2d71c1574d7a115a2f01a3deb1ce6582474e36a036e499cada6f2d4501148b24ca1085d480fa6024e1cd7ce25cd22c8e4651e623dcca0e32505255051dc96dd5fbf48b0945464f80c88743adc7c11d723f72b0eec21b61f41d03715550953c6ffa10564396ca14cea9b84b235fb49df8b89edd8534e35842e3e78b29c9659006a1bd3de99b3c39173dfcf9a9d4e9a9a32f5453991f1df9c5eed9f5124db66cde5b4ee58c9b983e603ce0d8487851452defffb8c2fa4919b2d7b7fd7718f9e61cd7ad0b8e5a8e1da9c63e673372f02d196007fd2782ae525dbffe9a578f8d33d1f6e0df1b95550862fdf3a0ecb693c93011dc5465780091ef490427c606bf3359762ba5279dd514832533bbb36e7a9f735849d60250ee5193288e199f73dcc4708abef88029dbe3fa6145ef2f4cc8f37bd27c5a5ca656c0d33e47e6f77c5baacb008ae8360ed9485f2abbc406418d7f0e450f7623d28dda71815810084cbaae80996b59a1af5e3073b00ecc021946b1eeee42bf27d38f56dcdb5b73c7b81b786995eaeec87482353dc5d278af767184b1c66ce989c690762a8cd962e37b9ff360fc1679e7be360f67e04ae6217dff7a977ffd64d14321cb8cbb83adedf12444b890a12e64dcdda05f69f270d6c8dc09f7141ac73f55f51979cfc48c0538ac8735fbf63e90f8153fecadd0857e874790e12c39655cb9f68601dd3ea631815a0a4ed8010a3981667c807d3930e137b95c47bd7cd323e619ce173bbcd61506b96e504f141c8d96f63e949ca15eb7ce2c7fd673788f4deeb810a909a9098ef12078c4e2724b740eaf106cf59d579eb9ef1eb0f95d6fc03b85c7a6ed9b235ccdfb42a3b85cd2c29994fbc53f45012302d0a4f9965fb1d7abfc613ee8934237e56db731f77f16bb45f14414071d7a0c40ea8cb68fe384cb55b02428788becc61d5e76d479f8cdcd712bb7de90571bcee256b7039b6e859a453e700923937d64754cd2bbbefcc012cfeca44a492a35d361335e48102a9e28725b8561ef87e58d26d1671aad6d0a6ffb5a778eef07705f1b60a3857ace6597ab5e6662e22657bd4895d6215a1cb0977e23758a656fae7168c4990266cd83de2a420902294340713f04117a0873455c59bfc1dc3bcf9bbec2a685b3c532a444a64d95eb395c9fdf8f3fa989ab5245d903b0cfe2a633949ec111ce974ebda6742cfad9d0cc0f70c171589e9323a329f4d06b89d26758c779971f9bdcb60da3afe43346e5942b349f659966e886ea49c6b1e5da71d2f429de03422a8ca101adf00e1ceab21d6787ead2264c28d359b139e13ef4365e1264d2d832f1d39e347324d01c3bbb7025f1b6fe36827c4a2ba572b49586d389c2d81c6af3a21cd2f45818f626e2ad733e6cde57837e2d5f2b0cc4755aff2f93eb4f7654099378b8a285ddad26a40541b461cc1d451f8ee96018920234ea9b4ce7a7f29afd89d3946aab0a46e7ef0af10f3168d931a87fdcb274313023a3d00a48c16919c7ea3961709d70fd2b257bce5cf115d7ec46d2b4c5632291f0ae34640ef286967f95d028e1c07bf3091dc2ddfeb1d279ea1e33db3fdeb82c44407d289bae88a6045c799d49559656def038ccf0ef956a84ddf8210107bb5dab2ba0cc391cc41d0891bf56f5f74fcac6e7fd515a498f89e74374ab45dfb41493155b25eab48175aa267ac304d7670ebe8baaee7e3456059f99c147d2c5f56f7560baca39ea45452289900e3fb4439c7111395a2b6294ef1243263442fea3bd78368bbe3ac894079c884d5836515b4bb625b0f3f4c56ac58920ec60956db295b340425941e5877f45537f73c0524a8ec96724b0069a53b982841bb6646cbcef9b803911cd0306b2c0af11a54867e3ceefd60dabbe1a3a50e0a3e77b75a7e6c3ba96ab201f6ea73b72ff45971b6ca8372ac160be16776010ca0efc37a5522a61f996b78dff6a08e3e7d4faf1323bcbf7dca45c9eed82f68fbd5fffd3646e6ead0d74126926d4bb40db95d691435341613b3de47a1fb852a3ce9ec65dbe204e9249346ce8184535d30c0d6bcbe2e674b7f31bc5041cb77a37dafc72b1267e2e1fd16d18b89ab38cad099396dab6b6947c173cfb880accad1a8ddb60f0071c0c6169c64be08fa201bebd8088b0474839eb6187ab47d9561777c4a09d36a2cf6e75740737b3f2ebea7ee8859f6dfa36d681cb6e75a8477afbafdd7741f344972aadc47d2940ce6c3e3df4b7d01b836c32b7f1abcb7f2ce801f65429c6a04a73d243c58e21ba0f5a188484c8d248910993a1476d963bb46eed613c504',
          TradeSha:
            '0366AF94B921655221A9DE37B713E4883B4793653F7114BEEED2C3A358A8FA6D',
          Version: '2.0'
        }
      }
    },
    GetPayment_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '使用者未登入!'
      }
    },
    GetPayment_NotFound_1: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '訂單不存在或是已經取消'
      }
    },
    GetPayment_NotFound_2: {
      status: 'error',
      error: {
        name: 'NOT FOUND',
        message: '訂單已付款'
      }
    },
    AdminGetOrders_Success: {
      status: 'success',
      data: [
        {
          id: 1,
          userId: 3,
          sn: null,
          amount: 1884,
          name: 'admin1',
          phone: '926.241.2106 x485',
          address: '221 Monroe Street',
          paymentStatus: '未付款',
          shippingStatus: '待出貨',
          createdAt: '2024-02-04T09:02:25.000Z',
          updatedAt: '2024-02-04T09:02:25.000Z'
        }
      ]
    },
    AdminGetOrders_Unauthorized: {
      status: 'error',
      error: {
        name: 'Unauthorized',
        message: '未獲得使用權限!'
      }
    }
  },
  host: 'localhost:3000'
}

const outputFile = './swagger-output.json'
const routes = ['./app.js']

swaggerAutogen(outputFile, routes, doc)
