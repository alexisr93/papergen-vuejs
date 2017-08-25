<template>
  <div id="app">
    <div id="title-div">
      <div id="big-title">
        <h1>PaperGen!</h1>
      </div>
      <div id="tag-line">
        <h6>A simple grid/lined paper pdf generator (and yes no margins are an option).</h6>
      </div>
    </div>
    <div id="main-div">
      <div id="main-form">
        <form id="top-of-form" v-on:submit.prevent="generatePDF">
          <div class="form-group">
            <label for="exampleSelect1">Paper Size</label>
            <select class="form-control" id="exampleSelect1" input type="text" name="field1" v-model="form.paper_size">
              <option value="letter">Letter</option>
              <option value="legal">Legal</option>
              <option value="a4">A4</option>
              <option value="a5">A5</option>
              <option value="a6">A6</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleSelect1">Orientation</label>
            <select class="form-control" id="exampleSelect2" input type="text" name="field2" v-model="form.orientation">
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleSelect1">Grid/Line Style</label>
            <select class="form-control" id="exampleSelect3" input type="text" name="field3" v-model="form.grid_style">
              <option value="lined">Lined </option>
              <option value="dot grid">Dot Grid</option>
              <option value="graph">Graph</option>
            </select>
          </div>
          <div class="form-group">
            <label for="exampleSelect1">Margin Size</label>
            <select class="form-control" id="exampleSelect4" input type="text" name="field4" v-model="form.margin">
              <option value="none">No Margin!</option>
              <option value=".25">.25in</option>
              <option value=".5">.5in</option>
              <option value=".75">.75in</option>
              <option value="1">1in</option>
              <option value="2">2in</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary" id="create-button">Click to Generate PDF :)</button>
        </form>
      </div>
    </div>
    <div id="copyright">
      <p>
        Copyright © 2017 Alexis R. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      form: {
        paper_size: '',
        orientation: '',
        grid_style: '',
        margin: ''

      }
    }
  },
  methods: {
    generatePDF: function () {
      var data = this.form
      console.log('Sending data...')
      this.$http.post('http://localhost:8010/api/form', data).then(response => {
        console.log(data, 'POST was successful')
      })
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300');
body{
  height: 100%;
}
#main-div{
  margin-top: 20px;
  max-width: 400px;
  height: 380px;
  border-radius: 10px;
  background: rgba(29, 21, 21, 0.2);
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#main-form{
  max-width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#top-of-form{
  padding-top: 20px;
}
#big-title{
  margin-top: 100px;
  margin-bottom: 20px;
}
#tag-line{
  font-size: 20;
  font-family: Lato, sans-serif;
  text-align: center;
}
#create-button{
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#copyright{
  max-width: 300px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
h1 {
  font-size: 95px;
  font-family: Lato, sans-serif;
  text-align: center;
  color: black;
}
h6{
  font-size: 13px;
  color: black;
}

</style>
