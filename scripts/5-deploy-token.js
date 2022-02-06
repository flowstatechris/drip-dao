import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0xeD8542cF77992efDa78C227bEF37B762954B3Dfc");

(async () => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "DripDAO Governance Token",
            symbol: "DRIP",
        });
        console.log("✅ Successfully deployed token module, address:", tokenModule.address,
        );
    }   catch (error) {
        console.error("🔴 failed to deploy token module", error);
    }
})();