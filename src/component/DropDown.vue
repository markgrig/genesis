<template>   


 
    <div class = "box-dropdown">

      <div class="selecter"> 
        {{  `Элемент: ${selectedElement}` }} 
        <div
          ref = "dropdown-activator"
          class="dropdown-activator"
          @click = "clickDropDown"  ></div>
      </div>

      <div ref ="dropdown" class ="dropdown">
        <div 
          ref = "option-element"
          class = "option-element" 
          @click = "choosElement($event,el)"
          v-for= "el, i in elements" :key = "i">
          {{ el }}
        </div>
      </div>
       
      
      
    </div>

</template>

<script>

export default {
    name: 'DropDown',
    props: {
      elements: Array,
    },
    data() {
      return {
        selectedElement: "Не выбрано",
        isOpenDropDowm: true
      }
    },
    methods: {
      choosElement(event, value) {

        this.clearOption()
        this.selectedElement = value 
        console.log(event.target.className);
        event.target.className = event.target.className + " option-clicked"

      },
      clickDropDown() {

        const dropdown = this.$refs["dropdown"]
        const optionElement = this.$refs["option-element"]
        const dropdownActivator = this.$refs["dropdown-activator"]
        
        const maxElement = optionElement.length;

        optionElement.forEach( (element, i) => {
          
          setTimeout(()=>{

              let elementTranlate, translateYOption, heightDropdown, translateDrowdown;

                if ( this.isOpenDropDowm ) {
                  translateYOption = 20
                  heightDropdown = 0
                  translateDrowdown = -25;
                  
                  elementTranlate = element;
                  dropdownActivator.style.transform =  `perspective(500px) rotateX(0deg)`

                  dropdown.style.display = "none"; 
                  elementTranlate.style.display = "none"; 

                }   else {
                  translateYOption = 20*(maxElement-i)
                  heightDropdown = 20.25*(i+1)
                  translateDrowdown = 20;

                  elementTranlate = optionElement[maxElement-i-1]
                  dropdownActivator.style.transform =  `perspective(500px) rotateX(180deg)`

                  dropdown.style.display = "block"; 
                  elementTranlate.style.display = "block"; 
              }
              
            dropdown.style.minHeight =  `${heightDropdown}px`
            dropdown.style.transform =  `perspective(500px) translateY(${translateDrowdown}px)`
            elementTranlate.style.transform = `perspective(500px) translateY(${translateYOption-20}px)`
          } , 10*i )


        })

        this.isOpenDropDowm = !this.isOpenDropDowm
      },
      clearOption() {
        this.$refs["option-element"].forEach(element => {
          element.className = element.className.replace(" option-clicked", "")
        });
      }
    },
    watch: {
      selectedElement(newValue, oldValue) {

        if ( newValue !== oldValue ) {
          this.$emit("userChooseOption", this.selectedElement )
        }

      }
    }
}

</script>

<style scoped>
  .selecter {
    box-sizing: border-box;
    position: relative;
    width: 200px;
    height: 25px;
   
    border: solid 1px rgb(228, 225, 225);
    background-color: rgb(255, 255, 255);
    border-radius: 2px;

    padding: 3px 0;
    font-size: 14px;
    padding-left: 10px;
    color: rgb(51, 50, 50);
    font-weight: 400;
    background-color: white;

  }

  .dropdown-activator {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 2px;
    right: 2px;
    background-image: url("../../src/component/img/dropdown.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 8px 5px;
    cursor: pointer ;
  }



  .dropdown {
    position: absolute;
    z-index: -10;
    box-sizing: content-box;
    width: 200px;

    border-radius: 2px;
    border: solid 1px rgb(228, 225, 225);
    transform: perspective(500px) translateY(-5px);
    background-color: white;
    transition: 0s;
    display: none;
  }
  
  .option-element {
    position: absolute;

    box-sizing: border-box;
    width: 200px;
    padding: 3px 0;

    font-size: 12px;
    padding-left: 20px;
    color: rgb(2, 2, 2);
    font-weight: 400;

    background-color: white;
    transform: perspective(500px) translateY(-20px);
    transition: 0s;

    display: none;
    cursor: pointer ;
  }
  .option-element:hover {
    background-color: rgba(235, 235, 235, 0.8);
    transition: 0.5s;
  }

  .option-element:hover::before, .option-clicked::before {
    position: absolute;
    left: 5px;
    top: 0px;
    content: "✔";
  }

  .box-dropdown {
    margin: 10px;
  }

</style>
