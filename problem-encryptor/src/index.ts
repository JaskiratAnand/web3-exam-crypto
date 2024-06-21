import crypto from 'crypto'

type QuestionSchema = {
    PROBLEM_STATEMENT: string,
    OPTION_1: string,
    OPTION_2: string,
    OPTION_3: string,
    OPTION_4: string,
}

const algorithm: string = "aes-256-cbc";
const key: Buffer = crypto.randomBytes(32);
const iv: Buffer = crypto.randomBytes(16);

function encrypt (text: string, key: Buffer, iv: Buffer): string {
    const cipher: crypto.Cipher = crypto.createCipheriv(algorithm, key, iv);

    let encryptedText: string = cipher.update(text, 'utf8', 'hex');
    encryptedText += cipher.final('hex');
    return encryptedText;
}
function encryptQuestion (question: QuestionSchema): QuestionSchema {
    return {
        PROBLEM_STATEMENT: encrypt(question.PROBLEM_STATEMENT, key, iv),
        OPTION_1 : encrypt(question.OPTION_1, key,iv),
        OPTION_2 : encrypt(question.OPTION_2, key,iv),
        OPTION_3 : encrypt(question.OPTION_3, key,iv),
        OPTION_4 : encrypt(question.OPTION_4, key,iv),
    }
}

function decrypt (encryptedText: string, key: Buffer, iv: Buffer): string {
    const decipher: crypto.Cipher = crypto.createDecipheriv(algorithm, key, iv);

    let decryptedText: string = decipher.update(encryptedText, 'hex', 'utf8');
    decryptedText += decipher.final('utf8');
    return decryptedText;
}
function decryptQuestion (encryptedQuestion: QuestionSchema): QuestionSchema {
    return {
        PROBLEM_STATEMENT: decrypt(encryptedQuestion.PROBLEM_STATEMENT, key, iv),
        OPTION_1 : decrypt(encryptedQuestion.OPTION_1, key,iv),
        OPTION_2 : decrypt(encryptedQuestion.OPTION_2, key,iv),
        OPTION_3 : decrypt(encryptedQuestion.OPTION_3, key,iv),
        OPTION_4 : decrypt(encryptedQuestion.OPTION_4, key,iv),
    }
}

const question: QuestionSchema = {
    PROBLEM_STATEMENT: "What is the capital of Germany?",
    OPTION_1: "Munich",
    OPTION_2: "Berlin",
    OPTION_3: "Zurich",
    OPTION_4: "Cologne",
};

const encryptedQuestion = encryptQuestion(question);
console.log(encryptedQuestion);

const decryptedQuestion = decryptQuestion(encryptedQuestion);
console.log(decryptedQuestion);