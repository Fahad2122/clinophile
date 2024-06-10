import { Keypair } from "@solana/web3.js";

const keyPair = Keypair.generate();

console.log('new keyPair public address: ', keyPair.publicKey.toBase58());
console.log('new keyPair secret key: ', keyPair.secretKey);