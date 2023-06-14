<template>
    <div id="game" class="xl:px-64 lg:px-32 md:px-16 sm:px-8 px-4 ease-in-out duration-300 overflow-hidden">

        <!-- Game Content -->
        <div class="content">

          <template v-if="isLogged">
            <div class="menu flex justify-between">
                <Button :text="'Faire une pause'" :href="''" class="cursor-pointer" @click.prevent="interrupt()" />
                <!-- Progress Bar -->
                <div class="progress_bar mt-4">
                    <div class="flex flex-row" style="width: 600px;">

                        <!-- Repeted section + star -->
                        <div v-for="item, index of [0, 1, 2, 3]" :key="index" class="flex justify-around items-center"
                            style="width: 150px;">
                            <div style="height: 10px; width:130px;"
                                class="bar inline-block bg-white border-black border-2 rounded-full">
                                <!-- Progress Section -->
                                <div style="height: 100%; background-color: yellow; transition: width 0.3s;"
                                    :style="{ width: sectionsProgress[index].toFixed(0) + '%', 'transition-delay': (progress >= (index + 1) * 25) ? '0' : '0.4s' }">
                                </div>


                            </div>
                            <img src="@/assets/game/star_full.png" alt="star" class="mx-2 h-10 w-10 contain"
                                v-if="starColors[index] == 'star_full'">
                            <img src="@/assets/game/star.png" alt="star" class="mx-2 h-10 w-10 contain" v-else>
                        </div>


                    </div>
                </div>
                <!-- End Progress Bar -->
            </div>



            <!-- Main Game -->
            <div v-if="!!scenario && currentStep < scenario.length" class="mt-6 game">
                <!--
                <Colibri class="animal" />
                -->

                <img class="max-h-96 w-auto
                " src="../../assets/game/colibri_small.gif" />

                <div class="content">
                    <!-- Question -->
                    <div class="questions">
                        {{ scenario[currentStep].question }}
                    </div>

                    <!-- Answers -->
                    <div class="mt-10 answers">
                        <div v-for="item, index of scenario[currentStep].answers" :key="index">
                            <button class="answer" type="button" @click="answerClicked(index)"> {{ item }}
                            </button> <br>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="
            results
            flex
            flex-col
            justify-center
            align-center
            ">
                <h3>Resultat:</h3>
                <p>{{ result }}</p>
                <p>{{ comment }}</p>
                <Button :text="'Retour à l\'accueil'" :href="'/'" class="cursor-pointer" />
                <Button :text="'Annuaire des professionnels'" :href="'/ressources/'" class="cursor-pointer" />

            </div>

            <!-- End Main Game -->
          </template>
          <!-- Display if visitor is not logged -->
          <template v-else>
            <p>Désolé, il faut être connecté pour acceder à ce test
                <Button :text="'Se connecter'" :href="'/connexion/'" class="cursor-pointer" />
            </p>
            
          </template>
        </div>
        <!-- End Game Content -->

    </div>
</template>

<script>
//import Colibri from '@/components/elements/Colibri.vue'
import Button from '@/components/elements/Button.vue'
import { postTestResult } from "@/api/TestResult/postTestResult";
import { getAccountPendingTests } from "@/api/PendingTest/getAccountPendingTests";
import { postPendingTest } from "@/api/PendingTest/postPendingTest";
import { patchPendingTest } from "@/api/PendingTest/patchPendingTest";
import { deletePendingTest } from "@/api/PendingTest/deletePendingTest";
import { getIsLogged, isLogged } from '@/api/Auth/getIsLogged';
import jwtDecode from "jwt-decode";


