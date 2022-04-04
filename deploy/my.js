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
	          handler(req, res, function (err) {
			                        console.log(err)
			                        res.statusCode = 500
			                        res.end({err: err})
			                      })
}).listen(8889)

handler.on('error', function (err) {
	          console.error('Error:', err.message)
})

handler.on('push', function (event) {
	          console.log('Received a push event for %s to %s',
			                        event.payload.repository.name,
			                        event.payload.ref);
	            run_cmd('sh', ['./deploy.sh',event.payload.repository.name], function(text){ console.log(text) });
})
