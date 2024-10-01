export const environment = {
  production: false,

  version: '1.0.0 | 16/07/2024-06:33 | Localhost',

  apiServicos: "https://localhost:5225/api",
  // apiServicos: "https://www.victoramaro.com.br/BetterLife/_API/api",
  // urlValidaCarteira: "http://localhost:4200/valida/"
  urlValidaCarteira: "https://www.victoramaro.com.br/BetterLife/valida?data=",
  linkExibirCarteira: "http://localhost:4200/carteira?data="
};

/*-> INFORMAÇÕES SOBRE LINKS PARA VALIDAR CARTEIRA:
URL DIRETO PARA A CARTEIRA:
http://localhost:4200/carteira?data=<CPF_Base64>

URL PARA VALIDAÇÃO DA CARTEIRA:
localhost:4200/valida/<CPF_Base64>
*/


/*
http://localhost:4200/carteira?data=MTIzNDU2Nzg5MDA%3D
http://localhost:4200/valida?data=MTIzNDU2Nzg5MDA%3D
*/
