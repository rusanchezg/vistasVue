<template>
  <div class="modal" v-show="showModal">
    <div class="modal-content">
      <h2>An input!</h2>
      <p>Write something interesting:</p>
      <textarea v-model="inputValue" placeholder="Write something"></textarea>
      <div class="buttons">
        <button class="btn-decline" @click="cancel">Cancel</button>
        <button class="btn-accept" @click="submit">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showModal: false,
      inputValue: ''
    };
  },
  methods: {
    show() {
      this.showModal = true;
    },
    cancel() {
      this.showModal = false;
    },
    submit() {
      if (this.inputValue === '') {
        alert('You need to write something!');
      } else {
        alert('Nice! You wrote: ' + this.inputValue);
      }
      this.showModal = false;
    }
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.05));
}

.modal-content {
  border: none;
  padding: 20px;
  border-radius: 5px;
  max-width: 1000px;
  width: 100%;
  max-height: 800px;
  height: 100%;
  align-items: center;
}

h2 {
  margin-top: 30px;
}

p {
  text-align: left;
}

textarea {
  max-width: 600px;
  width: 100%;
  max-height: 400px;
  height: 100%;
  margin-bottom: 10px;
  border: 1px solid black;
    border-radius: 5px;
    padding-left: 30px;
    border-top: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.btn-accept {
	width: 120px;
    height: 40px;
    border: 1px solid black;
    border-radius: 5px;
    border-top: none;
    margin: 45px;
    background-color: #78CDD7;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
	font-size: 18px;

}
.btn-decline {
  width: 120px;
  height: 40px;
  border: 1px solid black;
  border-radius: 5px;
  border-top: none;
  margin: 45px;
  background-color: #E35F5F;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  font-size: 18px;
  color: white;
}
</style>