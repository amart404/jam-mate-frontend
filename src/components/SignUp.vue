<template>
    <div class="signup">
        <header>
            <img src="JamMate.png" alt="JamMate" id="logo" @click="goHome"/>
            <h1>Jam Mate</h1>
        </header>
        <form id="new-user" @submit="(event) => signUp(event)">
            <p id="caption">Email:</p>
            <input type="text" v-model="email" placeholder="email@example.com" id="email" />
            <p id="caption">Password:</p>
            <input type="password" v-model="password" placeholder="*****" id="password" />
            <p id="caption">Confirm Password:</p>
            <input type="password" v-model="confirm" placeholder="*****" id="confirm" />
            <input type="submit" value="Sign Up" id="submit"/>
        </form>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            email: '',
            password: '',
            confirm: ''
        }
    },
    methods: {
        signUp(event) {
            event.preventDefault()

            let email = this.email
            let password = this.password
            let confirm = this.confirm

            if (password === confirm) {

                fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({email, password})
                })
                .then(this.logIn(event, email, password))
                .catch(error => {
                    console.error(error.message)
                })

                this.$router.push('/main')
            }
        },
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

    .signup {
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

    #new-user {
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

    #email, #password, #confirm {
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
</style>