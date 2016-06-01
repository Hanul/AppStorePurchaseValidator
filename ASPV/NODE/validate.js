ASPV.validate = METHOD(function(m) {
	
	var
	// api verifier
	apiVerifier = require('iap_verifier'),
	
	// client
	client;
	
	return {
		
		run : function(params, callback) {
			//REQUIRED: params.productId
			//REQUIRED: params.receipt
			//REQUIRED: callback
			
			var
			// product id
			productId = params.productId,
			
			// receipt
			receipt = params.receipt;
			
			if (client === undefined) {
				client = new apiVerifier(NODE_CONFIG.ASPV.sharedSecretKey);
			}
			
			client.verifyReceipt(receipt, true, function(isValid, notUsing, data) {
				
				var
				// return
				ret = false;
				
				if (isValid === true && data.receipt !== undefined) {
					
					// iOS <= 6
					if (data.receipt.product_id === productId) {
						ret = true;
					}
					
					// iOS >= 7
					else if (data.receipt.in_app !== undefined) {
						EACH(data.receipt.in_app, function(iapInfo) {
							if (iapInfo.product_id === productId) {
								ret = true;
								return false;
							}
						});
					}
				}
				
				callback(ret);
			});
		}
	};
});
