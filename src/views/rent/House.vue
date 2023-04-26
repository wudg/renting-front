<!-- About.vue -->
<template>
  <div>
    <rental-list/>
  </div>
</template>

<script>
import RentalList from '../house/RentalList.vue'
export default {
  name: 'RentHouse',
  components:{
    RentalList
  }
}
</script>
