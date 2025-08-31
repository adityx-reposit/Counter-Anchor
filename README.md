Counter Program (Anchor + Solana)

A simple Solana program built with Anchor that demonstrates how to create and manage on-chain state.
This example implements a basic counter which can be:

Initialized with a starting value

Incremented by 1

Decremented by 1

It’s a great starter project for learning how to write, deploy, and test Solana programs using the Anchor framework.

📂 Project Structure
counter/
├── programs/
│   └── counter/              # Rust smart contract
│       └── src/lib.rs
├── tests/                    # Mocha/Chai tests (TypeScript)
│   └── counter.ts
├── Anchor.toml               # Anchor config
└── Cargo.toml                # Rust config

⚙️ Smart Contract (lib.rs)

The program defines a single account Datashape that stores the counter value (u32).
It exposes three instructions:

1. initialize(ctx, init_value: u32)

Creates a new account and sets its initial counter value.

pub fn initialize(ctx: Context<Initialize>, init_value: u32) -> Result<()> {
    ctx.accounts.account.num = init_value;
    Ok(())
}

2. increment(ctx)

Increases the counter by 1.

pub fn increment(ctx: Context<Increment>) -> Result<()> {
    ctx.accounts.account.num += 1;
    Ok(())
}

3. decrement(ctx)

Decreases the counter by 1.

pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
    ctx.accounts.account.num -= 1;
    Ok(())
}

Account Definition
#[account]
pub struct Datashape {
    pub num: u32,
}

🧪 Testing (TypeScript)

The tests use Mocha + Chai with Anchor’s TypeScript client.

Initialize Test → creates a counter with 10

Increment Test → increases to 11

Decrement Test → decreases back to 10

Example snippet:

it("Is initialized!", async () => {
  await program.methods
    .initialize(10)
    .accounts({
      account: newAccount.publicKey,
      signer: provider.wallet.publicKey,
    })
    .signers([newAccount])
    .rpc();

  const account = await program.account.datashape.fetch(newAccount.publicKey);
  assert.equal(account.num, 10);
});

🚀 How to Run Locally
1. Install Dependencies

Make sure you have:

Rust

Solana CLI

Anchor

Node.js

2. Build the Program
anchor build

3. Run Local Validator
anchor localnet

4. Deploy the Program
anchor deploy

5. Run Tests
anchor test

📖 What You’ll Learn

How to create and manage on-chain accounts in Solana

How to write instructions with Anchor

How to test Solana programs using TypeScript and Mocha

How to connect off-chain clients with on-chain logic

🔮 Next Steps

Ideas to extend this program:

Add a reset method to reset counter to 0

Restrict who can increment/decrement (using account seeds or authorities)

Store additional metadata like owner public key or timestamp

📝 License

MIT License – free to use, modify, and distribute.
