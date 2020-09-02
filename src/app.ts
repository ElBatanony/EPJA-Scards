import DataActions from '@main/__data__/actions/main';
import Vue from 'vue';

Vue.config.productionTip = false

const loadData = async () => {
  return DataActions();
};

const sum = (a, b) => a + b;

export { sum };

export default new Vue({
  template: '<div>I\'m mounted</div>',
  created(){
    console.log('Created');
  },
  mounted(){
    console.log('Mounted');
  }
});;