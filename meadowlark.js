var fortune=require('./lib/fortune.js');

var express=require('express');

var app=express();

//模板引擎
var handlebars=require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//端口
app.set('port',process.env.PORT||3000);

//设置静态内容响应
app.use(express.static(__dirname+'/public'));

//是否开启测试
app.use(function  (req,res,next) {
	res.locals.showTests=app.get('env')!=='production'&&req.query.test==='1';
	next();
});

//路由
app.get('/',function  (req,res) {
	res.render('home',{
		currency:{
			name:'United States dollars',
			abbrev:'USD'
		},
		tours:[
			{name:'Hood River',price:'$99.95'},
			{name:'Oregon Coast',price:'$159.95'},
		],
		specialsUrl:'/january-specials',
		currencies:['USD','GBP','BTC']
	});
});

app.get('/about',function  (req,res) {
	res.render('about',{
		fortune:fortune.getFortune(),
		pageTestScript:'/qa/tests-about.js'
	});
});



//定制404页面
app.use(function  (req,res) {
	res.status(404);
	res.render('404');
});

//定制500页面
app.use(function  (err,req,res,next) {
	console.error(err.stack);	
	res.status(500);
	res.render('500');
});
//启动监听
app.listen(app.get('port'),function  () {
	console.log('Express started on http://localhost:'+app.get('port')+'; press Ctrl-C terminate.');
});