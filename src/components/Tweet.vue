<template>
    <div>
        <b-card>
            <h3 slot="header" class="header">@{{ tweet.authors }}</h3>
            <div class="row footer" slot="footer">
                <div style="margin-right: 100px;">{{tweet.location }}</div>
                <div>{{ tweet.timestamp }}</div>
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
    .subtitle {
        text-align: left;
    }
    .footer {
        margin-left: 16px;
        font-size: small;
    }
    .body {
        font-size: x-large
    }
</style>
