import sdk from "./1-initialize-sdk.js";


const appModule = sdk.getAppModule("0xeD8542cF77992efDa78C227bEF37B762954B3Dfc",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "DripDAO Proposals",

      votingTokenAddress: "0x363c03B22c20697D3286C9087B224b7EB67ca278",

      proposalStartWaitTimeInSeconds: 0,

      proposalVotingTimeInSeconds: 24 * 60 * 60,

      votingQuorumFraction: 50,

      minimumNumberOfTokensNeededToPropose: "1",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.error("🔴 Failed to deploy vote module", err);
  }
})();