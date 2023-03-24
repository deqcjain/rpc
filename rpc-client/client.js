const path=require('path')
const grpc=require('@grpc/grpc-js')
const protoLoader=require('@grpc/proto-loader')
const parseArgs=require('minimist')

const PROTO_PATH=path.resolve(__dirname,'chat.proto')
console.log(PROTO_PATH);

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });

  const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

  function main() {
    var argv = parseArgs(process.argv.slice(2), {
      string: 'target'
    });
    var target;
    if (argv.target) {
      target = argv.target;
    } else {
      target = 'localhost:8080';
    }
    const client = new hello_proto.Greeter(target,grpc.credentials.createInsecure());
    let user;
    if (argv._.length > 0) {
      user = argv._[0]; 
    } else {
      user = 'world';
    }
    client.sayHello({name: user}, function(err, res) {
      console.log('Greeting:', res.message);
    });
  }
  
  main();