<template>
    <div class="login">
        <header>
            <img src="JamMate.png" alt="JamMate" id="logo" @click="goHome"/>
            <h1>Jam Mate</h1>
        </header>
        <form id="user-info" @submit="(event) => logIn(event, this.email, this.password)">
            <p id="caption">Email:</p>
            <input type="text" v-model="email" placeholder="email@example.com" id="email" />
            <p id="caption">Password:</p>
            <input type="password" v-model="password" placeholder="*****" id="password" />
            <input type="submit" id="submit" value="Log In"/>
        </form>
        <div id="signup">
            <router-link to="/signup" id="route">New User?</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        logIn(event, email, password) {
            event.preventDefault()

            fetch("http://localhost:3000/authenticate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            })
            .then(resp => resp.json())
            .then(info => this.handleResponse(info))
            .catch(error => {
                console.error(error.message)
                localStorage.clear()
            })

            this.$router.push('/main')
        },

        handleResponse(resp) {
            if(resp.auth_token) {
                localStorage.setItem('token', resp.auth_token.token)
                localStorage.setItem('id', resp.auth_token.user_id)
            } else {
                this.email = ''
                this.password = ''
            }
        },

        goHome() {
            localStorage.clear()
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Rajdhani&display=swap');

    .login {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: url(https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60);
        background-position: center center;
        background-repeat: no-repeat;
        background-attachment: fixed;
        background-size: cover;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 10rem;
        background: #116466;
        opacity: 90%;
    }

    #logo {
        height: 8rem;
        width: 10%;
        margin-left: 3%;
    }

    #logo:hover {
        opacity: 75%;
        cursor: pointer;
    }

    h1 {
        font-family: 'Rajdhani', sans-serif;
        margin-right: 38%;
        color: #d1e8e2;
        font-size: 6rem;
    }

    #user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 20rem;
        height: 25rem;
        margin: 5rem;
        background: #ffcb9a;
        border: .5rem solid #d9b08c;
    }

    #caption {
        font-family: 'Rajdhani', sans-serif;
        color: #116466;
        font-size: 2.5rem;
    }

    #email, #password {
        margin: 5px;
        width: 13rem;
        height: 3rem;
        font-size: 100%;
        border: .25rem solid #d9b08c;
    }

    #submit {
        font-family: 'Rajdhani', sans-serif;
        align-self: center;
        margin: 5px;
        width: 6rem;
        font-size: 100%;
        color: #d1e8e2;
        background: #116466;
        border: .25rem solid #d9b08c;
    }

    #signup {
        font-family: 'Rajdhani', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 8rem;
        height: 4rem;
        margin-bottom: 2rem;
        font-size: 150%;
        background: #116466;
        border: .25rem solid #d9b08c;
    }

    #route {
        color: #d1e8e2;
        text-decoration: none;
    }
</style>