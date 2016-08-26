ASPV.validate = METHOD({
	
	run : function(params, callbackOrHandlers) {
		//REQUIRED: params.productId
		//REQUIRED: params.receipt
		//REQUIRED: callbackOrHandlers
		//OPTIONAL: callbackOrHandlers.error
		//OPTIONAL: callbackOrHandlers.success
		
		var
		// product id
		productId = params.productId,
		
		// receipt
		receipt = params.receipt,
			
		// error handler.
		errorHandler,
		
		// callback.
		callback,
		
		// host
		host = 'buy.itunes.apple.com';
		
		if (callbackOrHandlers !== undefined) {
			
			if (CHECK_IS_DATA(callbackOrHandlers) !== true) {
				callback = callbackOrHandlers;
			} else {
				errorHandler = callbackOrHandlers.error;
				callback = callbackOrHandlers.success;
			}
		}
		
		RUN(function(retry) {
			
			var
			// params
			params;
			
			POST(params = {
				isSecure : true,
				host : host,
				uri : 'verifyReceipt',
				paramStr : JSON.stringify({
					'receipt-data' : receipt
				})
			}, {
				error : function(errorMsg) {
					
					if (errorHandler !== undefined) {
						errorHandler();
					} else {
						SHOW_ERROR('[ASPV] Error!', errorMsg, params);
					}
				},
				
				success : function(content) {
					
					var
					// data
					data = PARSE_STR(content),
					
					// is valid
					isValid = false;
					
					if (data === undefined) {
						if (errorHandler !== undefined) {
							errorHandler();
						} else {
							SHOW_ERROR('[ASPV] Error! Data:', content);
						}
					}
					
					else {
						
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
						
						else if (callback !== undefined) {
							callback(isValid);
						}
					}
				}
			});
		});
	}
});
