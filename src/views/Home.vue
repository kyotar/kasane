<template>
  <div class="home">

    <template v-for="(item, index) in comments">
      {{item}}
      <p><img :src="item.avatar" alt=""></p>
      <p>{{item.content}}</p>
    </template>

    <input type="text">
    <button type="button">送信</button>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
import db from '@/plugins/firebase'



// db.collection("comments").get().then(function(querySnapshot) {
//     querySnapshot.forEach(function(doc) {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//     });
// });


export default {
  name: 'home',
  data() {
    return {
      comments: [],
    }
  },
  // data: () => ({
  //   comments: [],
  // }),

  created() {
    // db.collection('comments').add({ content: 'test'})
    // db.collection('comments').doc(id).delete()
  },
  //
  // components: {
  //   HelloWorld
  // },
  firestore() {
     return {
       comments: db.collection('comments').orderBy('createdAt')
     }
   },
}
</script>

<style lang="sass">
  </style>
