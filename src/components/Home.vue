<template>
    <div class="home">
        <header>
            <img src="JamMate.png" alt="JamMate" id="logo"/>
            <h1>Jam Mate</h1>
        </header>
        <div id="login">
            <router-link to="/login" id="route">Get Jammin'!</router-link>
        </div>
        <div id="about">
            <img src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="Instruments" id="instrum">
            <p id="desc">
               Reach out to nearby musicians and collaborate on everything from simple covers to original music! <br/>
               Explore new artists, instruments and genres with musicians at the same skill level as you. <br/>
               Or reach out to seasoned artists nearby for helpful advice or possibly even a private lesson!
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home'
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Rajdhani&display=swap');

    .home {
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
        margin-right: 38%;
        color: #d1e8e2;
        font-size: 6rem;
    }

    #login {
        font-family: 'Rajdhani', sans-serif;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 10rem;
        height: 4rem;
        margin: 5px;
        font-size: 150%;
        background: #116466;
        border: .25rem solid #d9b08c;
    }

    #route {
        color: #d1e8e2;
        text-decoration: none;
    }

    #about {
        font-family: 'Rajdhani', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        text-align: center;
        margin: 5px;
        height: 40rem;
        background: #ffcb9a;
    }

    #instrum {
        border: .4rem solid #d9b08c;
        margin-bottom: 3px;
    }

    #desc {
        color: #116466;
        font-size: 1.25rem;
        border: .4rem solid #d9b08c;
        margin-top: 2px;
    }
</style>