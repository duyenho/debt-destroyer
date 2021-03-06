import { COLORS } from '../utils/constants';

export default {
	template: `
		<canvas :id="chartId" ref="canvas" data-chart-data="realData.length"></canvas>
	`,
	beforeDestroy() {
		this._chartReference.destroy();
	},
	mounted() {
		this._chartReference = new Chart(this.$refs.canvas, {
			type: 'bar',
			data: {
				labels: this.$props.chartLabels,
				datasets: [
					{
						label: 'Amount Paid',
						type: 'line',
						borderColor: COLORS.RED.hex,
						backgroundColor: COLORS.RED.hex,
						fill: false,
						data: this.chartData.amountPaid
					},
					{
						label: 'Amount Remaining',
						type: 'bar',
						yAxisId: 'amount_left',
						backgroundColor: COLORS.BLUE.hex,
						borderColor: COLORS.BLUE.hex,
						data: this.chartData.amountRemaining
					}
				]
			},
			options: {
				tooltips: {
					callbacks: {
						label: function(tooltipItems, data) {
							return data.datasets[tooltipItems.datasetIndex].label +': $' + tooltipItems.yLabel;
						}
					}
				},
				title: {
					display: true,
					text: this.$props.chartTitle,
					position: 'top'
				},
				legend: {
					position: 'bottom'
				},
				scales: {
					yAxes: [
						{
							stacked: false,
							position: 'left',
							id: 'amount_left'
						}
					]
				}
			}
		});
	},
	computed: {
		chartData: function() {
			return {
				amountPaid: this.$props.amountPaidData,
				amountRemaining: this.$props.amountRemainingData
			}
		}
	},
	watch: {
		chartData: function(newValue) {
			this._chartReference.data.labels = this.$props.chartLabels;
			this._chartReference.data.datasets[0].data = newValue.amountPaid;
			this._chartReference.data.datasets[1].data = newValue.amountRemaining;
			this._chartReference.options.title.text = this.$props.chartTitle;
			this._chartReference.update();
		}
	},
	props: {
		chartId: {
			type: String,
			required: true
		},
		chartTitle: {
			type: String,
			required: true
		},
		chartLabels: {
			type: Array,
			required: true
		},
		amountPaidData: {
			type: Array,
			required: true
		},
		amountRemainingData: {
			type: Array,
			required: true
		}
	}
}