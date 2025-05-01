import {
  Aptos,
  AptosConfig,
  Network,
  Account,
  Ed25519PrivateKey,
} from "@aptos-labs/ts-sdk";

async function main() {
  const config = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(config);

  const PRIVATE_KEY = new Ed25519PrivateKey("0xfb09a01c77ec31f8405cf27aa6fbd5a5bed47bc59397115a478fd58060b1f5c2");
  const MY_ACCOUNT = Account.fromPrivateKey({ privateKey: PRIVATE_KEY });

  const myBalance = await aptos.getAccountAPTAmount({
    accountAddress: MY_ACCOUNT.accountAddress,
  });
  console.log("Current APT balance:", myBalance);
  //your on-chain deployed address
  const codiv_addr = "3df278473d9783a7cb986e8bff9bd7d9f9f3e6d5692768c5e2d52798e814cba7";

  const transaction = await aptos.transaction.build.simple({
    sender: MY_ACCOUNT.accountAddress,
    data: {
      function: '${codiv_addr}::Atest::register',
      functionArguments: [
        "Caleb Manatad Jr",
        "https://github.com/codivv",
        "codiv.space@gmail.com",
        "Laxh#5759"
      ],
    },
  });

  const senderAuthenticator = aptos.transaction.sign({
    signer: MY_ACCOUNT,
    transaction,
  });

  const pendingTransaction = await aptos.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  const txnResult = await aptos.waitForTransaction({
    transactionHash: pendingTransaction.hash,
  });

  console.log(
    `Transaction completed with status: ${
      txnResult.success ? "SUCCESS" : "FAILURE"
    }`
  );
}

main().catch(console.error);