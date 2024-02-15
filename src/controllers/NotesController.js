const knex = require("../database//knex");

class NotesController{
    async create(request,response){ // metodo que cria um determinada nota e insere no banco

        const {title,description,tags,links} = request.body;
        const user_id = request.user.id;

        const [note_id] = await knex("notes").insert({
            title,
            description,
            user_id
        }); // usando a funcao insert do knex para inserir dados na tabela notas

        const linksInsert = links.map(link => {
            return{
                note_id,
                url: link // mudando o nome do link para url que é o nome que esta na tabela
            } // como é uma lista de links, usamos a funcao map para percorrer link a link retornando o id da note e o link

        });

        await knex("links").insert(linksInsert); // inserindo o objeto criado na tabela links

        const tagsInsert = tags.map(name => {
            return{
                note_id,
                name,
                user_id
            } // fazendo o mesmo processo que fizemos em link

        });

        await knex("tags").insert(tagsInsert);

        return response.json();

    }

    async show(request,response){ //show é o metodo que faz as consultas sql
        const { id } = request.params;

        const note = await knex("notes").where({ id }).first(); // fazendo o select de notas com where
        const tags = await knex("tags").where({note_id:id}).orderBy("name");
        const links = await knex("links").where({note_id:id}).orderBy("created_at");


        return response.json({
            ...note, // despejando tudo que tem em note
            tags,
            links
        });
    }

    async delete(request,response){
        const {id} = request.params;
        
        await knex("notes").where({id}).delete();

        return response.json();
    }

    async index(request,response){
        const { title,tags } = request.query;

        const user_id = request.user.id;

        let notes;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex("tags").
            select([
                "notes.id",
                "notes.title",
                "notes.user_id",
                "tags.name"
            ])
            .where("notes.user_id",user_id)
            .whereLike("notes.title",`%${title}%`)
            .whereIn("name",filterTags)
            .innerJoin("notes","notes.id","tags.note_id")
            .orderBy("notes.title") // fazendo uma consulta com inner join
        }else{
            notes = await knex("notes").where({user_id}).whereLike("title",`%${title}%`).orderBy("title");
        }

        // fazendo uma logica para que se exista nos parametros um filtro por tags, ele executa a primeira query
        // caso nao exista filtro por tag ele executa a segunda consulta do else que lista as notas

        const userTags = await knex("tags").where({user_id}); // capturando todas as tags
      
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id); //  filtrando as notas que tem tags e criando um array

            return{
                ...note, // despejando todos os dados de notas
                tags:noteTags // incluindo as tags vinculadas as notas
            }
        });
        

        return response.json(notesWithTags);
    }
}

module.exports = NotesController;