var express=require('express');

var app=express();

//模板引擎
var handlebars=require('express3-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

//端口
app.set('port',process.env.PORT||3000);

//static
app.use(express.static(__dirname+'/public'));


//数据
var fortunes=['Conquer your fears or they will conquer ypu.',
	'Rivers need springs.',
	'Do not fear what you don\'t know',
	'you will have a pleasant surprise.'];

//路由
app.get('/',function  (req,res) {
	res.render('home');
});

app.get('/about',function  (req,res) {
	var randomFortune=fortunes[Math.floor(Math.random()*fortunes.length)];

	res.render('about',{fortune:randomFortune});
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