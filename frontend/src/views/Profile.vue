<template>
    <div class="card">
        <h1 class="card__title">Espace Personnel</h1>
        <p class="card__subtitle">Vos informations</p>
        <div class="form-row">
            <button class="button" @click="logout"> Déconnexion</button>
            <button class="button"> Supprimer mon compte</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Profil',
        mounted: function () {
            console.log(this.$store.state.user);
            if (this.$store.state.user.userId == -1) {
                this.$router.push('/')
                return;
            }
            
        },
        methods: {
            logout: function () {
                this.$store.commit('logout');
                this.$router.push('/')
            }
        }
        
        
    }
</script>


<style scoped>
.button {
    margin: 1rem 0 0 0;
}
</style>