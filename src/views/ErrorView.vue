<template>
    <div class="
    error-view
    xl:px-96 lg:px-64 md:px-32 sm:px-16 px-4 ease-in-out duration-300
    py-16
    ">
        <h2 class="text-center">Error 404</h2>

        <p class="text-center">La page <strong>{{ $route.path }}</strong> n'existe pas ou n'a pas encore été créé.</p>

        <div class="text-center mt-8">
          <Button :text="'Revenir en arrière'" :href="'javascript:history.back()'" />
          <Button :text="'Retourner à l\'accueil'" secondary :href="'/'" />
        </div>
    </div>
</template>

<script>
import Button from "../components/elements/Button.vue";

export default {
    components: { Button },
    name: "ErrorView",
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
</style>