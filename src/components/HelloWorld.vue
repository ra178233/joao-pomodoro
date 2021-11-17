<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
   <div class="container">
      <h2 v-if="pomodoroMode">Modo de trabalho</h2>
      <h2 v-if="!pomodoroMode">Modo de intervalo</h2>
  </div>
  <div class="container">
    <div class="text-center">
      {{ minutos }}:{{ segundos }}
    </div>
  </div>
  <div class="container">
      <button v-on:click="start"><i class="fas fa-play"></i> start</button>
      <button v-on:click="stop"><i class="fas fa-stop"></i> stop</button>
  </div>
   <div class="container">
      <button v-if="!working" v-on:click="diminuirTempo"><i class="fas fa-minus"></i></button>
      <button v-if="!working" v-on:click="alterarMode"> mode </button>
      <button v-if="!working" v-on:click="aumentarTempo"><i class="fas fa-plus"></i></button>
  </div>
  <div class="container">
      <h1>Contador de pomodoros: {{contador}}</h1>
  </div>
</template>

<script>
import alarm from '@/assets/alarm.mp3'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return{
      minutos: 25,
      segundos: '00',
      working: false,
      pomodoroMode: true,
      contador: 0
    }
  },
  methods: {
    start() {
      this.working = true
      if(this.finalizado()){
        this.segundos = '00'
        this.minutos = this.pomodoroMode ? 25 : 5
        return
      }
      if(this.iniciado()){
         let segundo = Number(this.segundos)
         segundo <= 10 ? this.segundos = `0${this.segundos - 1}` : this.segundos = `${this.segundos - 1}`;
         return
      }
      this.segundos = '59'
      this.minutos--;
    },
    stop() {
      this.working = false
    },
    alterarMode(){
      this.pomodoroMode = !this.pomodoroMode
    },
    aumentarTempo() {
      this.minutos++
    },
    diminuirTempo() {
      this.minutos--
    },
    iniciado(){
      return this.segundos != '00' && ((this.pomodoroMode && this.minutos != 25) || (!this.pomodoroMode && this.minutos != 5))
    },
    finalizado(){
      return this.segundos == '00' && this.minutos == 0
    },
  },
  watch:{
    segundos:{
      handler(value) {
        let segundo = Number(value)
        if(this.working){
          setTimeout(() => {
            if(segundo == 0){
              if(this.minutos == 0){
                this.working = false
                const audio = new Audio(alarm)
                audio.play()
                if(this.pomodoroMode){
                  this.contador++
                }
                return
              }
              this.minutos--;
              this.segundos = '59'            
            }
            segundo <= 10 ? this.segundos = `0${this.segundos - 1}` : this.segundos = `${this.segundos - 1}`;
          }, 10);
        }
      }
    },
    pomodoroMode : {
      handler(value) {
        value ? this.minutos = 25 : this.minutos = 5
        this.segundos = '00'
      }
    },
    contador : {
      handler(value) {
        if (value % 4 == 0){
          alert("Que tal descansar por 10 minutos ?");
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
