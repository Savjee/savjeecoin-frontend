import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  private privateWallets = []; // Includes publicKey, privateKey, and keyObj
  public publicWallets = []; // Includes publicKey, balance, and transactions
  private transactions = [];
  public publicWallet = { // Creates a publicWallet objects with publicKey, balance, and transactions
    publicKey: '',
    balance: '',
    transactions: []
  }

  constructor(private route: ActivatedRoute, private blockchainService: BlockchainService) { }

  // Sets this.privateWallets to all the users wallets
  // Sets blockchain equal to the current blockchainInstance
  // Loops over the user's privateWallets and creates publicWallets using the information from the privateWallet
  // Once the new publicWallet is created, it is pushed to the array of publicWallets
  ngOnInit() {
    this.route.params.subscribe( (params) => {
      this.privateWallets = this.blockchainService.getUserWallets();

      const blockchain = this.blockchainService.blockchainInstance;
      
      for (let i = 0; i < this.privateWallets.length; i++) {
        let publicWallet = {
          publicKey: this.privateWallets[i].publicKey,
          balance: blockchain.getBalanceOfAddress(this.privateWallets[i].publicKey),
          transactions: blockchain.getAllTransactionsForWallet(this.privateWallets[i].publicKey)
        };

        this.publicWallets.push(publicWallet);
      }
    });
  }
}