export default {
    name: "GameView",

    components: {
        //Colibri,
        Button
    },

    async mounted() {
        try {
          const response = await getIsLogged();
        } catch (error) {
          this.isLogged = false;
          this.$router.push('/connexion');
        }

        try {
            const token = localStorage.getItem('token');
            const userId = jwtDecode(token).userId;
            const tests = await getAccountPendingTests(userId);
            if (!!tests && tests.length > 0) {
                // get [0] for now
                this.pendingTestId = tests[0].id;
                this.answers = JSON.parse(tests[0].data);
                this.currentStep = this.answers.length;
            }
        } catch (error) {
            this.$router.push('/connexion');
        }


    },
    data() {
        return {
            isLogged: true,
            pendingTestId: null,
            currentStep: 0,
            scenario: [
                {
                    // Question 1 d'un diagnostic de TDAH
                    question: "Au cinéma, il y a la queue pour le film que je veux voir. Par contre, il n'y a personne pour voir un film qui m'interesse moins.",
                    answers: ["J'arrive a rester patient", "Je perd parfois patience", "J'ai souvent du mal à patienter", "Soit on voit l'autre film tout desuite, soit on s'en va, mais je n'attends pas!"]
                },
                {
                    // Question 1 d'un diagnostic de TDAH
                    question: "Zut, j'ai encore oublié de sortir les poubelles !",
                    answers: ["Je me souviens toujours de ce que je dois faire.", "Il m'arrive d'oublier de faire les choses.", "J'oublie souvent des tâches.", "J'oublie tout le temps les choses."]
                },
                {
                    // Question 3 d'un diagnostic de TDAH
                    question: "Pfff, c'est long de finir ce puzzle, je préfère faire autre chose.",
                    answers: ["J'arrive à rester concentré.", "Parfois, je perds mon attention pendant une tâche.", "Souvent, je suis distrait pendant une tâche.", "Je ne peux jamais rester concentré pendant une tâche."]
                },
                {
                    // Question 4 d'un diagnostic de TDAH
                    question: "Qu'est-ce que tu disais maman ? J'étais en train de penser à mon prochain match de foot.",
                    answers: ["J'écoute toujours quand on me parle.", "Parfois, je ne prête pas attention quand on me parle.", "Souvent, je semble ne pas écouter quand on me parle.", "Je ne prête jamais attention quand on me parle."]
                },
                {
                    // Question 6 d'un diagnostic de TDAH
                    question: "J'ai un devoir de maths, un dessin à faire et un livre à lire. Je ne sais pas par où commencer.",
                    answers: ["J'arrive à rester organisé.", "Parfois, je ne sais pas comment organiser mes activités.", "Souvent, j'ai du mal à organiser mes tâches.", "Je suis toujours désorganisé."]
                },
                {
                    // Question 8 d'un diagnostic de TDAH
                    question: "Où ai-je mis mon stylo ? Je suis sûr de l'avoir mis dans mon sac à dos.",
                    answers: ["Je ne pas souvent mes affaires.", "Parfois, je perds les objets dont j'ai besoin.", "Souvent, je ne sais pas où sont les objets dont j'ai besoin.", "Je perds toujours mes affaires."]
                },
                {
                    // Question 9 d'un diagnostic de TDAH
                    question: "Quand je suis assis en classe...",
                    answers: ["Je peux rester immobile pendant longtemps.", "Parfois, je bouge les mains ou les jambes sans y penser", "Je bouge souvent, je bat des jambes ou des bras.", "Je ne peux pas rester en place, je me tortille sur ma chaise, je me lève parfois."]
                },
            ],
            answers: [],
            result: null,
            comment: "",
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
                const status = (this.progress >= (i + 1) * 25) ? 'star_full' : 'star'
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
                this.endGame();
            }
        },
        async interrupt() {
            const token = localStorage.getItem('token');
            const userId = jwtDecode(token).userId;
            const payload = {
                accountId: userId,
                data: JSON.stringify(this.answers)
            }
            if (!!this.pendingTestId) {
                await patchPendingTest(this.pendingTestId, payload);
            } else {
                await postPendingTest(payload);
            }
            this.$router.push('/');

        },
        async endGame() {
            const token = localStorage.getItem('token');
            const userId = jwtDecode(token).userId;
            const payload = {
                accountId: userId,
                data: JSON.stringify(this.answers)
            }
            const response = await postTestResult(payload);

            // delete pending test that was loaded, if exists
            if (!!this.pendingTestId) {
                const delteResult = await deletePendingTest(this.pendingTestId);
            }

            const total = this.answers.reduce((stack, current) => {
                // add to total value in scores at index = answer
                return stack + [0, 1, 3, 5][current];
            }, 0);
            const score = total / (this.scenario.length * 5) * 100
            this.result = `Tu as un score de ${score.toFixed(0)} /100`
            if (total > this.scenario.length * 2) {
                this.comment += "Ca peut être le signe d'un TDA-H; tu devrais peut-être voir un spécialiste.";
            } else {
                this.comment += "Tu ne sembles pas avoir de TDA-H. Mais nous somme pas des spécialistes! Si tu as toujours un doute, n'hésite pas à en voir un!";
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";

#game {
    border: 14px solid $primary-blue;
    border-width: 22px 14px 14px 14px;

    height: calc(100vh - $header-height);

    background-image: url('https://c0.wallpaperflare.com/preview/51/16/839/blue-blurred-bokeh.jpg');
    background-size: cover;

    .progress_bar {
        .bar {
            border-color: $primary-blue;
            border-width: 3px;
        }
    }

    .content {
        backdrop-filter: blur(5px);

        .menu {
            margin-top: 5vh;
        }

        .game {
            display: flex;
            flex-direction: row;
            justify-content: center;
            gap: 5%;

            position: relative;

            .animal {
                aspect-ratio: 1;
            }

            .content {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-width: 50% !important;


                .questions {
                    font-size: 32px;
                    font-family: 'Roboto', sans-serif;
                    font-weight: 700;
                    color: $secondary-brown;
                    margin-bottom: 8vh;
                }

                .answers {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    grid-template-rows: 1fr 1fr;
                    justify-content: center;
                    align-items: center;
                    gap: 50px;
                    font-size: 18px;
                    font-family: 'Roboto', sans-serif;
                    color: $primary-brown;

                    div {
                        width: fit-content;
                        vertical-align: middle;
                        padding: 12px 24px;
                        border-radius: 100px;
                        transition: all 0.3s;

                        &:hover {
                            background-color: $secondary-blue;
                            transform: scale(1.1);
                        }
                    }
                }
            }

            .results {
                min-height: 300px;
                width: 100%;
            }
        }
    }
}
</style>
