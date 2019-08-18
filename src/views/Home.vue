<template>
  <div class="home">
    <header class="header">
      <h1>graffiti</h1>
    </header>

    <div>
      <p>方角（geo）{{geo}}</p>
      <p>方角（デバイス）{{dev}}</p>
    </div>

    <div v-for="(item, index) in comments" :data-id="item.id" class="comments">
      <p class="content circle-1">{{ item.content }}</p>
      <time class="time" v-if="item.timestamp">{{ item.timestamp.toDate().toLocaleString() }}</time>
      <div class="location" v-if="item.timestamp">{{ item.location._lat }} - {{ item.location._long }}</div>
      <div class="location" v-if="item.head">{{ item.head }}</div>
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
        head: '', // 方角
      },
      dev: {
        compass: null,
        acc: null,
      },
    }
  },

  firestore() {
     return {
       comments: db.collection('comments').orderBy('timestamp')
     }
   },

  created() {
    this.getGeo()

    window.addEventListener('deviceorientation', (event) => {
      console.log('方角       : ' + event.alpha);
      console.log('上下の傾き : ' + event.beta);
      console.log('左右の傾き : ' + event.gamma);
      this.dev.compass = event.webkitCompassHeading
      this.dev.acc = event.webkitCompassAccuracy
      console.log('コンパスの向き : ' + event.webkitCompassHeading);
      console.log('コンパスの精度 : ' + event.webkitCompassAccuracy);
    }, true)
  },

  methods: {
    /**
    * コメント追加
    */
    addComment() {
      this.getGeo() // 投稿前に位置情報をセットし直す

      db.collection('comments').add({
        content: this.inputComment,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        heading: this.geo.head,
        location: new firebase.firestore.GeoPoint(this.geo.lat, this.geo.long),
      }).then((docRef) => {
        this.resetComment()
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.warn(error)
      })
    },

    /**
    * コメント欄をリセット
    */
    resetComment() {
      this.inputComment = ''
    },


    /**
    * 位置情報を取得
    */
    getGeo() {
      // const vm = this

      navigator.geolocation.getCurrentPosition((position) => {
        this.geo.lat = position.coords.latitude
        this.geo.long = position.coords.longitude
        this.geo.head = position.coords.heading
      }),

      // 取得エラー
      (error) => {
        switch(error.code) {
          case 1: //PERMISSION_DENIED
            alert('位置情報の利用が許可されていません')
            break
          case 2: //POSITION_UNAVAILABLE
            alert('現在位置が取得できませんでした')
            break
          case 3: //TIMEOUT
            alert('タイムアウトになりました')
            break
          default:
            alert('Other Error', error.code)
            break
        }
      },

      // オプション
      {
        'enableHighAccuracy': true,
        'timeout': 10000,
        'maximumAge': 0
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

  .location {
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
