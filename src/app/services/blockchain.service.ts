import { Injectable } from '@angular/core';
import { Blockchain, Transaction } from 'SavjeeCoin/src/blockchain';
import EC from 'elliptic';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  public blockchainInstance = new Blockchain(); // Initializes the blockchain
  public wallets: Array<IWalletKey> = []; // Creates array of empty wallets so user can have multiple wallets
  public testTxns: Array<Transaction> = []; // Creates array of empty transactions to use for test data

  // Sets default difficulty of blocks to 2 for miners in the blockchain
  // Automatically mines the first block and rewards address 'hi' with the mining reward
  // Generates user's wallet which includes a publicKey, privateKey, and keyObj
  constructor() {
    this.blockchainInstance.difficulty = 2;
    this.blockchainInstance.minePendingTransactions('hi');

    let usersNum = 10; // Sets total user count
    for (let w = 0; w < usersNum; w++) { // Generates wallets for each user
      this.generateWalletKeys();
    }
  }

  // Generates random data tto 
  loadTestData() {
    let loadingTestData = false;
    let usersNum = 10; // Sets total user count

    let blockNum = Math.floor(Math.random() * 10) + 1;  // Create a random number of blocks from 1 to 10

    for (let i = 0; i < blockNum; i++) { // Block loop
      let txnNum = Math.floor(Math.random() * 50) + 1;  // Create a random number of txns from 1 to 100
      this.testTxns = new Array<Transaction>();

      for (let j = 0; j < txnNum; j++) { // Transaction loop
        let tx = new Transaction();
        let fromWalletNum = Math.floor(Math.random() * usersNum);
        let toWalletNum = Math.floor(Math.random() * usersNum);

        while (toWalletNum == fromWalletNum) {
          toWalletNum = Math.floor(Math.random() * usersNum);
        }

        this.testTxns[j] = tx;
        this.testTxns[j].fromAddress = this.wallets[fromWalletNum].publicKey;
        this.testTxns[j].toAddress = this.wallets[toWalletNum].publicKey;
        this.testTxns[j].amount = Math.floor(Math.random() * 50) + 1; // Generate a random amount from 1 to 100
        this.testTxns[j].signTransaction(this.wallets[fromWalletNum].keyObj);
        
        try {
          this.addTransaction(this.testTxns[j]);
        } catch (e) {
          alert(e);
        }
      }
      this.minePendingTransactions();
    }

    loadingTestData = true;;
  }

  // Creates a new transaction for the reward that will be given to who successfully mines the block
  // Then adds that transaction to the list of currently pending transactions so the miner is rewarded
  // Then creates a new block and puts all currently pending transactions into that block
  // Then the block is mined until a hash that meets the blockchain difficulty is found
  //    (default blockchain difficulty is 2)
  // Once that hash is found, the block is pushed into the blockchain and the pending transactions clear
  minePendingTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.wallets[Math.floor(Math.random() * 10)].publicKey // Rewards a random user's wallet with the mining reward
    );
  }

  // Checks to see if the address passed in is one of the addresses in the user's wallet
  addressIsFromCurrentUser(address) {
    return address === this.wallets[0].publicKey;
  }

  // Generates a random publicKey, privateKey, and keyObj to be used as the user's wallet
  generateWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.wallets.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    })
  }

  // Generates a random publicKey, privateKey, and keyObj to be used as the user's wallet
  generateOtherWalletKeys() {
    const ec = new EC.ec('secp256k1');
    const key = ec.genKeyPair();

    this.wallets.push({
      keyObj: key,
      publicKey: key.getPublic('hex'),
      privateKey: key.getPrivate('hex'),
    })
  }

  // Returns all currently pending transactions
  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  // Adds a created transactions to the list of currently pending transactions
  addTransaction(tx) {
    this.blockchainInstance.addTransaction(tx);
  }

  // Returns all of the user's wallets
  getUserWallets() {
    return this.wallets;
  }
}

// This is used to create wallet objects
export interface IWalletKey {
  keyObj: any;
  publicKey: string;
  privateKey: string;
}
