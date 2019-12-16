global.SALT_KEY = 'O>_j<v0J7?L]4wn-ejbsopGj[eb4b@2-?$o9{s=)B[.!vi5-O1ZRe>5c#%Mp/z$';
/* 
 Um HASH qualquer e único, o ideal é ter um para cada ambiente
 e pegar de uma variável de ambiente exportada no Dockerfile.
*/

module.exports = {
    connectionString: process.env.MONGODB_URI,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    containerConnectionString: 'TBD'
}