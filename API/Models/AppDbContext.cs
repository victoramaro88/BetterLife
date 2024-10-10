using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace API_BetterLife.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CarteiraBariatrica> CarteiraBariatricas { get; set; } = null!;
        public virtual DbSet<Consultorio> Consultorios { get; set; } = null!;
        public virtual DbSet<Contato> Contatos { get; set; } = null!;
        public virtual DbSet<Documento> Documentos { get; set; } = null!;
        public virtual DbSet<Genero> Generos { get; set; } = null!;
        public virtual DbSet<Hospital> Hospitals { get; set; } = null!;
        public virtual DbSet<Permissao> Permissaos { get; set; } = null!;
        public virtual DbSet<Pessoa> Pessoas { get; set; } = null!;
        public virtual DbSet<PessoaConsultorio> PessoaConsultorios { get; set; } = null!;
        public virtual DbSet<PessoaContato> PessoaContatos { get; set; } = null!;
        public virtual DbSet<TipoCirurgium> TipoCirurgia { get; set; } = null!;
        public virtual DbSet<TipoContato> TipoContatos { get; set; } = null!;
        public virtual DbSet<TipoDocumento> TipoDocumentos { get; set; } = null!;
        public virtual DbSet<TipoPessoa> TipoPessoas { get; set; } = null!;
        public virtual DbSet<TipoUsuario> TipoUsuarios { get; set; } = null!;
        public virtual DbSet<UsuarioPessoa> UsuarioPessoas { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=victoramaro.com.br, 11433;Initial Catalog=DB_BetterLife;User ID=BetterLifeUsr;Password=B37738$#=lY0)@;Connection Timeout=600;");
                //optionsBuilder.UseSqlServer("Data Source=victoramaro.com.br, 11433;Initial Catalog=DB_BetterLife_Prod;User ID=BetterLifeUsrPrd;Password=Jsd943#@1jf0;Connection Timeout=600;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("Latin1_General_CI_AS");

            modelBuilder.Entity<CarteiraBariatrica>(entity =>
            {
                entity.HasKey(e => e.CarCodi)
                    .HasName("PK__Carteira__2586F7026B9056CB");

                entity.ToTable("CarteiraBariatrica", "dbo");

                entity.Property(e => e.CarCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("carCodi");

                entity.Property(e => e.CarDtCi)
                    .HasColumnType("date")
                    .HasColumnName("carDtCi");

                entity.Property(e => e.CarStat).HasColumnName("carStat");

                entity.Property(e => e.HosCodi).HasColumnName("hosCodi");

                entity.Property(e => e.PecCodi).HasColumnName("pecCodi");

                entity.Property(e => e.PesCodi).HasColumnName("pesCodi");

                entity.Property(e => e.TpcCodi).HasColumnName("tpcCodi");

                entity.HasOne(d => d.HosCodiNavigation)
                    .WithMany(p => p.CarteiraBariatricas)
                    .HasForeignKey(d => d.HosCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CarCodiHosCodi");

                entity.HasOne(d => d.PecCodiNavigation)
                    .WithMany(p => p.CarteiraBariatricas)
                    .HasForeignKey(d => d.PecCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CarCodiPecCodi");

                entity.HasOne(d => d.PesCodiNavigation)
                    .WithMany(p => p.CarteiraBariatricas)
                    .HasForeignKey(d => d.PesCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CarCodiPesCodi");

                entity.HasOne(d => d.TpcCodiNavigation)
                    .WithMany(p => p.CarteiraBariatricas)
                    .HasForeignKey(d => d.TpcCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CarCodiTpcCodi");
            });

            modelBuilder.Entity<Consultorio>(entity =>
            {
                entity.HasKey(e => e.ConCodi)
                    .HasName("PK__Consulto__012B5B002A02AB40");

                entity.ToTable("Consultorio", "dbo");

                entity.Property(e => e.ConCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("conCodi");

                entity.Property(e => e.ConDesc)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("conDesc");

                entity.Property(e => e.ConFoto)
                    .IsUnicode(false)
                    .HasColumnName("conFoto");

                entity.Property(e => e.ConStat).HasColumnName("conStat");
            });

            modelBuilder.Entity<Contato>(entity =>
            {
                entity.HasKey(e => e.CttCodi)
                    .HasName("PK__Contato__DB3953BD94E55364");

                entity.ToTable("Contato", "dbo");

                entity.Property(e => e.CttCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("cttCodi");

                entity.Property(e => e.CttDesc)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("cttDesc");

                entity.Property(e => e.CttStat).HasColumnName("cttStat");

                entity.Property(e => e.TicCodi).HasColumnName("ticCodi");

                entity.HasOne(d => d.TicCodiNavigation)
                    .WithMany(p => p.Contatos)
                    .HasForeignKey(d => d.TicCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_CttTipCtt");
            });

            modelBuilder.Entity<Documento>(entity =>
            {
                entity.HasKey(e => e.DocCodi)
                    .HasName("PK__Document__E4D0BF36A06F030D");

                entity.ToTable("Documento", "dbo");

                entity.Property(e => e.DocCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("docCodi");

                entity.Property(e => e.DocNume)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("docNume");

                entity.Property(e => e.DocStat).HasColumnName("docStat");

                entity.Property(e => e.PesCodi).HasColumnName("pesCodi");

                entity.Property(e => e.TidCodi).HasColumnName("tidCodi");

                entity.HasOne(d => d.PesCodiNavigation)
                    .WithMany(p => p.Documentos)
                    .HasForeignKey(d => d.PesCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PesCodDocCodi");

                entity.HasOne(d => d.TidCodiNavigation)
                    .WithMany(p => p.Documentos)
                    .HasForeignKey(d => d.TidCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PesCodTidCodi");
            });

            modelBuilder.Entity<Genero>(entity =>
            {
                entity.HasKey(e => e.GenCodi)
                    .HasName("PK__Genero__B201C6EE6EA54627");

                entity.ToTable("Genero", "dbo");

                entity.Property(e => e.GenCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("genCodi");

                entity.Property(e => e.GenDesc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("genDesc");

                entity.Property(e => e.GenStat).HasColumnName("genStat");
            });

            modelBuilder.Entity<Hospital>(entity =>
            {
                entity.HasKey(e => e.HosCodi)
                    .HasName("PK__Hospital__33667AB775E91EDC");

                entity.ToTable("Hospital", "dbo");

                entity.Property(e => e.HosCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("hosCodi");

                entity.Property(e => e.HosDesc)
                    .HasMaxLength(1000)
                    .IsUnicode(false)
                    .HasColumnName("hosDesc");

                entity.Property(e => e.HosStat).HasColumnName("hosStat");
            });

            modelBuilder.Entity<Permissao>(entity =>
            {
                entity.HasKey(e => e.PerCodi)
                    .HasName("PK__Permissa__AD53245676E0FBFB");

                entity.ToTable("Permissao", "dbo");

                entity.Property(e => e.PerCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("perCodi");

                entity.Property(e => e.PerAtiv).HasColumnName("perAtiv");

                entity.Property(e => e.PerDesc)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("perDesc");

                entity.Property(e => e.PerStat).HasColumnName("perStat");

                entity.Property(e => e.TusCodi).HasColumnName("tusCodi");

                entity.HasOne(d => d.TusCodiNavigation)
                    .WithMany(p => p.Permissaos)
                    .HasForeignKey(d => d.TusCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PesCodiTusCodi");
            });

            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.HasKey(e => e.PesCodi)
                    .HasName("PK__Pessoa__73590C1010EFAF1C");

                entity.ToTable("Pessoa", "dbo");

                entity.Property(e => e.PesCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("pesCodi");

                entity.Property(e => e.GenCodi).HasColumnName("genCodi");

                entity.Property(e => e.PesFoto)
                    .IsUnicode(false)
                    .HasColumnName("pesFoto");

                entity.Property(e => e.PesNasc)
                    .HasColumnType("date")
                    .HasColumnName("pesNasc");

                entity.Property(e => e.PesNome)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("pesNome");

                entity.Property(e => e.PesStat).HasColumnName("pesStat");

                entity.Property(e => e.TipCodi).HasColumnName("tipCodi");

                entity.HasOne(d => d.GenCodiNavigation)
                    .WithMany(p => p.Pessoas)
                    .HasForeignKey(d => d.GenCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_GenCodiPesCod");

                entity.HasOne(d => d.TipCodiNavigation)
                    .WithMany(p => p.Pessoas)
                    .HasForeignKey(d => d.TipCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_TipCodiPesCod");
            });

            modelBuilder.Entity<PessoaConsultorio>(entity =>
            {
                entity.HasKey(e => e.PecCodi)
                    .HasName("PK__PessoaCo__E18BB4C6070E5D29");

                entity.ToTable("PessoaConsultorio", "dbo");

                entity.Property(e => e.PecCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("pecCodi");

                entity.Property(e => e.ConCodi).HasColumnName("conCodi");

                entity.Property(e => e.PecStat).HasColumnName("pecStat");

                entity.Property(e => e.PesCodi).HasColumnName("pesCodi");

                entity.HasOne(d => d.ConCodiNavigation)
                    .WithMany(p => p.PessoaConsultorios)
                    .HasForeignKey(d => d.ConCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PecCodConCodi");

                entity.HasOne(d => d.PesCodiNavigation)
                    .WithMany(p => p.PessoaConsultorios)
                    .HasForeignKey(d => d.PesCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PecCodPesCodi");
            });

            modelBuilder.Entity<PessoaContato>(entity =>
            {
                entity.HasKey(e => e.PctCodi)
                    .HasName("PK__PessoaCo__266464B166748E1A");

                entity.ToTable("PessoaContato", "dbo");

                entity.Property(e => e.PctCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("pctCodi");

                entity.Property(e => e.CttCodi).HasColumnName("cttCodi");

                entity.Property(e => e.PctStat).HasColumnName("pctStat");

                entity.Property(e => e.PesCodi).HasColumnName("pesCodi");

                entity.HasOne(d => d.CttCodiNavigation)
                    .WithMany(p => p.PessoaContatos)
                    .HasForeignKey(d => d.CttCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PctCodiCttCodi");

                entity.HasOne(d => d.PesCodiNavigation)
                    .WithMany(p => p.PessoaContatos)
                    .HasForeignKey(d => d.PesCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PctCodiPesCodi");
            });

            modelBuilder.Entity<TipoCirurgium>(entity =>
            {
                entity.HasKey(e => e.TpcCodi)
                    .HasName("PK__TipoCiru__C01279DFD22BCB45");

                entity.ToTable("TipoCirurgia", "dbo");

                entity.Property(e => e.TpcCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("tpcCodi");

                entity.Property(e => e.TpcDesc)
                    .HasMaxLength(500)
                    .IsUnicode(false)
                    .HasColumnName("tpcDesc");

                entity.Property(e => e.TpcStat).HasColumnName("tpcStat");
            });

            modelBuilder.Entity<TipoContato>(entity =>
            {
                entity.HasKey(e => e.TicCodi)
                    .HasName("PK__TipoCont__49EA3E5D3F290327");

                entity.ToTable("TipoContato", "dbo");

                entity.Property(e => e.TicCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("ticCodi");

                entity.Property(e => e.TicDesc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("ticDesc");

                entity.Property(e => e.TicStat).HasColumnName("ticStat");
            });

            modelBuilder.Entity<TipoDocumento>(entity =>
            {
                entity.HasKey(e => e.TidCodi)
                    .HasName("PK__TipoDocu__C6B4605C3A5F97A4");

                entity.ToTable("TipoDocumento", "dbo");

                entity.Property(e => e.TidCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("tidCodi");

                entity.Property(e => e.TidDesc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("tidDesc");

                entity.Property(e => e.TidStat).HasColumnName("tidStat");
            });

            modelBuilder.Entity<TipoPessoa>(entity =>
            {
                entity.HasKey(e => e.TipCodi)
                    .HasName("PK__TipoPess__43C0F009547EEF48");

                entity.ToTable("TipoPessoa", "dbo");

                entity.Property(e => e.TipCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("tipCodi");

                entity.Property(e => e.TipDesc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("tipDesc");

                entity.Property(e => e.TipStat).HasColumnName("tipStat");
            });

            modelBuilder.Entity<TipoUsuario>(entity =>
            {
                entity.HasKey(e => e.TusCodi)
                    .HasName("PK__TipoUsua__BB2111358755A76B");

                entity.ToTable("TipoUsuario", "dbo");

                entity.Property(e => e.TusCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("tusCodi");

                entity.Property(e => e.TusDesc)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("tusDesc");

                entity.Property(e => e.TusStat).HasColumnName("tusStat");
            });

            modelBuilder.Entity<UsuarioPessoa>(entity =>
            {
                entity.HasKey(e => e.UsuCodi)
                    .HasName("PK__UsuarioP__7A35B9D7D5213F9B");

                entity.ToTable("UsuarioPessoa", "dbo");

                entity.Property(e => e.UsuCodi)
                    .ValueGeneratedNever()
                    .HasColumnName("usuCodi");

                entity.Property(e => e.PesCodi).HasColumnName("pesCodi");

                entity.Property(e => e.TusCodi).HasColumnName("tusCodi");

                entity.Property(e => e.UsuLogi)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("usuLogi");

                entity.Property(e => e.UsuSenh)
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("usuSenh");

                entity.Property(e => e.UsuStat).HasColumnName("usuStat");

                entity.HasOne(d => d.PesCodiNavigation)
                    .WithMany(p => p.UsuarioPessoas)
                    .HasForeignKey(d => d.PesCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PesCodUsuCodi");

                entity.HasOne(d => d.TusCodiNavigation)
                    .WithMany(p => p.UsuarioPessoas)
                    .HasForeignKey(d => d.TusCodi)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_PesCodTusCodi");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
