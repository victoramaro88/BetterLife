using API_BetterLife.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace API_BetterLife.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UtilController : Controller
    {
        private readonly IPasswordHasher<object> _passwordHasher;
        private readonly AppDbContext _context;

        public UtilController(AppDbContext context)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<object>();
        }

        [HttpPost]
        public Task<ActionResult<UsuarioLogadoModel>> Login(LoginModel objLogin)
        {
            try
            {
                UsuarioLogadoModel result = new UsuarioLogadoModel();

                var objUsuario = _context.UsuarioPessoas
                                         .Where(l => l.UsuLogi == objLogin.usuario)
                                         .FirstOrDefault();

                if (objUsuario == null)
                {
                    return Task.FromResult<ActionResult<UsuarioLogadoModel>>(NotFound("Usuário não encontrado."));
                }

                //string senhaCripto = CriptografarSenha(objLogin.senha!);

                var validaSenha = VerifyPassword(objUsuario.UsuSenh, objLogin.senha!);

                if (validaSenha == PasswordVerificationResult.Success)
                {
                    var objPessoa = _context.Pessoas.Where(p => p.PesCodi == objUsuario.PesCodi).FirstOrDefault();

                    if (objPessoa == null)
                    {
                        return Task.FromResult<ActionResult<UsuarioLogadoModel>>(NotFound("Pessoa não encontrada."));
                    }

                    var objPessoaConsultorio = _context.PessoaConsultorios.Where(pc => pc.PesCodi == objUsuario.PesCodi).FirstOrDefault();
                    if (objPessoaConsultorio == null)
                    {
                        return Task.FromResult<ActionResult<UsuarioLogadoModel>>(NotFound("Pessoa sem vínculo com consultório."));
                    }

                    var objConsultorio = _context.PessoaConsultorios.Where(c => c.ConCodi == objPessoaConsultorio!.ConCodi).FirstOrDefault();
                    if (objConsultorio == null)
                    {
                        return Task.FromResult<ActionResult<UsuarioLogadoModel>>(NotFound("Consultório não localizado."));
                    }

                    result.usuCodi = objUsuario.UsuCodi;
                    result.pesCodi = objPessoa.PesCodi;
                    result.pesNome = objPessoa.PesNome;
                    result.pecCodi = objPessoaConsultorio != null? objPessoaConsultorio!.PecCodi : 0;
                    result.conCodi = objConsultorio != null ? objConsultorio.ConCodi : 0;

                    return Task.FromResult<ActionResult<UsuarioLogadoModel>>(Ok(result));
                }
                else
                {
                    return Task.FromResult<ActionResult<UsuarioLogadoModel>>(Unauthorized("Senha incorreta."));
                }
            }
            catch (Exception e)
            {
                return Task.FromResult<ActionResult<UsuarioLogadoModel>>(BadRequest(e));
            }
        }

        [NonAction]
        public PasswordVerificationResult VerifyPassword(string hashedPassword, string plainPassword)
        {
            return _passwordHasher.VerifyHashedPassword(null, hashedPassword, plainPassword);
        }

        [NonAction]
        public string CriptografarSenha(string senha)
        {
            return _passwordHasher.HashPassword(null, senha);
        }
    }
}
