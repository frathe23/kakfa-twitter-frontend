<template>
    <div>
        <div class="col-sm-12">
            <div class="row col-sm-12">
                <div class="padded">
                    <button type="button" class="btn btn-secondary" v-on:click="empty">Empty Timeline</button>
                </div>
                <div class="padded">
                    <button v-if="!isContinuous" type="button" class="btn btn-info" v-on:click="continuousMode">Continuous Mode</button>
                    <button v-else type="button" class="btn btn-light">Continuous Mode</button>
                </div>
                <div class="padded">
                    <button v-if="isContinuous" type="button" class="btn btn-info" v-on:click="batchMode">Batch Mode</button>
                    <button v-else type="button" class="btn btn-light">Refresh</button>
                </div>
            </div>
            <div class="list">
                <transition-group name="list-item" tag="ul" class="list__ul">
                    <li v-for="message in messages" :key="message" class="list__item">
                        <tweet class="tweet" v-bind:tweet="JSON.parse(message)"/>
                    </li>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import Tweet from './Tweet.vue'

export default {
    name: 'sse-timeline',
    components: { Tweet },
    data() {
        return {
            messages: [],
            isContinuous: true,
            testString: '{"authors":"paolorossi","content":"eheh","location":"Milano","timestamp":"2019-06-14 00:11:16.202244","id":"ec907817-7cda-4ac1-bb70-d768096a8c79"}'
        };
    },
    methods: {
        empty: function () {
            this.messages = []
        },
        batchMode: function () {
            this.isContinuous = false;
            this.empty();
        },
        continuousMode: function () {
            // eslint-disable-next-line
            console.log(this.testString);
            // eslint-disable-next-line
            console.log(JSON.parse(this.testString).content)
            this.isContinuous = true;
            this.empty();
            this.loadSse();
        },
        loadSse: function () {
            this.$sse('http://192.168.233.143:5500/stream', { format: 'plain', withCredentials: false }) // or { format: 'plain' }
                .then(sse => {
                    this.msgServer = sse;
                    this.msgServer.onError(err => {
                        this.$toasted.error('sse connection error: '+ err);
                        sse.close();
                });
                    this.msgServer.subscribe('', data => {
                        this.messages.unshift(data);
                        // eslint-disable-next-line
                        console.log(this.messages.toString());
                    });
                })
                .catch(err => {
                    this.$toasted.error('sse loading error: '+ err)
                });
        }
    },
    mounted() {
        this.continuousMode();
    }
};
</script>

<style scoped>
    .padded {
        padding: 16px;
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
        box-shadow: 0 5px 30px rgba(0,0,0,0.2);
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

