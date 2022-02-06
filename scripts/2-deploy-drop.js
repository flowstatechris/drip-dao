import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0xeD8542cF77992efDa78C227bEF37B762954B3Dfc");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({

      name: "DripDAO Membership Card",
      
      description: "A DAO merging the worlds of blockchain and fashion.",
    
      image: readFileSync("scripts/assets/project1.gif"),
     
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address,
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata(),
    );
  } catch (error) {
    console.log("🔴 failed to deploy bundleDrop module", error);
  }
})()