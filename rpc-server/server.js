const path=require('path')
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');// creating stub
const PROTO_PATH=path.resolve(__dirname,'chat.proto')


const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
  }); 
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, {message: 'Hello ' + call.request.name});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {sayHello: sayHello});
  server.bindAsync('0.0.0.0:8080', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
    console.log("SERVER STARTED AT 8080");
  });
}

main();







