<template>
    <div class="quizz">
        <h2>Le saviez-vous ?</h2>

        <div class="content">
            <div class="question-container">
                <p class="question">
                    {{ question }}
                </p>
            </div>

            <div class="choices-container">
                <Checkbox
                    v-for="(choice, index) in choices"
                    :key="index"
                    v-model="choice.checked"
                    :label="choice.text"
                    :modelValue="choice.checked"
                    @click="isSelected(choice)"
                />
            </div>

            <div class="validate">
                <Button text="Valider" secondary @click="validate()" />
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

            randomQuestion: 0,
        };
    },

    methods: {
        isSelected(choice) {
            this.choices.forEach((choice) => {
                choice.checked = false;
            });
            choice.checked = true;
        },

        validate() {
            if (this.choices.some((choice) => choice.checked)) {
                this.showAnswer();
            }
        },

        showAnswer() {
            
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
.quizz {
    display: flex;
    flex-flow: column nowrap;

    .content {
        display: flex;
        gap: 32px;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        //mobile version
        @media (max-width: 838px) {
        }

        .question-container {
            flex: 1;
        }
        .choices-container {
            flex: 1;
        }
    }
}
</style>

<style lang="scss">
.mobile {
    .quizz {
        h2 {
            text-align: center;
        }
        .content {
            flex-flow: column nowrap;
            gap: 16px;

            .question-container {
                margin: 16px auto;
            }
        }
    }
}
</style>