var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/', secret: 'root' })
function run_cmd(cmd, args, callback) {
	  var spawn = require('child_process').spawn;
	  var child = spawn(cmd, args);
	  var resp = "";
	  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
	  child.stdout.on('end', function() { callback (resp) });
}

http.createServer(function (req, res) {
	 let postParams = ''
	 req.on('data',(parmas)=>{
		 postParams += parmas
	 })
	 req.on('end',()=>{
		 const params = JSON.parse(postParams)
		 console.log(params)
		 const configMap = {
			success: {
				status: 200,
		 		message: 'success'
			 },
			 fail: {
				status: 400,
				message: 'fail'
			 }
		 }
		
		if (params.action === 'completed') {
			res.statusCode = configMap.success.status
			res.end(configMap.success.message)
			run_cmd(
				'sh',
				['./deploy.sh', 'deploy_webhooks'],
				function(text){ console.log(text) })
		} else {
                         res.statusCode = configMap.fail.status
			 res.end(configMap.fail.message)
		}
	 })
}).listen(7777)

handler.on('error', function (err) {
	  console.error('Error:', err.message)
})

handler.on('push', function (event) {
	  console.log('Received a push event for %s to %s',
		      event.payload.repository.name,
		      event.payload.ref);
	    run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})

console.log('js runed')
