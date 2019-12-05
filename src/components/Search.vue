<template>
    <div class="search">
        <header>
            <img src="JamMate.png" alt="JamMate" id="logo" @click="goMain"/>
            <h1 id="title">Jam Mate</h1>
            <button type="button" id="logout" @click="logout">Logout</button>
        </header>
        <div id="searches">
            <form id="filter" @submit="(event) => filterInstrum(event, this.instrument)">
                <p id="cap">Instrument</p>
                <input type="text" v-model="instrument" placeholder="Piano, Guitar, Drums, etc..." id="bar" />
                <input type="submit" value="Search" id="submit" />
            </form>
            <form id="filter" @submit="(event) => filterGenre(event, this.genre)">
                <p id="cap">Genre</p>
                <input type="text" v-model="genre" placeholder="Rock, Blues, Country, Pop, etc..." id="bar" />
                <input type="submit" value="Search" id="submit" />
            </form>
            <form id="filter" @submit="(event) => filterLoc(event, this.city, this.state)">
                <p id="cap">Location</p>
                <input type="text" v-model="city" placeholder="Denver, Atlanta, Austin, etc..." id="bar" />
                <select v-model="state" id="drop">
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
                <input type="submit" value="Search" id="submit" />
            </form>
        </div>
        <div id="allCards" v-for="card in finalCards" :key="card.id">
            <div id="card">
                <div id="namePic">
                    <h1 id="name">{{ card.name }}</h1>
                    <img src="https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" id="cardPic" />
                </div>
                <div id="allInfo">
                    <h2 id="caption">Instrument</h2>
                    <p id="info">{{ card.instrument }}</p>
                    <h2 id="caption">Genre</h2>
                    <p id="info">{{ card.genre }}</p>
                    <h2 id="caption">Years of Experience</h2>
                    <p id="info">{{ card.experience }} years</p>
                    <h2 id="caption">Location</h2>
                    <p id="info">{{ card.location }}</p>
                    <h2 id="caption">Contact Info</h2>
                    <p id="info">{{ card.contact }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Search',
    data() {
        return {
            instrument: '',
            genre: '',
            city: '',
            state: '',
            allInfo: [],
            allLoc: [],
            allCon: [],
            userIds: [],
            finalInfo: [],
            finalLoc: [],
            finalCon: [],
            cards: {},
            finalCards: {}
        }
    },

    mounted() {
        fetch("http://localhost:3000/information", {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(info => this.allInfo = info)

        fetch("http://localhost:3000/locations", {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(locs => this.allLoc = locs)

        fetch("http://localhost:3000/contacts", {
            headers: {
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(resp => resp.json())
            .then(cons => this.allCon = cons)
    },

    methods: {
        logout() {
            localStorage.clear()
            this.$router.push('/')
        },

        goMain() {
            this.$router.push('/main')
        },

        filterInstrum(event, param) {
            event.preventDefault()

           let $filtered = this.allInfo.filter(info => {
               return info.instrument == param
           })

           this.finalInfo = $filtered

            this.getUsers($filtered)
            this.finishLoc()
            this.makeCards()

           event.target.reset()
        },

        filterGenre(event, param) {
            event.preventDefault()

            let $filtered = this.allInfo.filter(info => {
                return info.genre == param
            })

            this.finalInfo = $filtered

            this.getUsers($filtered)
            this.finishLoc()
            this.makeCards()

            event.target.reset()
        },

        filterLoc(event, city, state) {
            event.preventDefault()

            let $filtered = this.allLoc.filter(locs => {
                return locs.city == city && locs.state == state
            })
            
            this.finalLoc = $filtered

            this.getUsers($filtered)
            this.finishInfo()
            this.makeCards()

            event.target.reset()
        },

        getUsers(filtered) {
            let $users = filtered.map(data => {
                return data.user_id
            })

            this.userIds = $users
        },

        finishInfo() {
            let $final = this.allInfo.filter(info => {
                return this.userIds.includes(info.user_id)
            })

            let $finalCon = this.allCon.filter(con => {
                return this.userIds.includes(con.user_id)
            })

            this.finalInfo = $final
            this.finalCon = $finalCon
        },

        finishLoc() {
            let $final = this.allLoc.filter(loc => {
                return this.userIds.includes(loc.user_id)
            })

            let $finalCon = this.allCon.filter(con => {
                return this.userIds.includes(con.user_id)
            })

            this.finalLoc = $final
            this.finalCon = $finalCon
        },

        makeCards() {
            let x = 1

            this.userIds.forEach(id => {
                let tempInfo = this.finalInfo.filter(info => {
                    return info.user_id == id
                })
                let tempLoc = this.finalLoc.filter(loc => {
                    return loc.user_id == id
                })
                let tempCon = this.finalCon.filter(con => {
                    return con.user_id == id
                })

                this.cards[id] = {
                    id: x,
                    name: tempInfo[0].name,
                    instrument: tempInfo[0].instrument,
                    genre: tempInfo[0].genre,
                    experience: tempInfo[0].experience,
                    location: tempLoc[0].city + ", " + tempLoc[0].state,
                    contact: tempCon[0].link
                }

                x = x + 1
            })
            this.finalCards = this.cards 
        }
    }
}
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css?family=Rajdhani&display=swap');

    .search {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
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
        font-family: 'Rajdhani', sans-serif;
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

    #title {
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

    #searches {
        display: flex;
        flex-direction: row;
        margin-top: 2rem;
        margin-bottom: 5px;
        background: #ffcb9a;
        border: .25rem solid #d9b08c;
    }

    #filter {
        text-align: center;
        margin: 5px;
    }

    #cap {
        font-family: 'Rajdhani', sans-serif;
        font-size: 100%;
        background: #116466;
        color: #d1e8e2;
        border: 3px solid #d9b08c;
    }

    #bar {
        font-size: 100%;
        height: 2rem;
        margin: 2px;
        border: 3px solid #d9b08c;
    }

    #drop {
        font-size: 100%;
        height: 2rem;
        margin-right: 2px;
        border: 3px solid #d9b08c;
    }

    #submit {
        font-family: 'Rajdhani', sans-serif;
        height: 2rem;
        font-size: 100%;
        color: #d1e8e2;
        background: #116466;
        border: 3px solid #d9b08c;
    }

    #allCards {
        display: flex;
        flex-direction: column;
        align-content: center;
        background: #ffcb9a;
        border: .5rem solid #d9b08c;
        margin: 3rem;
    }

    #card {
        display: flex;
        flex-direction: row;
    }

    #cardPic {
        width: 35rem;
        height: 25rem;
        margin: 5px;
        border: 5px solid #d9b08c;
    }

    #namePic {
        text-align: center;
    }

    #name {
        font-family: 'Rajdhani', sans-serif;
        font-size: 5rem;
        border: 5px solid #d9b08c;
        margin: 5px;
        color: #d1e8e2;
        background: #116466;
    }

    #allInfo {
        text-align: center;
        align-self: center;
        background: #116466;
        color: #d1e8e2;
        margin: 5px;
        border: 5px solid #d9b08c;
    }

    #caption {
        font-family: 'Rajdhani', sans-serif;
        font-size: 200%;
        text-decoration: underline;
        margin: 5px;
    }

    #info {
        font-family: 'Rajdhani', sans-serif;
        font-size: 150%;
    }
</style>