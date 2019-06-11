<template>
    <div>
        <div class="col-sm-12 text-left">
            <button type="button" class="btn btn-info" v-on:click="empty">Empty timeline</button>
        </div>
        <div>
            <p v-for="(message, index) in messages" :key="index">{{ message }}</p>
        </div>
    </div>
</template>

<script>
let msgServer;

export default {
    name: 'sse-test',
    data() {
        return {
            messages: []
        };
    },
    methods: {
        empty: function () {
            this.messages = []
        }
    },
    mounted() {
        // eslint-disable-next-line
        console.log('Connecting to sse server...');
        this.$sse('http://192.168.178.45:5500/stream', { format: 'plain', withCredentials: false }) // or { format: 'plain' }
            .then(sse => {
                msgServer = sse;
                sse.onError(err => {
                    this.$toasted.error('error: '+ err);
                    sse.close();
                });

                sse.subscribe('', data => {
                    this.messages.push(data);
                });

                // // Listen for messages based on their event (in this case, "chat")
                // sse.subscribe('chat', (message) => {
                //     this.messages.push(message);
                // });
                //
                // // Unsubscribes from event-less messages after 7 seconds
                // setTimeout(() => {
                //     sse.unsubscribe('');
                //
                //     // eslint-disable-next-line
                //     console.log('Stopped listening to event-less messages!');
                // }, 7000);
                //
                // // Unsubscribes from chat messages after 7 seconds
                // setTimeout(() => {
                //     sse.unsubscribe('chat');
                //
                //     // eslint-disable-next-line
                //     console.log('Stopped listening to chat messages!');
                // }, 14000);
            })
            .catch(err => {
                this.$toasted.error('error: '+ err)
            });
    },
    beforeDestroy() {
        msgServer.close();
    },
};
</script>