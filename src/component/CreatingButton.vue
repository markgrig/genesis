<template>   

      <button 
        :class = "classButton"
        @click="clickButtonCreat"> 
        Создать 
      </button>

</template>

<script>

export default {
    name: 'CreatingButton',
    props: {
      isActive: Boolean
    },
    methods: {
      clickButtonCreat() {
        this.$emit('clickButtonCreat');
      }
    },
    computed: {
      classButton() {
            if (this.isActive) {
              return "buttom-creat bc-active"
            } else {
              return "buttom-creat"
            }
            
      }
    }
}

</script>

<style scoped>

  .buttom-creat{
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    box-sizing: border-box;
    padding: 4px 20px;
    font-weight: 600;

    background-color: rgb(245, 245, 245);
    color: rgb(36, 36, 36);
    border: solid 1px rgb(207, 206, 206);
    border-radius: 4px;
    transition: 0.5s;
  }

  .bc-active {
    background-color: rgb(58, 104, 241);
    color: white;
    cursor: pointer ;
    border: solid 1px rgb(56, 90, 192);
    transition: 1s;
  }

</style>
