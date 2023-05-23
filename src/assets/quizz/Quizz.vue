<template>
    <div class="quizz">
        <h2>Le saviez-vous ?</h2>

        <div class="content">
            <div class="question-container">
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quibusdam at eius eos veritatis enim facilis
                    consequatur corrupti porro dolores earum repellat ?</p>
            </div>

            <div class="choices-container">
                <Checkbox v-model="choice1" label="Choix 1" />
                <Checkbox v-model="choice2" label="Choix 2" />
            </div>

            <div class="validate">
                <Button text="Valider" secondary />
            </div>
        </div>
    </div>
</template>

<script>
import Checkbox from '../../components/elements/Checkbox.vue';
import Button from '../../components/elements/Button.vue';

export default {
    name: "Quizz",

    components: {
        Checkbox, Button
    },

    data() {
        return {
            choice1: false,
            choice2: false,
        }
    },
}
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

        .question-container {
            width: 50%;
        }
    }
}
</style>