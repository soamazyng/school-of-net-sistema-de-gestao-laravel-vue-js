import Vue from 'vue'
import {Time} from './time';
import _ from 'lodash';

require('!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');

new Vue({
	el: '#app',
	data: {
		colunas:[
		"nome", "pontos", "gm", "gs", "saldo"
		],
		order: {
			keys: ["pontos", "gm", "gs"],
			sort: ['desc', 'desc', 'asc']
		},
		times: [
		new Time('Palmeiras', require('./assets/palmeiras_60x60.png')),
		new Time('Flamengo', require('./assets/flamengo_60x60.png')),
		new Time('Atlético-MG', require('./assets/atletico_mg_60x60.png')),
		new Time('Santos', require('./assets/santos_60x60.png')),
		new Time('Botafogo', require('./assets/botafogo_60x60.png')),
		new Time('Atlético-PR', require('./assets/atletico-pr_60x60.png')),
		new Time('Corinthians', require('./assets/corinthians_60x60.png')),
		new Time('Grêmio', require('./assets/gremio_60x60.png')),
		new Time('Fluminense', require('./assets/fluminense_60x60.png')),
		new Time('Ponte Preta', require('./assets/ponte_preta_60x60.png')),
		new Time('Chapecoense', require('./assets/chapecoense_60x60.png')),
		new Time('São Paulo', require('./assets/sao_paulo_60x60.png')),
		new Time('Cruzeiro', require('./assets/cruzeiro_60x60.png')),
		new Time('Sport', require('./assets/sport_60x60.png')),
		new Time('Coritiba', require('./assets/coritiba_60x60.png')),
		new Time('Internacional', require('./assets/internacional_60x60.png')),
		new Time('Vitória', require('./assets/vitoria_60x60.png')),
		new Time('Figueirense', require('./assets/figueirense_60x60.png')),
		new Time('Santa Cruz', require('./assets/santa_cruz_60x60.png')),
		new Time('América-MG', require('./assets/america_mg_60x60.png')),
		],
		novoJogo : {
			casa: {
				time: null,
				gols: 0
			},
			fora: {
				time: null,
				gols: 0
			}			
		},
		view: 'table',
		filter: ''
	},
	created(){ //depois que os observadores foram iniciados - preprocessador
		
	},
	methods:{
		fimJogo(){
			let timeAdv = this.novoJogo.fora.time;
			let gols = +this.novoJogo.casa.gols; //+ converte para inteiro
			let golsAdv = +this.novoJogo.fora.gols; //+ converte para inteiro
			this.novoJogo.casa.time.fimJogo(timeAdv, gols, golsAdv);
			this.showView('table');
		},
		showView(v){
			this.view = v;
		},
		createNovoJogo(e){			

			let indexCasa = Math.floor(Math.random() * 20),
			indexFora = Math.floor(Math.random() * 20);

			this.novoJogo.casa.time = this.times[indexCasa];
			this.novoJogo.fora.time = this.times[indexFora];

			this.novoJogo.casa.gols = 0;
			this.novoJogo.fora.gols = 0;

			this.showView('novojogo');
		},
		sortBy(c){
			this.order.keys = c;
			this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc';
		}
	},
	computed:{
		timesFiltered(){ //não é possível passar parametros
			let colecao = _.orderBy(this.times, this.order.keys, this.order.sort);
			return _.filter(colecao, item => { 
											return item.nome.indexOf(this.filter) >= 0;
										});
		}	
	},
	filters:{
		saldo(time){
			return time.gm - time.gs;
		},
		ucwords(value){
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	}
})