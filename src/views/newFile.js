import LoginService from '@/services/LoginService';

export default (await import('vue')).defineComponent({
components: {
RouterLink, RouterView, LoginService
},
data: function () {
return {
siteKey: '6Lc8p8MoAAAAAIMVollcJEGcqYLS8t5M1mIQA3kY',
dadosManipulando: {
NOME: null,
EMAIL: null,
}
};
},
computed: {},
methods: {
login() {
console.log(LoginService);
loginService.Login(this.dadosManipulando).then((response) => {
alert(response.token);
}).catch(() => {
alert("Falha");
});

},
gravarModal() {
}
},
mounted: function () {
const script = document.createElement('script');
script.src = 'https://www.google.com/recaptcha/api.js';
script.async = true;
script.defer = true;
document.body.appendChild(script);
}
});
