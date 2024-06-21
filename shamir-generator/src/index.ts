// @ts-ignore
import sss from 'shamirs-secret-sharing'

const secret: Buffer = Buffer.from('Encryption key');
const shares: Buffer[] = sss.split(secret, {
    shares: 5,
    threshold: 3
});

console.log("Shamirs Secrets:");
console.log(shares.map(x => x.toString('hex')));

const smallerShares: Buffer[] = shares.slice(0, 3);
console.log("Using 3 secrets to recover data:");
console.log(smallerShares.map(x => x.toString('hex')));

const recovered: Buffer = sss.combine(smallerShares);
const recoveredText: string = recovered.toString();
console.log("Recovered Text: " + recoveredText);