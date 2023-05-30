<template>
        <div class="checkbox cursor-pointer" @click="toggleCheck">
            <i class="far" :class="checked ? 'fa-check-square' : 'fa-square'"></i>
            <p>{{ label }}</p>
        </div>
</template>

<script>
export default {
    name: "Checkbox",
    
    props: {
        modelValue: Boolean,
        label: String,
    },
    
    computed: {
        checked() {
            return this.modelValue;
        },
    },
    
    methods: {
        toggleCheck() {
            this.$emit('update:modelValue', !this.modelValue);
        },
    },
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";

.checkbox {
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 8px;
    margin: 8px 8px 8px 0;
}

i {
    color: $primary-brown;
    font-size: 24px;
}

p {
    margin-left: 8px;
    white-space: nowrap;
}
</style>
