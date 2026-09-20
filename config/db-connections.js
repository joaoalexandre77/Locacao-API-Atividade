import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const dbUser = "joaoarmax17_db_user";
const dbPassword = "1uERVSNORmWnmHDZ";

const connect = () => {
    mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@cluster0.howanjk.mongodb.net/locacao_Games`
    );
    const connection = mongoose.connection;
    connection.on("error",() => {
        console.log("Erro ao conectar com o mongoDb")
    });
    connection.on("open", () => {
        console.log("Conectado ao mongo com sucesso!")
    });

}
connect();

export default mongoose;