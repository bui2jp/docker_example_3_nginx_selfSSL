<template>
  <div>
    <img v-bind:src="myImage" style="height: 200px" />
    <p>Index:{{myImageIndex}}</p>
    <p>Error: {{apiErrMsg}}</p>
    <div>
      <a href="#" class="btn btn-info" @click="buttonClick">GET</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      myImage: null,
      myImageIndex: 0,
      apiErrMsg: ''
    };
  },
  methods: {
     buttonClick: function () {
      console.log("buttonClick");

      //このループを直列でAPIをコールするように変更する
      //非同期処理なので、storeのActionに変更して対応できるはず

      this.getImageFromAPI()
    },
    async getImageFromAPI(){
      console.log('getImageFromAPI : ' + process.env.VUE_APP_API_URL_GETIMAGE)
      for (let step = 0; step < 5; step++) {
          console.log('start getImageFromAPI step :' + step)
          try{
              let index = step % 4;
              const response = await axios.get(process.env.VUE_APP_API_URL_GETIMAGE + index)
              //const response = await axios.get("http://192.168.0.6:8081/api/image/" + index)              
              this.myImage = 'data:image/png;base64,' + response.data
              this.myImageIndex = step
          }
          catch(e){
              console.log('getImageFromAPI fail :' + e)
              this.apiErrMsg = e
              break
          }
          console.log('end getImageFromAPI step :' + step)
      }        
    }
  },
  computed: {
    image() {
      return 'data:image/png;base64,' + this.$store.state.image;
    },
  },
};
</script>