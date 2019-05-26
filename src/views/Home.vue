<template>
  <div class="home">
    <header class="header">
      <h1>graffiti</h1>
    </header>

    <div v-for="(item, index) in comments" :data-id="item.id" class="comments">
      <p class="content circle-1">{{ item.content }}</p>
      <time class="time">{{ item.timestamp.toDate().toLocaleString() }}</time>
      <!-- <div class="location">{{ item.location }}</div> -->
    </div>

    <footer class="footer">
      <textarea class="textarea" v-model="inputComment" maxlength="31" rows="2" placeholder="なにを刻む？" required autofocus></textarea>
      <button type="button" class="button" :disabled="!inputComment" @click="addComment">送信</button>
    </footer>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import db from '@/plugins/firebase'

export default {
  name: 'home',
  data() {
    return {
      inputComment: '',
      comments: [],
      geo: {
        lat: '', // 緯度
        long: '', // 経度
      }
    }
  },

  firestore() {
     return {
       comments: db.collection('comments').orderBy('timestamp')
     }
   },

  created() {
    this.getGeo()
  },

  methods: {
    addComment() {
      console.log(this.geo.lat)
      db.collection('comments').add({
        content: this.inputComment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        location: new firebase.firestore.GeoPoint(this.geo.lat, this.geo.long),
      }).then((docRef) => {
        this.resetComment()
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
    },

    resetComment() {
      this.inputComment = ''
    },

    getGeo() {
      const vm = this

      navigator.geolocation.getCurrentPosition((position) => {
        vm.geo.lat = position.coords.latitude
        vm.geo.long = position.coords.longitude
      }),
      (error) => {
        console.error('位置情報取得失敗', error)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/common.scss';
.header {
  padding: 16px;
  background-color: $color-primary;

  h1 {
    margin: 0;
    font-size: $font-l;
    text-align: center;
  }
}

.home {
  // text-align: center;
}

.comments {
  margin: 16px auto;
    width: 240px;

  .content {
    background-color: rgba($color-black, .1);
    padding: 32px;
    margin: 0;

    min-height: 32px;
    border-radius: 4px;
    font-size: $font-m;
  }

  .circle-1 {
    border-radius: 50% 50% 50% 70%/50% 50% 70% 60%;
  }
  .circle-2 {
    border-radius: 80% 30% 50% 50%/50%;
  }
  .circle-3 {
    border-radius: 40% 40% 50% 40%/30% 50% 50% 50%;
  }

  .time {
    font-size: $font-xs;
    color: rgba($color-black, .4);
  }
}

.footer {
  width: 100%;
  background-color: #eee;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
}
</style>
