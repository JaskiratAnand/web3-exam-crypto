import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

const keypair: Keypair = Keypair.generate();

const message: string = "Hello World!!";
const messageBytes: Uint8Array = decodeUTF8(message);

const signature: Uint8Array = nacl.sign.detached(messageBytes, keypair.secretKey);
console.log(signature);

const result: boolean = nacl.sign.detached.verify(
    messageBytes,
    signature,
    keypair.publicKey.toBytes()
)
console.log(result);