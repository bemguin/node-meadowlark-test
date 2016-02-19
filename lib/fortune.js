
var fortuneCookies=['Conquer your fears or they will conquer ypu.',
	'Rivers need springs.',
	'Do not fear what you don\'t know',
	'you will have a pleasant surprise.'];

	exports.getFortune=function  () {
		var index=Math.floor(Math.random()*fortuneCookies.length);
		return fortuneCookies[index];
	}