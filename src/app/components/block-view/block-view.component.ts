import { Component, OnInit, Input } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-block-view',
  templateUrl: './block-view.component.html',
  styleUrls: ['./block-view.component.scss']
})
export class BlockViewComponent implements OnInit {
  @Input()
  public block;

  @Input()
  public selectedBlock;

  private blocksInChain;

  // Ses this.blocksInChain equal to the current blockchainInstance chain
  constructor(private blockchainService: BlockchainService) {
    this.blocksInChain = blockchainService.blockchainInstance.chain;
  }

  ngOnInit() {
  }

  // Returns the list of transactions in this block
  blockHasTx() {
    return this.block.transactions;
  }

  // Tells us if his block is the currently selected block
  isSelectedBlock() {
    return this.block === this.selectedBlock;
  }

  // Returns the (index + 1) of this block in the blockchain
  getBlockNumber() {
    return this.blocksInChain.indexOf(this.block) + 1;
  }
}
