<template>
	<video :src="src" controls></video>
</template>

<script>
	export default{
		data(){
			
		},
		props:{
			src:{
				type:String,
				default:""
			}
		}
	}
</script>

<style scoped>
	
</style>
