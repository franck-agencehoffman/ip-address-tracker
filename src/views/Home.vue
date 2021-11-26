<template>
  <div class="page-wrapper">
    <div class="header">
      <h1 class="heading">IP Address Tracker</h1>

      <div class="form">
        <input class="input" type="text" v-model="query" placeholder="Search for any IP address or domain">
        <button type="button" class="button" @click="onClick">
          <svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 2L8 8L2 14" stroke="white" stroke-width="3"/>
          </svg>
        </button>
      </div>

      <div v-if="result" class="details">
        <div class="col">
          <p class="body small strong upper">IP Address</p>
          <p class="body big">{{ result.ip }}</p>
        </div>
        <div class="col">
          <p class="body small strong upper">Location</p>
          <p class="body big">{{ result.location.city }}, {{ result.location.country }}<br>{{ result.location.postalCode }}</p>
        </div>
        <div class="col">
          <p class="body small strong upper">Timezone</p>
          <p class="body big">UTC {{ result.location.timezone }}</p>
        </div>
        <div class="col">
          <p class="body small strong upper">ISP</p>
          <p class="body big">{{ result.isp }}</p>
        </div>
      </div>
    </div>

    <GmapMap
        :center='center'
        :zoom='12'
        class="map"
    >
      <GmapMarker
          :position="marker.position"
          :icon="{ url: require('../assets/img/icon-location.svg')}"
          @click="center=marker.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'

export default {
  head() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: mapState('app', ['appTitle']),
  data() {
    return {
      query: '',
      result: null,
      center: { lat: -28.643387, lng: 153.612224 },
      marker: {}
    }
  },
  methods: {
    async search(q) {
      let response = null

      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(q))
      {
        response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_xnW9X6i1B2BA4LRTQUiiPnwtAKUqt&ipAddress=${q}`)
      } else if (/((ftp|http|https):\/\/)?([a-z0-9]+\.)?([a-z0-9][a-z0-9-]*)?((\.[a-z]{2,6})|(\.[a-z]{2,6})(\.[a-z]{2,6}))$/i.test(q)) {
        response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_xnW9X6i1B2BA4LRTQUiiPnwtAKUqt&domain=${q}`)
      }

      if (response) {
        return response.data
      }

      return null
    },
    async onClick() {
      this.result = await this.search(this.query)
      this.addMarker()
    },
    addMarker() {
      if (this.result) {
        const marker = {
          lat: this.result.location.lat,
          lng: this.result.location.lng,
        }
        this.marker = { position: marker }
        this.center = marker
      }
    }
  },
  async mounted() {
    const response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=at_xnW9X6i1B2BA4LRTQUiiPnwtAKUqt`)

    this.result = response.data

    this.addMarker()
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/variables';
@import '../theme/typography';

.page-wrapper {
  height: 100%;

  .header {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 280px;
    padding: 33px 24px 128px;
    background-image: url('../assets/img/pattern-bg.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
      height: 300px;
    }

    .heading {
      margin-bottom: 31px;
      color: $white;
    }

    .form {
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: stretch;
      width: 100%;
      max-width: 555px;
      border-radius: 15px;
    }

    .input {
      width: 100%;
      padding: 18px 24px 19px;
      border: 0;
      background: $white;
      box-shadow: 0 50px 50px -25px rgba(0, 0, 0, 0.0983665);
      outline: 0;

      &::placeholder {
        color: $gray;
      }
    }

    .button {
      position: relative;
      width: 58px;
      border: 0;
      background: $dark;
      appearance: none;
      outline: 0;
      transition: all .4s ease-in-out;
      cursor: pointer;

      &:hover {
        background: $dark2;
      }

      svg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

  .details {
    position: absolute;
    bottom: 0;
    z-index: 1;
    display: flex;
    align-items: stretch;
    width: 100%;
    max-width: 1110px;
    margin: 0 auto;
    padding: 37px 32px 26px;
    border-radius: 15px;
    background: $white;
    box-shadow: 0 50px 50px -25px rgba(0, 0, 0, 0.0983665);
    transform: translateY(50%);

    @media (max-width: 1158px) {
      width: calc(100% - 48px);
    }

    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;
      max-width: 555px;
      padding: 26px 24px 24px;
      transform: translateY(62.5%);
    }

    @media (max-width: 603px) {
      width: calc(100% - 48px);
    }

    .col {
      display: flex;
      flex-direction: column;
      width: 25%;
      padding: 0 32px;
      border-right: 1px solid $light;

      &:first-of-type {
        padding-left: 0;
      }

      &:last-of-type {
        padding-right: 0;
        border-right: 0;
      }

      @media (max-width: 768px) {
        width: 100%;
        padding: 0 0 24px;
        border-right: 0;
        text-align: center;

        &:last-of-type {
          padding-bottom: 0;
        }
      }
    }

    .small {
      margin-bottom: 13px;
      color: $gray;
    }

    .big {
      color: $dark;
    }
  }

  .map {
    width: 100%;
    height: calc(100vh - 280px);
  }
}
</style>
