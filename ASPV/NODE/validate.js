ASPV.validate = METHOD(function(m) {
	
	var
	// api verifier
	apiVerifier = require('iap_verifier'),
	
	// client
	client;
	
	return {
		
		run : function(receipt, callback) {
			//REQUIRED: receipt
			//REQUIRED: callback
			
			if (client === undefined) {
				client = new apiVerifier(NODE_CONFIG.ASPV.sharedSecretKey);
			}
			
			client.verifyReceipt(receipt, true, callback);
		}
	};
});
