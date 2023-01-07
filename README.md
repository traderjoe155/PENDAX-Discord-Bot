# PENDAX-Discord-Bot
framework for aquiring exchange data through PENDAX and sending to Discord

npm install

create .env file and format as such:
KEY=''
SECRET=''
PASSPHRASE=''
DISCHOOK=''
TIMEDELAY='60000'
INSTID='BTC-USDT-SWAP'
INSTTYPE='SWAP'

this example will poll OKX for open interest and post to a discord webhook. (you will need to paste your webhook address in the env file as DISCHOOK.
adjust time delay as needed (be careful not to get rate limited).
set the instId according to OKX api documentation.
FYI the returned data is in number of contracts.

if you wish to create a new function and source a different set of data you can follow the format provided in index.js and alter as needed.
documentation for using PENDAX can be found at https://docs.compendium.finance/pendax/using-pendax-sdk


<img width="298" alt="Screenshot 2023-01-07 at 1 00 23 PM" src="https://user-images.githubusercontent.com/81376325/211164229-6ad677fc-5f59-40e5-8a74-d4d833b5f5bb.png">
