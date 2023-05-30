<template>
    <div class="quizz">
        <h2>D'après-vous ?</h2>

        <div class="content">
            <div v-if="!answered">
                <div class="question-container">
                    <p class="question">{{ question }}</p>
                </div>

                <div class="choices-container">
                    <Checkbox
                        v-for="(choice, index) in choices"
                        :key="index"
                        v-model="choice.isChecked"
                        :label="choice.text"
                        @click="setOtherChoicesFalse(choice)"
                    />
                </div>

                <div class="validate">
                    <Button
                        text="Valider"
                        secondary
                        @click="validate"
                        class="cursor-pointer"
                    />
                </div>
            </div>

            <div v-else>
                <p class="result">
                    {{ isCorrect ? "Bonne réponse !" : "Mauvaise réponse !" }}
                </p>
                <p class="additional-info">{{ additionalInfo }}</p>
                <Button
                    v-if="source"
                    :text="'En savoir plus...'"
                    primary
                    :href="source"
                    class="cursor-pointer"
                />
            </div>
        </div>
    </div>
</template>
  
  <script>
import data from "@/assets/data.json";

import Checkbox from "@/components/elements/Checkbox.vue";
import Button from "@/components/elements/Button.vue";

export default {
    name: "Quizz",

    components: {
        Checkbox,
        Button,
    },

    data() {
        return {
            questions: data.quizz,
            question: "",
            choices: [],
            answered: false,
            isCorrect: false,
            additionalInfo: "",
            source: "",
            randomQuestion: 0,
        };
    },

    methods: {
        validate() {
            const selectedChoice = this.choices.find(
                (choice) => choice.isChecked
            );
            if (selectedChoice) {
                this.showAnswer(selectedChoice);
            }
        },

        showAnswer(selectedChoice) {
            this.answered = true;
            const correctAnswer =
                this.questions[this.randomQuestion].correctAnswer;
            this.isCorrect = selectedChoice.text === correctAnswer;
            this.additionalInfo =
                this.questions[this.randomQuestion].additionalInfo;
            this.source = this.questions[this.randomQuestion].source;
        },

        setOtherChoicesFalse(selectedChoice) {
            this.choices.forEach((choice) => {
                if (choice !== selectedChoice) {
                    choice.isChecked = false;
                }
            });
        },
    },

    mounted() {
        this.randomQuestion = Math.floor(Math.random() * this.questions.length);
        this.question = this.questions[this.randomQuestion].question;
        this.choices = this.questions[this.randomQuestion].choices;
    },
};
</script>
  
<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.quizz {
    display: flex;
    flex-flow: column nowrap;

    .content > div {
        display: flex;
        gap: 32px;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        text-align: center;

        .question-container {
            flex: 1;
            min-width: 35%;
        }
        .choices-container {
            flex: 1;
        }
    }

    .result {
        font-weight: bold;
        text-align: center;
        color: $secondary-green;
    }
}
</style>
  
<style lang="scss">
.mobile {
    .quizz {
        h2 {
            text-align: center;
        }
        .content > div {
            flex-flow: column nowrap !important;
            gap: 16px;

            .question-container {
                margin: 16px auto;
            }
        }
    }
}
</style>