<template>
  <div class="home">
    <header class="header">
      <h1>graffiti</h1>
    </header>

    <div v-for="(item, index) in comments" :data-id="item.id" class="comments">
      <p class="content circle-1">{{ item.content }}</p>
      <time class="time">{{ item.createdAt.toDate().toLocaleString() }}</time>
    </div>

    <footer class="footer">
      <textarea class="textarea" v-model="inputComment" maxlength="31" rows="5" placeholder="なにを刻む？" required autofocus></textarea>
      <button type="button" class="button" :disabled="!inputComment" @click="add">送信</button>
    </footer>
  </div>
</template>

<script>
import db from '@/plugins/firebase'

export default {
  name: 'home',
  data() {
    return {
      inputComment: '',
      comments: [],
    }
  },

  firestore() {
     return {
       comments: db.collection('comments').orderBy('createdAt')
     }
   },

  created() {
    // db.collection('comments').add({ content: 'test'})
    // db.collection('comments').doc(id).delete()
  },

  methods: {
    add() {
      const now = new Date()

      db.collection('comments').add({
        content: this.inputComment,
        createdAt: now
      }).then((docRef) => {
        this.inputComment = ''
        console.log("Document written with ID: ", docRef.id)
      })
      .catch((error) => {
        console.error("Error adding document: ", error)
      });
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
  text-align: center;
  display: fixed;
  bottom: 0;
}
</style>
