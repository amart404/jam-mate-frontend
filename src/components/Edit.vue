<template>
    <div class="edit">
        <header>
            <img src="JamMate.png" alt="JamMate" id="logo" @click="goMain"/>
            <h1>Jam Mate</h1>
            <button type="button" id="logout" @click="logout">Logout</button>
        </header>
        <form id="info" @submit="(event) => newInfo(event)">
            <p id="caption">Name:</p>
            <input type="text" placeholder="Visible to other users" v-model="name" id="name" />
            <p id="caption">Instrument of Choice:</p>
            <input type="text" placeholder="Piano, Guitar, Bass, Drums, etc..." v-model="instrument" id="instrument" />
            <p id="caption">Preferred Genre:</p>
            <input type="text" placeholder="Rock, Country, Blues, Pop, etc..." v-model="genre" id="genre" />
            <p id="caption">Years of Experience:</p>
            <input type="number" min="0" max="25" v-model="experience" id="experience" />
            <input type="submit" id="submit" />
        </form>
        <form id="location" @submit="(event) => newLocation(event)">
            <p id="caption">City:</p>
            <input type="text" placeholder="Denver, Phoenix, Orlando, etc..." v-model="city" id="city" />
            <p id="caption">State:</p>
            <select id="state" v-model="state">
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
            </select>
            <input type="submit" id="submit" />
        </form>
        <form id="contact" @submit="(event) => newContact(event)">
            <p id="caption">Best Form of Contact:</p>
            <input type="text" placeholder="Social Media Links, Email, Phone Number, etc..." v-model="contact" id="link" />
            <input type="submit" id="submit" />
        </form>
    </div>
</template>

<script>
export default {
    name: 'Edit',
    data() {
        return {
            name: '',
            instrument: '',
            genre: '',
            experience: '',
            city: '',
            state: '',
            contact: ''
        }
    },
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/')
        },

        newInfo(event) {
            event.preventDefault()

            let name = this.name
            let instrument = this.instrument
            let genre = this.genre
            let experience = +this.experience

            fetch("http://localhost:3000/information", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem('id'),
                    name,
                    instrument,
                    genre,
                    experience
                })
            })

            event.target.reset()
        },

        newLocation(event) {
            event.preventDefault()

            let city = this.city
            let state = this.state

            fetch("http://localhost:3000/locations", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem('id'),
                    city,
                    state
                })
            })

            event.target.reset()
        },

        newContact(event) {
            event.preventDefault()

            let contact = this.contact

            fetch("http://localhost:3000/contacts", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem('token')
                },
                body: JSON.stringify({
                    user_id: localStorage.getItem('id'),
                    link: contact
                })
            })

            event.target.reset()
        },

        goMain() {
            this.$router.push('/main')
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Rajdhani&display=swap');

    .edit {
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

    #info, #location, #contact {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        width: 21rem;
        height: 27rem;
        margin-top: 3rem;
        background: #ffcb9a;
        border: .5rem solid #d9b08c;
    }

    #contact {
        margin-bottom: 3rem;
    }

    #caption {
        font-family: 'Rajdhani', sans-serif;
        color: #116466;
        font-size: 2rem;
    }

    #name, #genre, #instrument, #city, #state, #link {
        margin: 5px;
        width: 13rem;
        height: 3rem;
        font-size: 100%;
        border: .25rem solid #d9b08c;
    }

    #experience {
        margin: 5px;
        width: 7rem;
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