ASPV.validate=METHOD({run:function(i,r){var e,t,o=i.productId,c=i.receipt,p="buy.itunes.apple.com";void 0!==r&&(CHECK_IS_DATA(r)!==!0?t=r:(e=r.error,t=r.success)),RUN(function(i){var r;POST(r={isSecure:!0,host:p,uri:"verifyReceipt",paramStr:JSON.stringify({"receipt-data":c})},{error:function(i){void 0!==e?e():SHOW_ERROR("[ASPV] Error!",i,r)},success:function(r){var c=PARSE_STR(r),n=!1;void 0===c?void 0!==e?e():SHOW_ERROR("[ASPV] Error! Data:",r):(0===c.status&&void 0!==c.receipt&&(c.receipt.product_id===o?n=!0:void 0!==c.receipt.in_app&&EACH(c.receipt.in_app,function(i){if(i.product_id===o)return n=!0,!1})),n!==!0&&"sandbox.itunes.apple.com"!==p?(p="sandbox.itunes.apple.com",i()):void 0!==t&&t(n))}})})}});