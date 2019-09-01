<template>
    <div>
        <div class="timeline row">
            <div class="left-panel col-lg-4">
                <div class="new-tweet">
                    <div>
                        <button type="button" class="btn btn-primary" style="width: 75%; background-color: #00acee" v-on:click="sendTweet" >New Tweet <font-awesome-icon icon="paper-plane"/> </button>
                    </div>
                    <label class="col-lg-9">
                        <b-form-textarea no-resize rows="4" class="textarea" v-model="tweet" placeholder="Write your tweet here"></b-form-textarea>
                    </label>
                </div>
                <div class="modes">
                    <div>
                        <button type="button" class="btn btn-secondary" v-on:click="empty">
                            Empty Timeline <font-awesome-icon icon="ban"/></button>
                    </div>
                    <div>
                        <button v-if="!isContinuous" type="button" class="btn btn-info" v-on:click="continuousMode">
                            Continuous Mode</button>
                        <button v-else type="button" class="btn btn-light">
                            Continuous Mode <font-awesome-icon icon="sync-alt"/></button>
                    </div>
                    <div>
                        <button v-if="isContinuous || isContinuous==null" type="button" class="btn btn-info" v-on:click="batchMode">Batch Mode</button>
                        <button v-else type="button" class="btn btn-light" v-on:click="batchRefresh">
                            Refresh <font-awesome-icon icon="redo-alt"/></button>
                    </div>
                </div>
                <div class="row filters">
                    <div class="col-md-1"></div>
                    <v-select class="col-md-5 select" :options="['mentions', 'location', 'tags']" v-model="myFilter"></v-select>
                    <input class="col-md-5" v-model="myValue" placeholder="filter" />

                </div>
            </div>
            <div class="list col-lg-8 border" style="min-height: 640px">
                <transition-group v-if="isContinuous" name="list-item" tag="ul" class="list__ul">
                    <li v-for="message in messages" :key="message" class="list__item">
                        <tweet class="tweet" v-bind:tweet="JSON.parse(message)"/>
                    </li>
                </transition-group>
                <transition-group v-else name="list-item" tag="ul" class="list__ul">
                    <li v-for="message in batchResults" :key="message" class="list__item">
                        <tweet class="tweet" v-bind:tweet="message"/>
                    </li>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    import Tweet from './Tweet.vue'
    import 'vue-select/dist/vue-select.css';
    import vSelect from 'vue-select'

    const SERVER_IP = '192.168.233.149';

export default {
    name: 'timeline',
    components: { Tweet, vSelect },
    props: {
        author: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            tweet: null,
            messages: [],
            isContinuous: null,
            msgServer: null,
            myFilter: '',
            myValue: '',
            batchResults: null,
        };
    },
    methods: {
        sendTweet: function () {
            this.$http.post('http://'+SERVER_IP+':5000/tweets', {
                "author": this.author,
                "content": this.tweet,
                "location": this.location
            }).then(response => {
                this.$toasted.success('sent tweet: ' + response.status)
            }, response => {
                this.$toasted.error('error post request: ' + response.status)
            })
        },
        empty: function () {
            if (this.msgServer){
                this.msgServer.close();
                this.$toasted.success('sse connection correctly shut down')
            }
            this.isContinuous = null;
            this.messages = [];
            this.batchResults = [];
        },
        batchMode: function () {
            this.empty();
            this.isContinuous = false;
            this.batchRefresh();
        },
        batchRefresh: function () {
            this.$toasted.success('sending get request');
            this.$http.get('http://'+SERVER_IP+':5000/tweets/{"'+ this.myFilter+ '":"'+ this.myValue.split().toString() +'"}/latest'
            ).then(response => {
                /* eslint-disable */
                console.log(response.data.toString());
                this.$toasted.success('Received get response: ' + response.status);
                this.batchResults = response.data.reverse();
            }, response => {
                this.$toasted.error('Error get request: ' + response.status)
            })
        },
        continuousMode: function () {
            this.empty();
            this.isContinuous = true;
            this.loadSse();
        },
        loadSse: function () {
            this.$sse('http://'+SERVER_IP+':5500/stream',
                { format: 'plain', withCredentials: false })
                .then(sse => {
                    this.msgServer = sse;
                    this.$toasted.success('sse connection correctly set up');
                    this.msgServer.onError(err => {
                        this.$toasted.error('sse connection error: '+ err);
                        sse.close();
                    });
                    this.msgServer.subscribe('', data => {
                        this.messages.unshift(data);
                        this.$toasted.success('sse message received!');
                        // eslint-disable-next-line
                        console.log(this.messages.toString());
                    });
                }).catch(err => {
                    this.$toasted.error('sse loading error: '+ err)
                });
        }
    },
    mounted() {
    },
    beforeDestroy() {
        this.empty();
    }
};
</script>

<style scoped>
    button {
        width: 75%;
        margin-bottom: 16px;
    }

    .new-tweet {
        margin-bottom: 16px;
    }

    .modes {
        margin-bottom: 16px;
    }

    .tweet {
        margin-bottom: 16px;
    }

    .list-item-enter-active,
    .list-item-leave-active {
        transition: opacity 0.3s, transform 0.3s;
        transform-origin: left center;
    }
    .list-item-enter, .list-item-leave-to /* .list-leave-active for <2.1.8 */ {
        opacity: 0;
        transform: scale(0.5);
    }

    .list-item-leave-active {
        position: absolute;
    }

    .list-item-move {
        transition: transform .4s;
    }

    .list {
        background: #FFF;
        margin: auto;
        padding: 1em 1em 1em;
        /*box-shadow: 0 5px 30px rgba(0,0,0,0.2);*/
    }

    .list__ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .list__input {
        display: flex;
        margin-bottom: 0.5em;
    }
    .list__item {
        display: block;
        margin-bottom: 0.25em;
    }

</style>

