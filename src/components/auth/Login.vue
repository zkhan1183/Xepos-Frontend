<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-sm-4 mt-5">
                <div v-if="invalidLogin != ''" class="alert alert-danger">
                    {{ invalidLogin }}
                </div>
				<form @submit.prevent="login" v-if="isAuthenticated == false">
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
					
					<button type="submit" :disabled="v$.$invalid" class="btn btn-dark mt-2">Login</button>
				</form>
			</div>
		</div>
	</div>
</template>
<script>
    import useVuelidate from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
	import { reactive,ref, onMounted } from 'vue';
	import axios from 'axios';
    import router from "@/router";

	export default{
		setup(){
			let isAuthenticated = ref(false);
            let invalidLogin = ref("");
			const form = reactive({
				email:'',
				password:''
			});
            const rules = {
                email: { required, email }, 
                password: { required },
            }

            const v$ = useVuelidate(rules, form)

			const login = async()=>{
				await axios.post('/login',form).then(response => {
                    if(response.data.authorization.token){
                        localStorage.setItem('access_token',response.data.authorization.token)
                        isAuthenticated.value = true;
                        window.location.reload();
                    }
                }).catch(error=>{
                    if(error.response.status == 401){
                        invalidLogin.value = 'Invalid Credentials';
                    }
                });
			}

			const checkLogin = ()=>{
				if(localStorage.getItem('access_token')){
                    router.replace("home");
                }
			}

			const logout = () =>{
				if(localStorage.getItem('access_token')){
					localStorage.setItem('access_token','')
					isAuthenticated.value = false;
				}
			}

			onMounted(checkLogin)

			return {
				form,
				login,
				isAuthenticated,
				logout,
                invalidLogin,
                v$ 
			}
		},
	}
</script>