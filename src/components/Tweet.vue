<template>
    <div>
        <b-card>
            <h3 slot="header" class="header">@{{ tweet.authors }}</h3>
            <div class="footer row" slot="footer">
                <div class="location col-sm-6"><font-awesome-icon icon="map-marker-alt"/> {{ tweet.location }}</div>
                <div class="timestamp col-sm-6"><font-awesome-icon icon="clock"/> {{ tweet.timestamp.split('.')[0] }}</div>
            </div>
            <b-card-body class="body">{{ tweet.content }}</b-card-body>
        </b-card>
    </div>
</template>

<script>
export default {
    name: 'Tweet',
    props: {
        tweet: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    .header {
        text-align: left;
        font-size: x-large;
        font-weight: bold;
    }
    .body {
        font-size: x-large
    }
    .footer {
        margin-left: 16px;
        font-size: small;
    }
    .location {
        text-align: left;
    }
    .timestamp {
        text-align: right;
    }
</style>
