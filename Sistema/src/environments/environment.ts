export const environment = {
  production: false,

  version: '1.0.0 | 16/07/2024-06:33 | Localhost',

  apiServicos: "http://localhost:5226/api",
  // apiServicos: "https://www.victoramaro.com.br/BetterLife/_API/api",
  // urlValidaCarteira: "http://localhost:4200/valida/"
  urlValidaCarteira: "https://www.victoramaro.com.br/BetterLife/valida/"
};

/*-> INFORMAÇÕES SOBRE LINKS PARA VALIDAR CARTEIRA:
URL DIRETO PARA A CARTEIRA:
http://localhost:4200/carteira?data=<CPF_Base64>

URL PARA VALIDAÇÃO DA CARTEIRA:
localhost:4200/valida/<CPF_Base64>
*/


/*
http://localhost:4200/valida/MTIzNDU2Nzg5MDA=
http://localhost:4200/carteira?data=MTIzNDU2Nzg5MDA%3D
*/
