# BasicApiServer
to start this server, 

npm i 
node app.js


Once the server is running on, please visit localhost:3000/v1/api  to submit the csv file,
then you will get a json object including the unique_id and the url to download the csv file uploaded.

then visit localhost:3000/v1/api/{unique_id} to get the processing result 

The results are listed below. 


{"unique_id":"1605542098481","unique_sauce":"localhost:3000/upload/1605542098481.csv"}

for the Data, can be obtained by response.body.averagePageviewsPerDayPerType, response.body.rationOfUserSessions,response.body.maxmiumSessionsPerWeek



{"averagePageviewsPerDayPerType":{"20201001":{"organic":327,"direct":84,"referral":75,"email":3},
"20201002":{"organic":289,"direct":76,"referral":49,"email":10,"social":1},"20201003":{"organic":185,"direct":68,"referral":39},
"20201004":{"organic":164,"direct":40,"referral":26},"20201005":{"organic":294,"direct":69,"referral":24,"social":3,"email":3},
"20201006":{"organic":393,"direct":65,"referral":48,"email":3,"social":1,"sponsored":1},"20201007":{"organic":411,"direct":141,"referral":46,"email":10,"sponsored":5},
"20201008":{"organic":422,"direct":97,"referral":66,"paid":8,"email":1,"social":1},"20201009":{"organic":343,"direct":126,"referral":87,"paid":24,"email":2},
"20201010":{"organic":156,"direct":57,"referral":34,"social":8,"email":1,"paid":1},"20201011":{"organic":149,"direct":99,"referral":39,"social":1},
"20201012":{"organic":337,"direct":92,"referral":136,"email":15,"social":15,"paid":2},"20201013":{"organic":337,"direct":127,"referral":58,"email":9,"display-retargeting":1,"paid":7,"social":9},"20201014":{"organic":413,"direct":184,"referral":112,"email":1,"social":1},"20201015":{"organic":369,"direct":160,"referral":37,"email":8,"paid":8,"social":3,"display-retargeting":1},"20201016":{"organic":337,"direct":74,"referral":68,"paid":71,"email":3,"social":1},
"20201017":{"organic":177,"direct":60,"referral":20,"paid":51,"email":1},"20201018":{"organic":201,"direct":80,"referral":38,"paid":31},"20201019":{"organic":402,"direct":176,"referral":55,"paid":85,"email":3,"social":1},
"20201020":{"organic":465,"direct":63,"referral":52,"paid":52,"social":8,"email":1},"20201021":{"organic":387,"direct":82,"referral":34,"paid":52,"social":4,"email":2},"20201022":{"organic":488,"direct":152,"referral":68,"paid":47,"email":4,"social":1},"20201023":{"organic":397,"direct":112,"referral":68,"paid":51,"email":3,"AdVendorPage":1},"20201024":{"organic":253,"direct":88,"referral":23,"paid":43,"email":4,"social":1},"20201025":{"organic":225,"direct":116,"paid":86,"referral":47,"email":4},
"20201026":{"organic":359,"direct":184,"referral":36,"paid":26},"20201027":{"organic":447,"direct":140,"referral":48,"paid":22,"email":17,"social":10},"20201028":{"organic":522,"direct":115,"referral":39,"paid":35,"email":1},
"20201029":{"organic":606,"direct":144,"referral":33,"paid":27,"email":3,"social":1},"20201030":{"organic":443,"direct":87,"referral":78,"paid":19},"20201031":{"organic":226,"direct":73,"referral":33,"paid":4,"email":1,"social":1}},
"rationOfUserSessions":{"20201001":0.9224137931034483,"20201002":0.9172185430463576,"20201003":0.9388646288209607,"20201004":0.9627659574468085,"20201005":0.9472049689440993,"20201006":0.9407216494845361,"20201007":0.9130434782608695,"20201008":0.9287531806615776,
"20201009":0.8979057591623036,"20201010":0.9476439790575916,"20201011":0.9476744186046512,"20201012":0.9382022471910112,"20201013":0.9456521739130435,"20201014":0.9211195928753181,"20201015":0.9361179361179361,"20201016":0.917312661498708,"20201017":0.9539170506912442,
"20201018":0.9642857142857143,"20201019":0.9549763033175356,"20201020":0.9217002237136466,"20201021":0.9373493975903614,"20201022":0.9028925619834711,"20201023":0.9164677804295943,"20201024":0.9450980392156862,"20201025":0.9580152671755725,"20201026":0.9557291666666666,"20201027":0.9491150442477876,
"20201028":0.9282700421940928,"20201029":0.8943089430894309,"20201030":0.921760391198044,"20201031":0.9688715953307393},
"maxmiumSessionsPerWeek":{"20201004-20201010":{"organic":307,"direct":74,"referral":39,"social":3,"email":4,"sponsored":3,"paid":8},"20201011-20201017":{"organic":277,"direct":85,"referral":44,"social":3,"email":8,"paid":23,"display-retargeting":1},"20201018-20201024":{"organic":349,"direct":77,"referral":41,"paid":29,"email":3,"social":4,"AdVendorPage":1},"20201025-20201031":{"organic":372,"direct":91,"paid":30,"referral":33,"email":4,"social":4}}}
