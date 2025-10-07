# 🚀 Guia de Instalação - Rudy Nail Designer

Este guia irá ajudá-la a colocar seu site no ar de forma rápida e fácil.

## 📋 Pré-requisitos

- Um serviço de hospedagem web (recomendações abaixo)
- Um domínio (opcional, mas recomendado)
- Acesso FTP ou painel de controle da hospedagem

## 🌐 Opções de Hospedagem Recomendadas

### Gratuitas
- **Netlify** (recomendado) - Fácil de usar, deploy automático
- **Vercel** - Ótima performance
- **GitHub Pages** - Se você usar GitHub

### Pagas (Nacionais)
- **Hostinger** - A partir de R$ 2,99/mês
- **Hostgator** - A partir de R$ 3,99/mês
- **Locaweb** - A partir de R$ 6,99/mês

## 🚀 Instalação Rápida (Netlify - Recomendado)

### Passo 1: Preparar os Arquivos
1. Baixe todos os arquivos do site
2. Crie um arquivo ZIP com todo o conteúdo da pasta `rudy-nail-designer`

### Passo 2: Deploy no Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Clique em "Sign up" e crie uma conta gratuita
3. No dashboard, clique em "Sites" → "Add new site" → "Deploy manually"
4. Arraste o arquivo ZIP para a área indicada
5. Aguarde o upload e deploy automático
6. Seu site estará online em poucos minutos!

### Passo 3: Domínio Personalizado (Opcional)
1. No painel do Netlify, vá em "Domain settings"
2. Clique em "Add custom domain"
3. Digite seu domínio (ex: rudynaildesigner.com.br)
4. Configure o DNS conforme as instruções

## 🔧 Instalação Manual (Hospedagem Tradicional)

### Passo 1: Upload dos Arquivos
1. Acesse o painel de controle da sua hospedagem
2. Localize o gerenciador de arquivos ou use um cliente FTP
3. Navegue até a pasta `public_html` ou `www`
4. Faça upload de todos os arquivos do site:
   - `index.html`
   - `portfolio.html`
   - `servicos.html`
   - `cuidados.html`
   - `sobre.html`
   - `contato.html`
   - Pasta `css/` com `style.css`
   - Pasta `js/` com `script.js`
   - Pastas `images/` e `assets/`

### Passo 2: Configurar Domínio
1. No painel da hospedagem, configure seu domínio
2. Aguarde a propagação DNS (até 24 horas)
3. Teste o acesso ao site

## ✏️ Personalização Inicial

### 1. Informações de Contato
Edite o arquivo `contato.html` e atualize:
- Telefone: `(11) 99999-9999`
- E-mail: `contato@rudynaildesigner.com`
- Endereço: `São Paulo, SP`
- Links das redes sociais

### 2. Sobre Você
No arquivo `sobre.html`, personalize:
- Sua história profissional
- Formação e certificações
- Estatísticas (anos de experiência, clientes atendidas)

### 3. Serviços e Preços
No arquivo `servicos.html`, atualize:
- Lista de serviços oferecidos
- Preços atuais
- Duração dos procedimentos
- Pacotes especiais

### 4. Adicionar Suas Fotos
1. Coloque suas fotos na pasta `images/`
2. Edite os arquivos HTML para referenciar suas imagens
3. Substitua os placeholders pelos caminhos das suas fotos

## 📱 Configurações Importantes

### Google Analytics (Opcional)
1. Crie uma conta no Google Analytics
2. Adicione o código de rastreamento antes do `</head>` em todas as páginas

### Google My Business
1. Crie ou reivindique seu perfil no Google My Business
2. Adicione fotos dos seus trabalhos
3. Mantenha informações atualizadas

### Redes Sociais
1. Atualize os links das redes sociais no rodapé
2. Configure pixels do Facebook/Instagram se usar anúncios

## 🔧 Configuração do Formulário de Contato

O formulário atual é apenas visual. Para funcionar, você precisa:

### Opção 1: Netlify Forms (Gratuito)
1. Adicione `netlify` ao atributo `form` no HTML
2. O Netlify processará automaticamente os envios

### Opção 2: Formspree (Gratuito até 50 envios/mês)
1. Acesse [formspree.io](https://formspree.io)
2. Crie uma conta e configure um formulário
3. Substitua a action do form pela URL fornecida

### Opção 3: EmailJS (Gratuito até 200 envios/mês)
1. Configure uma conta no EmailJS
2. Adicione o código JavaScript fornecido
3. Configure templates de e-mail

## 📊 SEO Básico

### 1. Meta Tags
Já incluídas nos arquivos HTML:
- Title tags otimizados
- Meta descriptions
- Meta keywords

### 2. Google Search Console
1. Adicione seu site no Google Search Console
2. Envie o sitemap (pode ser criado automaticamente)
3. Monitore a indexação

### 3. Otimização de Imagens
- Use formatos WebP quando possível
- Comprima imagens antes do upload
- Adicione alt text descritivo

## 🚨 Checklist Pós-Instalação

- [ ] Site carregando corretamente
- [ ] Todas as páginas funcionando
- [ ] Menu de navegação funcionando
- [ ] Formulário de contato configurado
- [ ] Informações de contato atualizadas
- [ ] Redes sociais configuradas
- [ ] Google Analytics instalado (opcional)
- [ ] Backup dos arquivos criado

## 🆘 Problemas Comuns

### Site não carrega
- Verifique se todos os arquivos foram enviados
- Confirme se o arquivo `index.html` está na pasta raiz
- Verifique permissões dos arquivos

### CSS não funciona
- Confirme se a pasta `css/` foi enviada
- Verifique se o caminho no HTML está correto
- Limpe o cache do navegador

### JavaScript não funciona
- Confirme se a pasta `js/` foi enviada
- Verifique o console do navegador para erros
- Teste em diferentes navegadores

## 📞 Suporte

Se precisar de ajuda:
1. Consulte a documentação da sua hospedagem
2. Entre em contato com o suporte técnico
3. Procure um desenvolvedor web local

## 🎉 Parabéns!

Seu site está pronto! Agora é só divulgar e começar a receber novos clientes através da internet.

---

**Boa sorte com seu novo site! 💅✨**
