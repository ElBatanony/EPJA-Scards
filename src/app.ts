import DataActions from '@main/__data__/actions/main';
import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false

Vue.use(firestorePlugin);

// Get a Firestore instance
export const db = firebase
  .initializeApp({ projectId: 'epja-scards' })
  .firestore()

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

    db.collection('scards')
    .get()
    .then(querySnapshot => {
      const documents = querySnapshot.docs.map(doc => doc.data())
      console.log(documents);
      // do something with documents
    })

  }
});