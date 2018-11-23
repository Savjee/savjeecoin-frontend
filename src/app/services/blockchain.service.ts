import { Injectable } from '@angular/core';
import { Blockchain, Block, Transaction } from 'SavjeeCoin/src/Blockchain';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService{
	public blockchainInstance = new Blockchain();

  constructor() {
  	console.log(this.blockchainInstance);
  	this.blockchainInstance.difficulty = 1;
  	this.blockchainInstance.minePendingTransactions('hi');
  	this.blockchainInstance.minePendingTransactions('hi');
  	this.blockchainInstance.minePendingTransactions('hi');
  	this.blockchainInstance.minePendingTransactions('hi');
  }
}
