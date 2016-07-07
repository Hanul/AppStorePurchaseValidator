ASPV.validate = METHOD({
	
	run : function(params, callback) {
		//REQUIRED: params.productId
		//REQUIRED: params.receipt
		//REQUIRED: callback
		
		var
		// product id
		productId = params.productId,
		
		// receipt
		receipt = params.receipt,
		
		// host
		host = 'buy.itunes.apple.com';
		
		RUN(function(retry) {
			
			POST({
				isSecure : true,
				host : host,
				uri : 'verifyReceipt',
				paramStr : JSON.stringify({
					'receipt-data' : receipt
				})
			}, function(content) {
				
				var
				// data
				data = PARSE_STR(content),
				
				// is valid
				isValid = false;
				
				if (data.status === 0 && data.receipt !== undefined) {
					
					// iOS <= 6
					if (data.receipt.product_id === productId) {
						isValid = true;
					}
					
					// iOS >= 7
					else if (data.receipt.in_app !== undefined) {
						EACH(data.receipt.in_app, function(iapInfo) {
							if (iapInfo.product_id === productId) {
								isValid = true;
								return false;
							}
						});
					}
				}
				
				if (isValid !== true && host !== 'sandbox.itunes.apple.com') {
					host = 'sandbox.itunes.apple.com';
					retry();
				}
				
				else {
					callback(isValid);
				}
			});
		});
	}
});
