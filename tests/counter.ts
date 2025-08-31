import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { assert } from "chai";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
   const newAccount=anchor.web3.Keypair.generate();
  const program = anchor.workspace.counter as Program<Counter>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
    .initialize(10)
    .accounts({
      account: newAccount.publicKey,
      signer: anchor.getProvider().wallet.publicKey,
  
    })
    .signers([newAccount])
    .rpc();
    console.log("Your transaction signature", tx);
     const account = await program.account.datashape.fetch(newAccount.publicKey);
    assert(account.num==10)
  });
   it("Increment!", async () => {
      const tx = await program.methods
      .increment().accounts({
        account:newAccount.publicKey,
        signer:anchor.getProvider().wallet.publicKey
      })
      .rpc()
      let account=await program.account.datashape.fetch(newAccount.publicKey);
      assert.equal(account.num,11)
  
  })
   it("Decrement!", async () => {
      const tx = await program.methods
      .decrement().accounts({
        account:newAccount.publicKey,
        signer:anchor.getProvider().wallet.publicKey
      })
      .rpc()
      let account=await program.account.datashape.fetch(newAccount.publicKey);
      assert.equal(account.num,10)
  
  })

});
