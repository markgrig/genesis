<template>   
      <div class = "results-panel">
        <div> ID элемента: {{ results }} </div>
      </div>
</template>

<script>

export default {
    name: 'ResultsPost',
    props: {
      results: null,
    }
}

</script>

<style scoped>
  .results-panel{

    width: 200px;
    margin: 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    background-color: white;
    border: solid 1px rgba(48, 45, 211, 0.541);
    border-radius: 4px;
    
    font-size: 16px;
    padding: 7px;
  }

  .results-panel div {
    color: rgba(39, 117, 235, 0.993);
    filter: drop-shadow( 0px 0px 1px rgb(228, 228, 228));
  }
</style>
