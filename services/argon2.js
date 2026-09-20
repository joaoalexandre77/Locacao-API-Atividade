import argon2 from "argon2";

const argon2IdConfig = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1
}

export async function createHash(password) {
    try {
        const hash = await argon2.hash(password, argon2IdConfig);
        return hash
    } catch (error) {
        console.log(`Ocorreu um erro ao gerar o hash de senha: ${error}`);
        throw new Error("HASH_GENERATION_FAILED");
    }
}