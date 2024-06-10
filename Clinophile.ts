import dotenv from "dotenv";
import { airdropIfRequired, getExplorerLink, getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
dotenv.config();

const user = getKeypairFromEnvironment("SECRET_KEY");

const connection = new Connection(clusterApiUrl("devnet"));

const airdropSignature = await connection.requestAirdrop(user.publicKey, 5 * LAMPORTS_PER_SOL);
await connection.confirmTransaction(airdropSignature);
const solBalance = await connection.getBalance(user.publicKey);
console.log(`${user.publicKey.toBase58()} Balance: ${solBalance}`);

const tokenMint = await createMint(
    connection,
    user,
    user.publicKey,
    user.publicKey,
    6,
    user
)

const explorer = await getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`✅ Finished! Created token mint: ${explorer}`);