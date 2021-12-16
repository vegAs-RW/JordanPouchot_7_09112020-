<template>
    <div class="home">
        <div class="home__title">
        <img class="home__title__logo" src="../assets/icon-left-font.png" alt="Logo de Groupomania">
        </div>
        <div class="home__display">

            <form @submit.prevent="login" class="home__display__form">
                <h1 class="home__display__form__title">Connexion</h1>

                <div class="home__display__form__input">
                    <label for="mail" class="home__display__form__input__label">Email</label>
                    <input type="email" v-model="email" id="mail" name="mail">
                </div>

                <div class="home__display__form__input">
                    <label for="password" class="home__display__form__input__label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password">
                </div>

                <button class="home__display__form__button">Connexion</button>

                <p>Vous n'avez pas encore de compte ? <router-link to="/signup" class="home__display__form__signup">S'inscrire</router-link></p>
            </form>
        </div> 
    </div>
</template>


<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    import 'notyf/notyf.min.css'
    export default {
        name: 'Home',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        }, 
        methods: {
            // Permet de se connecter et de recharger la page sans que l'utilisateur soit déconnecté
            login() {
                axios.post('http://localhost:3000/api/user/login', {
                    email: this.email,
                    password: this.password,
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('isAdmin', response.data.isAdmin);
                    localStorage.setItem('imageProfile', response.data.imageProfile);
                    this.$router.push('post');
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            }
        }
    }
</script>


<style scoped lang="scss">
    .home {
        &__title {
            background: #FFFF;
            @media (max-width: 930px) {
                width: 100vw;
                justify-content: center;
                display: flex;
                height: 150px;
                border-bottom: 2px solid #E60A0A;
            }
             &__logo {
                width: 10rem;
        }
        }
        &__display {
            background-color: #fcf3f1; 
            display: flex;
            height: 100vw;
            justify-content: space-around;
            @media (max-width: 930px) {
                display: flex;
                flex-direction: column-reverse;
            }
            /*&__picture {
                float: left;
                padding-top: 4rem;
                margin: 0 0 0 3rem;
                @media (max-width: 1170px) {
                    max-width: 350px;
                }
                @media (max-width: 930px) {
                    max-width: 250px;
                    margin: auto;
                    padding-top: 2rem;
                } 
            }*/
            &__form {
                background-color: #FFFF;
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 840px;
                width: 70%;
                border: 1px solid #fc3914;
                border-radius: 25px;
                margin: 2rem auto;
                
                padding: 2rem 0 0 0;
                /*@media (max-width: 930px) {
                    min-width: 250px;
                    //margin: auto;
                }*/
                p {
                    text-align: center;
                }
                &__title {
                    margin-bottom: 1.5rem;
                    font-size: 2rem;
                    font-weight: 800;
                    
                }
                &__input {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2rem;
                    width: 70%;
                    border-radius: 67px;
                    &__label {
                        text-align: center;
                        font-weight: bolder;
                        margin: 0 0 .5rem 0;
                    }
                }
                &__button {
                    border: 3px solid #fc7c64;
                    border-radius: 25px;
                    background-color: #fc7c64;
                    color: #FFFF;
                    font-size: 15px;
                    font-weight: bold;
                    padding: 0.9rem;
                    margin: 0 0 1rem 0;
                    outline-style: none;
                    &:hover, &:focus {
                        border: 3px solid #fc3914;
                        background-color: #fc3914;
                        cursor: pointer;
                    }
                }
                &__signup {
                    font-weight: bold;
                    text-decoration: underline;
                    color: #E60A0A;
                    
                }
            }
        }
    }

    #mail {
        border-radius: .5rem;
        border: none;
        background-color:#f2f2f2 ;
        padding: .5rem;
    }

    #password {
        padding: .5rem;
        border-radius: .5rem;
        border: none;
        background-color:#f2f2f2 ;
    }
    
</style>