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
    AdminGetProducts_Success: {
      status: 'success',
      data: [
        {
          id: 3,
          name: '可樂',
          image: 'https://i.imgur.com/IILT3WL.jpg',
          description: '可樂超好喝!!!',
          stockQuantity: 200,
          costPrice: 15,
          sellPrice: 40,
          productStatus: '1',
          categoryId: 1,
          createdAt: '2024-01-22T06:17:31.000Z',
          updatedAt: '2024-01-22T10:44:15.000Z'
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
        id: 3,
        name: '可樂',
        image: 'https://i.imgur.com/IILT3WL.jpg',
        description: '可樂超好喝!!!',
        stockQuantity: 200,
        costPrice: 15,
        sellPrice: 40,
        productStatus: '1',
        categoryId: 1,
        createdAt: '2024-01-22T06:17:31.000Z',
        updatedAt: '2024-01-22T10:44:15.000Z'
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
        name: 'Unauthorized',
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
    }
  },
  host: 'localhost:3000'
}

const outputFile = './swagger-output.json'
const routes = ['./app.js']

swaggerAutogen(outputFile, routes, doc)
