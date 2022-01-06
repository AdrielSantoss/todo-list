export interface Task {
    id: number;
    Titulo: string;
    Descricao: string;
    CriadoEm?: any;
    Prazo?: any;
}

function Tasks(this: any, app) {
    this._db = app.db('tarefas');
}

Tasks.prototype.Insert = function (task: any, res) {
    return this._db
        .insert(task)
        .then((id: number) => res.status(200).send(id as Number))
        .catch((err: string) => res.status(500).send('Erro inesperado:' + err));
};

Tasks.prototype.Update = function (task: any, res) {
    return this._db
        .where('id', '=', task.id)
        .update({
            titulo: task.titulo,
            descricao: task.descricao
        })
        .then(() => res.status(200).send('Tarefa editada com sucesso!'))
        .catch((err) => res.status(500).send('Erro inesperado:' + err));
};

Tasks.prototype.Select = function (res) {
    return this._db
        .select()
        .then((tasks?: Task[]) => res.status(200).send(tasks))
        .catch((err: string) => res.status(500).send('Erro inesperado: ' + err));
};

Tasks.prototype.Delete = function (id: number, res) {
    return this._db
        .where('id', '=', id)
        .del()
        .then(() => res.status(200).send())
        .catch((err: string) => res.status(500).send('Erro inesperado: ' + err));
};

Tasks.prototype.Notification = async function (res) {
    return await this._db
        .where('prazo', '<>', '')
        .select()
        .orderBy('prazo', 'asc')
        .limit(1)
        .then((task?: Task[]) => task)
        .catch((err: string) => res.status(500).send('Erro inesperado: ' + err));
};

module.exports = function () {
    return Tasks;
};
