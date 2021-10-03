import { EVM_REVERT, tokens } from './helpers';

const Token = artifacts.require("Token");

require('chai')
    .use(require('chai-as-promised'))
    .should();
  
contract("Token", function ([deployer, receiver]) {
    
    const name = "Master Token",
        symbol = "MT",
        decimals = "18",
        totalSupply = tokens(10000).toString();

    let token;

    beforeEach(async () => {
        token = await Token.new();
    });
    
    describe('deployment', () => {

        it("token name should be", async () => {
            const result = await token.name();
            result.should.equal(name);
        });
    
        it("token symbol should be", async () => {
            const result = await token.symbol();
            result.should.equal(symbol);
        });
    
        it("token decimals should be", async () => {
            const result = await token.decimals();
            result.toString().should.equal(decimals);
        });

        it("token total supply should be", async () => {
            const result = await token.totalSupply();
            result.toString().should.equal(totalSupply);
        });

        it("assigns the total supply to the deployer", async() => {
            const result = await token.balanceOf(deployer);
            result.toString().should.equal(totalSupply);
        });
    });

    describe('sending tokens', () => {

        let amount;
        let result;
        
        describe('Token success', async() => {
            beforeEach(async () => {
                amount = tokens(100);
                result = await token.transfer(receiver, amount, { from: deployer });
            })
    
            it('transfer token balance', async () => {
                let balanceOf;
    
                //After transfer balance
                balanceOf =  await token.balanceOf(deployer);
                balanceOf.toString().should.equal(tokens(9900).toString());
    
                balanceOf =  await token.balanceOf(receiver);
                balanceOf.toString().should.equal(amount.toString());
            });
    
            it('emits a transfer event', async () => {
    
                const log = result.logs[0];
                const args = log.args;
    
                log.event.should.equal('Transfer');
                args.from.toString().should.equal(deployer, ' from is correct');
                args.to.toString().should.equal(receiver, ' to is correct');
                args.value.toString().should.equal(amount.toString(), ' value is correct');
            });
        });

        describe('Token failure', async() => {

            it('Rejects insufficient balance', async() => {
                let invalidAmount;

                invalidAmount = tokens(1000000);
                await token.transfer(receiver, invalidAmount, {from: deployer}).should.be.rejectedWith(EVM_REVERT);
            });

            it('Owner has no balance', async() => {
                let invalidAmount;

                invalidAmount = tokens(10);
                await token.transfer(deployer, invalidAmount, {from: receiver}).should.be.rejectedWith(EVM_REVERT);
            });

            it('Rejects invalid receiver', async() => {
                await token.transfer(0x0, amount, { from: deployer }).should.be.rejectedWith(EVM_REVERT);
            });
        });
        
    });
});
