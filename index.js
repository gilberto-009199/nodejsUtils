var http = require('http');
var express = require('express');
var nodemailer = require('nodemailer');

var app  = new express();

var server = http.createServer(app);

const port = 8080;

server.listen(port,function(){
 console.log("Server rodando");
})
/* Config do email */
var pacote = nodemailer.createTransport({
  host:'smtp.vivaldi.net',
  port:587,
  secure:false,
  auth:{
	user:'mobshare@vivaldi.net',
	pass:'Mobshare123@'
  },
  tls:{rejectUnauthorized:false}
})

app.get('/',(req,res)=>{
	res.send('SERVIDOR Rodando');
})
app.get('/email',(req,res)=>{
	
	var configuracao = {
		from:'mobshare@vivaldi.net',
		to:'gilberto.tec@vivaldi.net',
		subject:'Teste!!!',
		text:'Hellow !!!'
	}

	return sendEmail(configuracao).then(resultado=>{
	 	return res.send({success:true,message:'Email enviado com sucesso'});
	}).catch(erro=>{
		return res.send({success:false,message:'Fanha ao enviar o email!'+erro});
	})

})

function sendEmail(opcoes){
	return new Promise((resolve,reject)=>{
		pacote.sendMail(opcoes,function(error,info){
			if (error) {
	    			console.log(error);
				reject(error);
	  		} else {
	   			 console.log('Email enviado: ' + info.response);
				resolve(info.response);
	  		}
		})	
	})
}
