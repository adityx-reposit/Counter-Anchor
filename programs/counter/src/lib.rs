use anchor_lang::prelude::*;

declare_id!("9tLSiU8WcTmPdLZ2bvgc4zmJLJf63Qm3nGBRYb9jnxP3");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>,init_value:u32) -> Result<()> {
        ctx.accounts.account.num=init_value;
        Ok(())
    }

    pub fn increment(ctx:Context<Increment>)->Result<()>{
        ctx.accounts.account.num+=1;
       Ok(())
    }

    pub fn decrement(ctx:Context<Decrement>)->Result<()>{

           ctx.accounts.account.num-=1;
        Ok(())
    }
}
#[account]
pub struct Datashape{
  pub num:u32
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = signer, space = 8 + 4)]
    pub account: Account<'info, Datashape>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}



#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub account: Account<'info, Datashape>,
    #[account(mut)]
    pub signer: Signer<'info>,
    
}
#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub account: Account<'info, Datashape>,
    #[account(mut)]
    pub signer: Signer<'info>,
    
}




