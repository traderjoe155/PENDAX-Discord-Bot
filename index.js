import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { createExchange } from "@compendiumfi/pendax/exchanges/exchange.js";

let discHook = process.env.DISCHOOK;
let publicExchange = createExchange({
  exchange: "okx",
  authenticate: false,
  label: "okx",
});
let timeDelay = process.env.TIMEDELAY;

// let privateExchange = createExchange({
//         exchange: "okx",
//         authenticate: true,
//         key: process.env.KEY,
//         secret: process.env.SECRET,
//         passphrase: process.env.PASSPHRASE,
//         label: "okxPriv",
//         marginType: "usdt"
//     });

// get open interest
async function getOpenInterest(exchange, options) {
  try {
    let result = await publicExchange.getOpenInterest(options);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

// get liquidations
async function getLiqOrders(exchange, options) {
  try {
    let result = await publicExchange.getLiqOrders(options);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

//sendDiscordPost//
async function sendDiscordPost(options) {
  try {
    let api = discHook;
    let content = options;
    let params = {
      content: content,
    };

    await axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(params),
      url: api,
    });
  } catch (error) {
    console.log(error.message);
  }
}

//get OI and post to discord

// async function main(i) {
//   let result = await getOpenInterest(publicExchange, {
//     instType: process.env.INSTTYPE,
//     instId: process.env.INSTID,
//   });
//   let openInterest = result.data[0].oi;
//   let oiFormatted = parseFloat(openInterest).toLocaleString();
//   let market = result.data[0].instId;
//   console.log(market);
//   console.log(oiFormatted);
//   let data =
//     "`" +
//     new Date().toLocaleString() +
//     "`" +
//     "\n**Market:** " +
//     market +
//     "\n**OpenInterest:** " +
//     oiFormatted;
//   await sendDiscordPost(data);
//   console.log(data);
//   setTimeout(() => {
//     main(++i);
//   }, timeDelay);
// }

// get liquidations and post to discord

async function main(i) {
  let result = await getLiqOrders(publicExchange, {
    instType: process.env.INSTTYPE,
    state: "filled",
    uly: process.env.ULY,
  });
  let liqs = result.data[0].totalLoss;
  let latestLiqs = result.data[0].details;
  let latestLiqsFormatted = JSON.stringify(latestLiqs, null, 4);
  console.log(liqs);
  let market = result.data[0].instId;
  console.log(market);

  console.log(liqs);
  let data =
    "`" +
    new Date().toLocaleString() +
    "`" +
    "\n**Market:** " +
    market +
    "\n**Liquidations Today:** " +
    liqs +
    "\n**Latest Liquidation Details:** " +
    latestLiqsFormatted;
  await sendDiscordPost(data);
  console.log(data);
  setTimeout(() => {
    main(++i);
  }, timeDelay);
}

main(0);
