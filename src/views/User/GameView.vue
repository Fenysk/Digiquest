<template>
    <div id="test" class="xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 py-64">

        <!-- Game Content -->
        <div>
            <!-- Progress Bar -->
            <div>
                ProgressBar: {{ progress.toFixed(0) }} %
                <div style="display: flex; flex-direction: row; width: 600px;">

                    <!-- Repeted section + star -->
                    <div v-for="item, index of [0, 1, 2, 3]" :key="index"
                        style="display: flex;width: 150px; justify-content: space-around;align-items: center;">
                        <div
                            style="display: inline-block;height: 10px; width:130px; background-color: white;border:black 1px solid;">

                            <!-- Progress Section -->
                            <div style="height: 100%; background-color: yellow; transition: width 0.3s;"
                                :style="{ width: sectionsProgress[index].toFixed(0) + '%', 'transition-delay': (progress >= (index + 1) * 25) ? '0' : '0.4s' }">
                            </div>


                        </div>
                        <!-- Progress Star -->
                        <div style="height: 24px; width: 24px; border:1px solid black; border-radius: 50%; transition: background-color s 0.4s;"
                            :style="{ backgroundColor: starColors[index] }"></div>
                    </div>


                </div>
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
                    <div v-for="item, index of scenario[currentStep].answers" :key="index">
                        <button type="button" @click="answerClicked(index)"> {{ scenario[currentStep].answers[index] }}
                        </button> <br>
                    </div>
                </div>
            </div>
            <div v-else>
                Fin du jeu!
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
    async mounted() {
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
                    question: "question # 3",
                    answers: ["Answers 3-1", "Answers 3-2", "Answers 3-3", "Answers 3-4"]
                },
                {
                    question: "question # 4",
                    answers: ["Answers 4-1", "Answers 4-2", "Answers 4-3", "Answers 4-4"]
                },
                {
                    question: "question # 5",
                    answers: ["Answers 5-1", "Answers 5-2", "Answers 5-3", "Answers 5-4"]
                },
            ],
            answers: []
        }
    },
    computed: {
        //
        progress() {
            if (!this.scenario || this.scenario.length == 0) {
                return 0.0
            }
            return (this.currentStep / this.scenario.length) * 100.0
        },
        sectionsProgress() {
            let progresses = [];
            for (let i = 0; i < 4; i++) {
                const progress = Math.min(Math.max(this.progress - i * 25, 0), 25) * 4
                progresses.push(progress)
            }

            return progresses;

        },
        starColors() {
            let stars = [];
            for (let i = 0; i < 4; i++) {
                const status = (this.progress >= (i + 1) * 25) ? 'rgba(255, 255, 0, 1.0)' : 'rgba(255, 255, 0, 0.2)'
                stars.push(status)
            }
            return stars;
        }
    },
    methods: {
        answerClicked(index) {
            // store answer
            this.answers.push(index)
            // proceed to next step
            this.currentStep += 1;
            // handle end of game
            if (this.currentStep === this.scenario.length) {
                this.finishedGame = true;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
</style>