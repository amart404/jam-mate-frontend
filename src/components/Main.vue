<template>
    <div class="main">
        <header>
            <img src="JamMate.png" alt="JamMate" id="logo"/>
            <h1>Jam Mate</h1>
            <button type="button" id="logout" @click="logout">Logout</button>
        </header>
        <div id="options">
            <div id="edit">
                <img src="https://images.unsplash.com/photo-1488376739361-ed24c9beb6d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="No Image :(" id="pic">
                <div id="text">
                    <h2 id="caption">Edit Information</h2>
                    <p id="desc">
                        Edit or add contact info, music preferences or location information so local artists can reach out to you!
                    </p>
                    <div id="button">
                        <router-link to="/edit" id="route">Edit</router-link>
                    </div>
                </div>
            </div>
            <div id="search">
                <img src="https://images.unsplash.com/photo-1567361672830-f7aa558ec4e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="No Image :(" id="pic">
                <div id="text">
                    <h2 id="caption">Find Artists</h2>
                    <p id="desc">
                        Search categories like preferred genre, instruments and location to find nearby artists you're interested in working with!
                    </p>
                    <div id="button">
                        <router-link to="/search" id="route">Search</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Main',
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Rajdhani&display=swap');

    .main {
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

    h1 {
        font-family: 'Rajdhani', sans-serif;
        margin-right: 1%;
        color: #d1e8e2;
        font-size: 6rem;
    }

    #logout {
        font-family: 'Rajdhani', sans-serif;
        margin-right: 3%;
        width: 7rem;
        height: 3rem;
        font-size: 135%;
        color: #d1e8e2;
        background: #116466;
        border: 2px solid #d1e8e2;
    }

    #logout:hover {
        cursor: pointer;
    }

    #edit, #search {
        display: flex;
        flex-direction: row;
        align-items: center;
        background: #ffcb9a;
        margin: 3rem;
        border: .5rem solid #d9b08c;
    }

    #text {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        background: #116466;
        margin: 5px;
        border: .25rem solid #d9b08c;
    }

    #caption {
        font-family: 'Rajdhani', sans-serif;
        color: #d1e8e2;
        font-size: 250%;
    }

    #desc {
        font-family: 'Rajdhani', sans-serif;
        color: #d1e8e2;
        font-size: 150%;
        text-align: center;
        margin-top: 1rem;
        margin-left: 5px;
        margin-right: 5px;
    }

    #button {
        font-family: 'Rajdhani', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10rem;
        height: 4rem;
        margin: 1rem 5px 5px 5px;
        font-size: 200%;
        background: #116466;
        border: .25rem solid #d9b08c;
    }

    #route {
        color: #d1e8e2;
        text-decoration: none;
    }

    #pic {
        width: 650px;
        height: 450px;
        margin: 5px;
        border: .25rem solid #d9b08c;
    }
</style>