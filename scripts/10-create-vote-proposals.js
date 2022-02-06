import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0x92345f68471c2496b219632B31F67668675867E5",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x363c03B22c20697D3286C9087B224b7EB67ca278",
);

(async () => {
  try {
    await tokenModule.delegateTo(process.env.WALLET_ADDRESS)
    const amount = 222_222;
    await voteModule.propose(
      "Should the DAO mint an additional " + amount + " tokens into the treasury?",
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [
              voteModule.address,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );

    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("🔴 failed to create first proposal", error);
    process.exit(1);
  }
})();
