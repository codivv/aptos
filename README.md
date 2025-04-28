## TBA APTOS MOVE EXAM

### 1. Clone the Repository

```bash
git clone https://github.com/theblokc/aptos_exam.git
cd your-repo

```

### 2. Install depencies

```bash
pnpm i
pnpm install @aptos-labs/ts-sdk

```

### 2. Create file

```bash
touch index .ts

```

```typescript
async function main() {}

main().catch(console.error);
```

### 3. Create aptos instance and set it to testnet

```typescript
const config = new AptosConfig({ network: Network.MAINNET });
const aptos = new Aptos(config);
```

### 4. Wallet Account

```typescript
const PRIVATE_KEY = new Ed25519PrivateKey("<insert-private-key>");

const MY_ACCOUNT = Account.fromPrivateKey({
  privateKey: PRIVATE_KEY,
});
```

```
You can get your private key, by going to your Petra wallet
```

### 5. Check balance (Make sure you have some APT)

```typescript
const myBalance = await aptos.getAccountAPTAmount({
  accountAddress: MY_ACCOUNT.accountAddress,
});
```

```
Kindly get some here `https://aptos.dev/en/network/faucet`
```

### 6. Build the transaction

```typescript
const transaction = await aptos.transaction.build.simple({
  sender: MY_ACCOUNT.accountAddress,
  data: {
    function:
      "0x777b93e13ff2a1bc872eb4d099ae15a52fb70f2f01dd18d7c809e217fb0e543e::tba_exam::add_participant",
    functionArguments: [
      "0x539f880b3da2bc33d98b5efbf611eb76b6a980b0fdb15badb537767e0767d6e3",
      "<full_name>",
      "<github>",
      "<email>",
      "<discord>",
    ],
  },
});
```

```
Fill the functionArugments as required
```

### 7. Sign the transaction

```typescript
const senderAuthenticator = aptos.transaction.sign({
  signer: MY_ACCOUNT,
  transaction,
});
```

### 8. Send the transaction to APTOS BLOCKCHAINNNN

```typescript
const pendingTransaction = await aptos.transaction.submit.simple({
  transaction,
  senderAuthenticator,
});
```

### 9. Wait for the transaction to propagate

```typescript
const txnResult = await aptos.waitForTransaction({
  transactionHash: pendingTransaction.hash,
});

// optional: so we can see if it succeeded

console.log(
  `Transaction completed with status: ${
    txnResult.success ? "SUCCESS" : "FAILURE"
  }`
);
```

### 9. Run the script

```bash
pnpm ts-node index.ts
```
