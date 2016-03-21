# AppStorePurchaseValidator
앱스토어 결제 검증 BOX

## 설정
```javascript
require(process.env.UPPERCASE_PATH + '/BOOT.js');

BOOT({
	CONFIG : {
		...
	},

	NODE_CONFIG : {
	
		ASPV : {
			sharedSecretKey : '~~~'
		},
		
		...
	}
});
```

## 사용방법
```javascript
ASPV.validate('{{receipt}}', function(isValid) {
	console.log(isValid);
});
```

## 라이센스
[MIT](LICENSE)

## 작성자
[Young Jae Sim](https://github.com/Hanul)
