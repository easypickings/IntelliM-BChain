# APIv0.7 文档
**API1.0(的文档)会重做，文档会变得很好看，敬请期待**

开发环境：`http://imbc.yukim.ai/api/v0`（平时不在线，需要调试请联系管理员）

### 登录
`POST /login`

##### 必要的请求头
```http
Content-Type: application/json
```

##### 内容示例1
```js
{
	"username": "", //用户名
    "password" : "", //密码
    "usercode" : "{code}" //微信一键登录接口，通过wx.login()获取的code
}
```

可以只填前两项(用户名+密码登录)，可以只填第三项(微信一键登录)，**暂时未区分用户，不管提交什么内容都会登录到同一用户**。

##### 响应示例1
```js
200 OK
{
	"state": "success",
    "token" : "409859962aff30c415b999fd4eac4cbc17556857ab563977fd47809946cf8505"
}
```

Token的保质期为5分钟。每以一有效Token收到一条请求，该Token的保质期会被重置为5分钟。

##### 响应示例2
```js
400 Bad Request
{
	"state" : "failure",
    "reason": "Invalid Username or Password",
    "message": "用户名或密码错误"
}
```

##### 响应示例3
```js
400 Bad Request
{
	"state" : "failure",
    "reason": "Invalid Code",
    "message": "登录信息无效或已过期"
}
```

### 上传病历
`POST /upload`

##### 必要的请求头
```http
Content-Type: application/json
Token: 409859962aff30c415b999fd4eac4cbc17556857ab563977fd47809946cf8505
```
这一段Token是示例，实际应用时请用login方式获取token

##### 内容示例1
```js
{
	"record":
    {
		"hospital" : 
        {
            "name": "内蒙古大骟人人民医院", //医院名
            "id" : "" //留空备用
        },
		"date" : "2020-04-21", // 日期：YYYY-MM-DD
    	"doctor" : 
        {
        	"name": "无人机", // 医生名
            "id": "" //备用
        },
    	"situation" : "1. 半边身子不能动\n2.嘴唇憋的紫黑\n3.心突突的跳", //病情
    	"diagnosis" : "1. 中风偏瘫\n2. 老咳喘\n3. 心肺同时衰竭死亡", //诊断
    	"prescription" : "1. 雄氏老方 每日3次 每次10片\n2. 丹神定喘 每日40次 每次0.3ml\n3. 蒙药心脑方 每日1次 每次1g", // 处方
        "attachments" : ["/attachments/6e53adf1890cb3be.png", "/attachments/deadbeefdeadbeef.png"] //附件
    },
    "signature": "" //医生签名 备用
}
```
##### 内容示例2
```js
{
	"record":
    {
        "hospital" : {}, //内容可以为空
        "date" : "2020-04-22",
        "doctor" : {}, 
        "situation" : "精神病", 
        "diagnosis" : "",
        "prescription" : "",
        "attachments" : [] // 附件也可以为空
    },
    "signature": ""
}
```

##### 响应示例1
```js
201 Created
{
	"state" : "success"
}
```

##### 响应示例2
```js
404 Not Found
{
	"state": "failure",
    "reason": "Invalid attachment path", 
    "message": "附件不存在或已过期" 
}
```

##### 响应示例3
```js
401 Not Authorized
{
	"state" : "failure",
    "reason": "Invalid Token",
    "message": "认证信息无效或已过期"
}
```
### 上传附件
`POST /attachments/{name}`

上传病历前需先上传附件并获取路径，附件保质期为30分钟。`{name}`是url编码的文件名。

##### 必要的请求头
```http
Content-Type: multipart/form-data
Token: 409859962aff30c415b999fd4eac4cbc17556857ab563977fd47809946cf8505
```
Token的解释同上节。

##### 内容
`file=`附件

##### 响应示例1
```js
201 Created
{
	"state" : "success",
    "path" : "/attachments/6e53adf1890cb3be.png"
}
```

##### 响应示例2
```js
401 Not Authorized
{
	"state" : "failure",
    "reason": "Invalid Token",
    "message": "认证信息无效或已过期"
}
```

### 查看附件
`GET /attachments/{name}`

`{name}`是url编码的文件名，该文件名由上传附件或下载病历中的相关响应提供。

##### 必要的请求头
```http
Token: 409859962aff30c415b999fd4eac4cbc17556857ab563977fd47809946cf8505
```
Token的解释同上节。

##### 响应
`200 OK`成功，`404 Not Found`附件不存在或已过期，`401 Not Authorized`认证信息有误。

### 下载病历
`POST /download`

##### 必要的请求头
```http
Content-Type: application/x-www-form-urlencoded
Token: 409859962aff30c415b999fd4eac4cbc17556857ab563977fd47809946cf8505
```
Token的解释同上节。

##### 请求内容
当前为空，默认获取所有病历，未来会添加一些时间限制之类的搜索参数。

##### 响应示例1
```js
200 OK
{
	"state": "success",
    "values":
	[
	    {
	        "record":
	        {
	            "hospital" : 
	        	{
	        	    "name": "内蒙古大骟人人民医院", 
	        	    "id" : "",
	        	},
				"date" : "2020-04-21", 
	    		"doctor" : 
	        	{
	        		"name": "无人机", 
	        	    "id": "",
	        	},
	    		"situation" : "1. 半边身子不能动\n2.嘴唇憋的紫黑\n3.心突突的跳", 
	    		"diagnosis" : "1. 中风偏瘫\n2. 老咳喘\n3. 心肺同时衰竭死亡", 
	    		"prescription" : "1. 雄氏老方 每日3次 每次10片\n2. 丹神定喘 每日40次 每次0.3ml\n3. 蒙药心脑方 每日1次 每次1g", 
	        	"attachments" : ["/attachments/6e53adf1890cb3be.png", "/attachments/deadbeefdeadbeef.png"]
	        },
	        "timestamp": "2020-04-21T17:30:08.000Z", //上链ISO时间戳(UTC时间)，YYYY-MM-DDThh:mm:ss.sssZ
	        "validity": null //无签名验证的记录是null
	    },
	    {
	        "record":
	    	{
	    	    "hospital" : {}, 
	    	    "date" : "2020-04-22",
	    	    "doctor" : {}, 
	    	    "situation" : "精神病", 
	    	    "diagnosis" : "",
	    	    "prescription" : "",
	    	    "attachments" : []
	    	},
	        "timestamp": "2020-04-22T22:22:22.222Z", 
	        "validity": null
	    },
	],
    "base":
    {
    	//用户基础信息，有啥还没想好，先空着
    }
}
```

##### 响应示例2
```js
401 Not Authorized
{
	"state" : "failure",
    "reason": "Invalid Token",
    "message": "认证信息无效或已过期"
}
```