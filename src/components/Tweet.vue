<template>
    <div>
        <b-card
                :header=tweet.authors
                header-tag="header"
                :footer=tweet.timestamp
                footer-tag="footer"
        >
            <b-card-text>{{ tweet.content }}</b-card-text>
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
