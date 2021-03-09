import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BlockchainService, IWalletKey } from '../../services/blockchain.service';
import { Transaction } from 'SavjeeCoin/src/blockchain';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {
  public newTx = new Transaction();
  public ownWalletKey: IWalletKey;
  // public wallets: Array<IWalletKey> = [];

  // Sets this.newTx as a Transaction object
  // Sets this.ownWalletKey as the user's first wallet
  constructor(private blockchainService: BlockchainService, private router: Router) {
    this.newTx = new Transaction();
    this.ownWalletKey = blockchainService.wallets[0];
  }

  ngOnInit() {
  }

  // Sets a constant variable newTx as this.newTx
  // Sets the transaction fromAddress equal to the user's publicKey
  // Signs the transaction using the user's wallet keyObj
  // Tries to add transaction to currently pending transactions
  // If it fails, it will alert the error
  // Once successfully submitted, the page forwards to pending transactions
  // Resets this.newTx as a new blank transaction
  createTransaction() {
    const newTx = this.newTx;

    newTx.fromAddress = this.ownWalletKey.publicKey;
    newTx.signTransaction(this.ownWalletKey.keyObj);

    try {
      this.blockchainService.addTransaction(this.newTx);
    } catch (e) {
      alert(e);
      return;
    }

    this.router.navigate(['/new/transaction/pending', { addedTx: true }]);
    this.newTx = new Transaction();
  }
}
