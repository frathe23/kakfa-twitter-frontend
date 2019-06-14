<template>
    <div>
        <div class="row">
            <div class="col-sm-4">
                <div class="col-sm-12">
                    <div class="padded col-sm-12">
                        <button type="button" class="btn btn-secondary" v-on:click="empty">
                            Empty Timeline <font-awesome-icon icon="ban"/></button>
                    </div>
                    <div class="padded col-sm-12">
                        <button v-if="!isContinuous" type="button" class="btn btn-info" v-on:click="continuousMode">
                            Continuous Mode</button>
                        <button v-else type="button" class="btn btn-light">
                            Continuous Mode <font-awesome-icon icon="sync-alt"/></button>
                    </div>
                    <div class="padded col-sm-12">
                        <button v-if="isContinuous || isContinuous==null" type="button" class="btn btn-info" v-on:click="batchMode">Batch Mode</button>
                        <button v-else type="button" class="btn btn-light" v-on:click="batchRefresh">
                            Refresh <font-awesome-icon icon="redo-alt"/></button>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div>
                        <label class="col-lg-12">
                            <input v-model="filterHashtag" placeholder="hashtag" style="width: 50%;" />
                        </label>
                        <label class="col-lg-12">
                            <input v-model="filterMentions" placeholder="mentions" style="width: 50%;" />
                        </label>
                        <label class="col-lg-12">
                            <input v-model="filterLocation" placeholder="location" style="width: 50%;" />
                        </label>
                    </div>
                </div>
            </div>
            <div class="list col-lg-8">
                <transition-group v-if="isContinuous" name="list-item" tag="ul" class="list__ul">
                    <li v-for="message in messages" :key="message" class="list__item">
                        <tweet class="tweet" v-bind:tweet="JSON.parse(message)"/>
                    </li>
                </transition-group>
                <transition-group v-else name="list-item" tag="ul" class="list__ul">
                    <li v-for="msgKey in batchResults" :key="msgKey" class="list__item">
                        <tweet class="tweet" v-bind:tweet="msgKey"/>
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
            isContinuous: null,
            msgServer: null,
            filterHashtag: '',
            filterMentions: '',
            filterLocation: '',
            batchResults: null,
            testString: '{"authors":"paolorossi","content":"eheh","location":"Milano","timestamp":"2019-06-14 00:11:16.202244","id":"ec907817-7cda-4ac1-bb70-d768096a8c79"}'
        };
    },
    methods: {
        empty: function () {
            this.messages = []
        },
        batchMode: function () {
            if (this.msgServer){
                this.msgServer.close();
            }
            this.isContinuous = false;
            this.empty();
            this.batchRefresh();
        },
        batchRefresh: function () {
            this.$http.get('http://192.168.233.143:5000/tweets/%7B%22tags%22:%22'+this.filterHashtag+'%22,%22mentions%22:%22'+
                this.filterMentions+'%22,%22location%22:%22'+this.filterLocation+'%22%7D/latest'
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
                        this.$toasted.success('Sse message received!');
                        // eslint-disable-next-line
                        console.log(this.messages.toString());
                    });
                }).catch(err => {
                    this.$toasted.error('sse loading error: '+ err)
                });
        }
    },
    mounted() {
    }
};
</script>

<style scoped>
    button {
        width: 75%;
    }
    .padded {
        padding: 16px;
        width: 100%;
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

