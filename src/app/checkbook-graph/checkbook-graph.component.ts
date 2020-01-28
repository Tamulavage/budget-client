import { Component, OnInit, Input } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Checkbook } from '../models/checkbook';

@Component({
  selector: 'app-checkbook-graph',
  templateUrl: './checkbook-graph.component.html',
  styleUrls: ['./checkbook-graph.component.css']
})
export class CheckbookGraphComponent implements OnInit {
  @Input() user: number;
  dataReady = false;

  public checkbook: Checkbook[] = [];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    annotation: null
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(
    private transactionService: TransactionService) { }

  ngOnInit() {
    this.populateData();
  }

  private populateData() {
    this.transactionService.getTransactionsAndAccountInfo(this.user).subscribe(fullCheckbook => {
       this.populateDataSet(fullCheckbook);
      }
    );
  }

  private populateDataSet(fullCheckbook: Checkbook[]) {

    const leng = fullCheckbook.map(t => t.accounts.length).reduce((a, b) => a);
    const maxShow = 7;
    let dataToAdd = [];
    const label = [];

    for (let x = 0; x < leng && x < maxShow; x++) {
      label.push(fullCheckbook.map(c => c.accounts[x].nickname));
      dataToAdd.push(fullCheckbook.map(c => c.accounts[x].balance));
    }

    // tslint:disable-next-line: prefer-for-of
    for ( let w = 0; w < dataToAdd[0].length; w++) {
      this.lineChartLabels.push('');
    }

    dataToAdd = this.revereseArray(dataToAdd);

    for (let y = 0; y < leng && y < maxShow; y++) {
      const colorChangeRed =  (((y * y) * 27) + 40) % 255;
      const colorChangeBlue = (((y * y) * 24) + 10) % 255;
      const colorChangeGreen = (((y * y) * 26) + 80) % 255;
      const borderColorChange = 'rgba(' + colorChangeRed + ',' + colorChangeGreen + ', ' + colorChangeBlue + ',1)';
      const grouping: ChartDataSets = { data: dataToAdd[y], label: label[y][y], borderColor: borderColorChange};
      this.lineChartData.push(grouping);
    }
    this.dataReady = true;
  }

  private revereseArray(dataToAdd: number[][]): number[][] {
    dataToAdd.forEach(element => {
      element = element.reverse();
    });
    return dataToAdd;
  }

}
