<template>   
      
  <ResultsPost
    :results = "showerElements[selectedElement]">
  </ResultsPost>

  <div class = "flex-class">
    <DropDown
    :elements="elements"
    @userChooseOption= "userChooseOption" >
    </DropDown>

  <CreatingButton
    :isActive = "isActiveButton" 
    @clickButtonCreat ="clickButtonCreat">
  </CreatingButton>
  </div>

</template>

<script>  
import CreatingButton from "./component/CreatingButton.vue"
import DropDown from "./component/DropDown.vue"
import ResultsPost from "./component/ResultsPost.vue"
import axios from 'axios'

export default {
name: 'App',
components: {
  CreatingButton,
  DropDown,
  ResultsPost
 },
async created() {
  this.oAuth = await this.getKeyTocken();
},
data() {
  return {
    elements: [ "Не выбрано", "Сделка", "Контакт" , "Компания" ],
    selectedElement: "Не выбрано",
    isActiveButton: false,
    showerElements: {
      "Не выбрано": " ",
      "Сделка": " ",
      "Контакт": " ",
      "Компания": " ",
    },
    namesCategory: {
      "Сделка": "leads",
      "Контакт": "contacts",
      "Компания": "companies",
    },
    oAuth: {},
  }
},
methods: {
  async getKeyTocken() {
    try {

      const keyTocken = await axios.get(
        //`V1/oauth/get-token.php`, //local
        `https://test.gnzs.ru/oauth/get-token.php`, //prod
        { 
          headers: {
            "Content-Type": "application/json",
            "X-Client-Id": 30878566
            }
        })
      
      return keyTocken
    } catch {
      throw new Error("Ошибка в запросе токенов")
    }  
  
  },
  async uploadElement() {
    try {
      const nameCategory = this.namesCategory[this.selectedElement]
      const domain = this.oAuth.data.base_domain //prod

      const response = await axios.post(
        //`V2/api/v4/${nameCategory}`, //local
        `${domain}/api/v4/${nameCategory}`, //prod
        { body: {} },
        { 
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${this.oAuth.data.access_token}`
            }
        })

      return response
    } catch {
      throw new Error(`Ошибка при создании сужности ${this.selectedElement}`)
    }  
  
  },
  userChooseOption(value) {
    this.selectedElement = value;
   
    if ( value === "Не выбрано") {
      this.isActiveButton = false;  
    } else {
      this.isActiveButton = true
    }
  },
  async clickButtonCreat() {

    if (this.isActiveButton) {
      
      const response =  await this.uploadElement();
      
      const nameCategory = this.namesCategory[this.selectedElement]
      this.showerElements[this.selectedElement] = response.data._embedded[nameCategory][0].id

    }
    
  }
  },

}

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;350;400;500;600;800&display=swap');

body {
  background-color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.flex-class {
  display: flex;
  width: 360px;
  justify-content: space-between;
  margin: 20px auto;
}
</style>
