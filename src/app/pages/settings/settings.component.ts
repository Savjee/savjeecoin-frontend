import { Component, OnInit } from '@angular/core';
import { BlockchainService } from '../../services/blockchain.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public blockchain;
  public setDiff = 2; // Used to display difficulty on the settings page

  constructor(private blockchainService: BlockchainService) {
    this.blockchain = blockchainService.blockchainInstance;
  }

  ngOnInit() {
  }

  // This function sets the displayed difficulty to whatever value the slider is set to
  // This function is for the ability to see what difficulty is set
  updateDiffLabel(diff) {
    this.setDiff = diff;
  }
}
