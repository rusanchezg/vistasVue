<template>
    <div class="star-score">
      <div class="stars">
        <span v-for="star in 5" :key="star" :class="{ 'filled': star <= filledStars }">&#9733;</span>
      </div>
      <!--<div class="score">{{ score }}/10</div>-->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      score: {
        type: Number,
        required: true
      }
    },
    computed: {
      filledStars() {
        return Math.round((this.score / 10) * 5);
      }
    }
  };
  </script>
  
  <style scoped>
  .star-score {
    display: flex;
    align-items: center;
  }
  
  .stars {
    color: #ddd;
    font-size: 24px;
  }
  
  .stars span {
    display: inline-block;
    transition: color 0.3s;
  }
  
  .stars span.filled {
    color: yellow;
  }
  
  .score {
    margin-left: 10px;
    font-weight: bold;
  }
  </style>