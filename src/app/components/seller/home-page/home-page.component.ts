import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'Phân Tích Bán Hàng'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = {
    title: { text: "Phân Tích Bán Hàng" }, subtitle: { text: 'Tổng quan dữ liệu của shop đối với đơn hàng đã xác nhận' }, xAxis: {
      labels: {
        format: "{value} giờ" // Định dạng nhãn trục x
      },
      
      tickInterval: 4 ,
      min: 0, // Giá trị tối thiểu trên trục x
      max: 24 // Giá trị tối đa trên trục x
    },
    yAxis:{
      labels: {
        format: "{value}K VNĐ" // Định dạng nhãn trục x
      },
    }
    , series: [{
      data: [56, 22, 41, 82, 53, 74, 81, 11, 100 ,34,56,12,78,21,89,21,63],
      type: 'line',
    }]
  }; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

}
