<template>
    <div id="test" class="xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-64">

        <h1 class="text-3xl text-center font-bold">Page pour se faire tester</h1>

        <!-- Game Content -->
        <div>
          <!-- Progress Bar -->
          <div>
            ProgressBar
          </div>
          <!-- End Progress Bar -->

          <!-- Main Game -->
          <div v-if="!!scenario && currentStep < scenario.length">
            <div>Oiseau.png</div>
            <!-- Question -->
            <div>
              {{ scenario[currentStep].question }}
            </div>

            <!-- Answers -->
            <div>
              <div v-for="item,index of scenario[currentStep].answers" :key="index">
                <button type="button" @click="answerClicked(index)"> {{ scenario[currentStep].answers[index] }} </button> <br>
              </div>
            </div>
          </div>
          answers: {{ answers }}
          <!-- End Main Game -->
        </div>
        <!-- End Game Content -->

    </div>
</template>

<script>
export default {
    name: "GameView",
    async mounted () {
      // TODO check with server if user is register

      // TODO check if user already has pendingtest
        // if yes -> set answers and curretn step
    },
    data() {
      return {
        currentStep: 0,
        scenario: [
          { 
            question: "question # 1",
            answers: ["Answers 1-1", "Answers 1-2", "Answers 1-3", "Answers 1-4"]
          },
          { 
            question: "question # 2",
            answers: ["Answers 2-1", "Answers 2-2", "Answers 3-3", "Answers 4-4"]
          },
          { 
            question: "question # 1",
            answers: ["Answers 3-1", "Answers 3-2", "Answers 3-3", "Answers 3-4"]
          },
        ],
        answers: []
      }
    },
    computed: {
      //
      progress() {
        if( !this.scenario || this.scenario.length == 0){
          return 0.0
        }
        return ( this.currentStep / this.scenario.length ) * 100.0
      }
    },
    methods: {
      answerClicked(index){
        // store answer
        this.answers.push(index)
        // proceed to next step
        if (this.currentStep === this.scenario.length -1) {
          // handle end of game
        } else {
          // handle nextStep
          this.currentStep += 1;
        }
      },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

</style>
