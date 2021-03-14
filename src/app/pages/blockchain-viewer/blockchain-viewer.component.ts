import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-blockchain-viewer',
  templateUrl: './blockchain-viewer.component.html',
  styleUrls: ['./blockchain-viewer.component.scss']
})
export class BlockchainViewerComponent implements OnInit {
  public blocks = [];
  private blockchain;
  public selectedBlock = null;

  constructor(private blockchainService: BlockchainService) {
    this.blocks = blockchainService.blockchainInstance.chain;
    this.blockchain = blockchainService.blockchainInstance;
    this.selectedBlock = this.blocks[0];
    console.log(this.blocks);
  }

  ngOnInit() {
  }

  loadTestData() {
    this.blockchainService.loadTestData();
  }

  // Logs the block passed in
  // Sets the selected block to the block passed in
  showTransactions(block) {
    console.log(block);
    this.selectedBlock = block;
    return false;
  }

  // Returns if the block passed in has any transactions
  blockHasTx(block) {
    return block.transactions.length > 0;
  }

  // Tells us if the blocked passed in is the selected block
  isSelectedBlock(block) {
    return this.selectedBlock === block;
  }

  // Returns the (index + 1) of the block in the blockchain array
  getBlockNumber(block) {
    return this.blocks.indexOf(block) + 1;
  }
}
