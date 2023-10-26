<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-sm-4 mt-5">
				<form @submit.prevent="register" v-if="isAuthenticated == false">
					<div class="form-group">
						<label for="email">Name</label>
						<input type="text" class="form-control" v-model="form.name"/>
                        <div class="input-errors" v-for="(error, index) of v$.name.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
					</div>			
					<div class="form-group">
						<label for="email">Email</label>
						<input type="email" class="form-control" v-model="form.email"/>
                        <div class="input-errors" v-for="(error, index) of v$.email.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
					</div>			
					<div class="form-group">
						<label for="password">Password</label>
						<input type="password" class="form-control" v-model="form.password"/>
                        <div class="input-errors" v-for="(error, index) of v$.password.$errors" :key="index">
                            <div class="error-msg">{{ error.$message }}</div>
                        </div>
					</div>			
					
					<button type="submit" :disabled="v$.$invalid" class="btn btn-dark mt-2">Register</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
    import useVuelidate from '@vuelidate/core'
    import { required, email } from '@vuelidate/validators'
	import { reactive,ref, onMounted } from 'vue';
	import axios from 'axios';
    import router from "@/router";

	export default{
		setup(){
			let isAuthenticated = ref(false)
			const form = reactive({
				name:'',
				email:'',
				password:''
			});

            const rules = {
                name: { required }, 
                email: { required, email }, 
                password: { required },
            }

            const v$ = useVuelidate(rules, form)

			const register = async()=>{
				let res = await axios.post('/register',form)
				if(res.data.authorization.token){
					localStorage.setItem('access_token',res.data.authorization.token)
					isAuthenticated.value = true;
                    window.location.reload();
				}
			}

			const checkLogin = ()=>{
				if(localStorage.getItem('access_token')){
                    router.replace("home");
                }
			}

			onMounted(checkLogin)

			return {
				form,
				register,
				isAuthenticated,
                v$ 
			}
		}
	}
</script>