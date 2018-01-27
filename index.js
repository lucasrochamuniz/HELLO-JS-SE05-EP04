
const metodo = process.argv[2];
const dados = process.argv[3];
let arr = [];

const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: './contatos.db'
    }
})

const godb = _ => {
    knexf = knex('contatos');
    if (process.argv[3]){
        arr = dados.split(',');
    }
    if (process.argv[2] == 'select'){
        knexf.select().then(ret =>{
            console.log(ret);
            process.exit(0);
        })
    } else if (process.argv[2] == 'insert') {
        let nome = arr[0];
        let telefone = arr[1];
        let dia = new Date().toLocaleTimeString()
        let d = {nome, telefone, dia}
        knexf.insert(d).then(ret => {
            console.log(ret);
            process.exit(0);
        })
    } else if (process.argv[2] == 'update') {
        let id = arr[0];
        let nome = arr[1];
        let telefone = arr[2];
        let dia = new Date().toLocaleTimeString();
        let d = {nome, telefone, dia}
        knexf.update(d).where({id}).then(ret => {
            console.log('UPDATE ' + ret);
            process.exit(0);
        })
    } else if (process.argv[2] == 'delete') {
        let id = arr[0];
        knexf.del().where({id}).then(ret => {
            console.log('DELETE ' + ret)
            process.exit(0);
        })
    } else {
        console.log('Acao nao identificada')
    }

}

godb();

