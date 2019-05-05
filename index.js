var http = require('http');
var express = require('express');
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer');

var app  = new express();

var server = http.createServer(app);

const port = process.env.PORT || 8080;

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

//app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(req,res)=>{
	res.send('SERVIDOR Rodando');
})
app.post('/email',(req,res)=>{

	console.log("Dados",req.body);
	
	if(req.body.key  != "5748844fd988sdfsfsad")return res.send({success:false,message:"Chave de acesso incorreta"});

	email		= req.body.email;
	conteudo	= req.body.conteudo;
	assunto 	= req.body.assunto;
	//console.log("Req:",req);

	var configuracao = {
		from:'mobshare@vivaldi.net',
		to:email,
		subject:assunto,
		html:conteudo
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
