import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
  "0x92345f68471c2496b219632B31F67668675867E5",
);

const tokenModule = sdk.getTokenModule(
  "0x363c03B22c20697D3286C9087B224b7EB67ca278",
);

(async () => {
  try {
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "💧 Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "🔴 failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent50 = ownedAmount.div(100).mul(50);

    await tokenModule.transfer(
      voteModule.address,
      percent50
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("🔴 failed to transfer tokens to vote module", err);
  }
})();
