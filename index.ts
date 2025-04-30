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
  
    const PRIVATE_KEY = new Ed25519PrivateKey("0xb0d86244e47c6183b419cbf30d5844ed2bc0645a74cbc8b5d00377e2f381fde5");
    const MY_ACCOUNT = Account.fromPrivateKey({ privateKey: PRIVATE_KEY });
  
    const myBalance = await aptos.getAccountAPTAmount({
      accountAddress: MY_ACCOUNT.accountAddress,
    });
    console.log("Current APT balance:", myBalance);
  
    const transaction = await aptos.transaction.build.simple({
      sender: MY_ACCOUNT.accountAddress,
      data: {
        function: "0x777b93e13ff2a1bc872eb4d099ae15a52fb70f2f01dd18d7c809e217fb0e543e::tba_exam::add_participant",
        functionArguments: [
          "0xb0d86244e47c6183b419cbf30d5844ed2bc0645a74cbc8b5d00377e2f381fde5",
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
  