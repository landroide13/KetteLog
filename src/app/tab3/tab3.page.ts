import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonLabel } from '@ionic/angular/standalone';

import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import type { EChartsCoreOption } from 'echarts/core';
import * as echarts from 'echarts/core';
echarts.use([BarChart, GridComponent, CanvasRenderer]);
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { SessionStorageStore } from '../core/services/session-storage.store';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonLabel, IonHeader, IonToolbar, IonTitle, 
    IonContent, NgxEchartsDirective, CommonModule],
  providers: [
    provideEchartsCore({ echarts }),
  ]
})

export class Tab3Page {

  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300,
  };

  constructor(private sqlite: SessionStorageStore) {}

  chartOptionsWeek: EChartsCoreOption = {};
  chartOptionsDay: EChartsCoreOption = {};

  private formatDateMonthDay(dateStr: string): string {
  
    const clean = dateStr.split('T')[0];

    const d = new Date(clean);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();

    return `${month} ${day}`;
  }

  async ionViewWillEnter(){
    await this.loadWeeklyChart();
    await this.loadRepsSimpleChart();
  }

  async loadWeeklyChart() {
    const data = await this.sqlite.getWeeklySummary();

    if (!data.length) {
      this.chartOptionsWeek = {};
      return;
    }

    const weeklyTotals: { [week: string]: number } = {};

    data.forEach(row => {
      const week = row.week; 
      if (!weeklyTotals[week]) {
        weeklyTotals[week] = 0;
      }
      weeklyTotals[week] += row.totalReps;
    });

    const weeks = Object.keys(weeklyTotals)
      .sort((a, b) => Number(a) - Number(b));

    const reps = weeks.map(w => weeklyTotals[w]);

    this.chartOptionsWeek = {
      color: ['#db8733'],
      backgroundColor: '#f8f9fa',
      title: {
        text: 'Reps vs Date',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },

      tooltip: {
        trigger: 'axis',
        backgroundColor: '#333',
        textStyle: { color: '#fff' }
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: weeks,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Reps',
          type: 'bar',
          barWidth: '60%',
          data: reps,
        },
      ],
    };
  }

  // async loadDailyChart() {
  //   const rows = await this.sqlite.getDailyProgress();

  //   if (!rows.length) {
  //     this.chartOptions = {};
  //     return;
  //   }

  //   // Create arrays for chart
  //   const dates = rows.map(r => this.formatDateMonthDay(r.date));

  //   const reps = rows.map(r => Number(r.reps));
  //   const sessions = rows.map(r => Number(r.sessionCount));

  //   this.toast.showToast(`DB reps: ${reps}`, 'top');
  //   this.toast.showToast(`DB sessions: ${sessions}`, 'bottom');

  //   // Chart configuration
  //   this.chartOptions = {
  //     backgroundColor: '#f8f9fa', 

  //     title: {
  //       text: 'Reps vs Sessions',
  //       left: 'center',
  //       textStyle: {
  //         fontSize: 16,
  //         fontWeight: 'bold'
  //       }
  //     },

  //     color: ['#ff5722', '#3f51b5'], 
  //     tooltip: {
  //       trigger: 'axis',
  //       backgroundColor: '#333',
  //       textStyle: { color: '#fff' }
  //     },

  //     grid: {
  //       left: '8%',
  //       right: '8%',
  //       top: '20%',
  //       bottom: '15%'
  //     },

  //     legend: {
  //       // data: ['Reps', 'Sessions'],
  //       data: ['Reps'],
  //       top: 30
  //     },

  //     xAxis: {
  //       type: 'category',
  //       data: dates,
  //       axisLabel: {
  //         color: '#333',
  //         fontSize: 12,
  //         rotate: 30
  //       },
  //       axisLine: { show: true },
  //       axisTick: { show: true }
  //     },

  //     yAxis: [
  //       {
  //         type: 'value',
  //         name: 'Reps',
  //         splitLine: {
  //           show: true,
  //           lineStyle: { color: '#ddd', type: 'dashed' }
  //         }
  //       },
  //       // {
  //       //   type: 'value',
  //       //   name: 'Sessions',
  //       //   position: 'right',
  //       //   splitLine: { show: false }
  //       // }
  //     ],

  //     series: [
  //       {
  //         name: 'Reps',
  //         type: 'bars',
  //         smooth: true,
  //         data: reps,
  //         symbol: 'circle',
  //         symbolSize: 8,
  //         lineStyle: { width: 3 },
  //         itemStyle: { color: '#ff5722' }
  //       },
  //       // {
  //       //   name: 'Sessions',
  //       //   type: 'line',
  //       //   smooth: true,
  //       //   data: sessions,
  //       //   yAxisIndex: 1,
  //       //   symbol: 'circle',
  //       //   symbolSize: 8,
  //       //   lineStyle: { width: 3 },
  //       //   itemStyle: { color: '#3f51b5' }
  //       // }
  //     ]
  //   };
  // }

  async loadRepsSimpleChart() {
    const rows = await this.sqlite.getRepsOverTime();

    if (!rows.length) {
      this.chartOptionsDay = {};
      return;
    }

    const dates = rows.map(r => this.formatDateMonthDay(r.date));
    const reps = rows.map(r => Number(r.totalReps));

    this.chartOptionsDay = {
      color: ['#3398DB'],
      backgroundColor: '#f8f9fa',
      title: {
        text: 'Reps vs Date',
        left: 'center',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        }
      },

      tooltip: {
        trigger: 'axis',
        backgroundColor: '#333',
        textStyle: { color: '#fff' }
      },

      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: dates,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Reps',
          type: 'bar',
          barWidth: '60%',
          data: reps,
        },
      ],
    };

  }

}








