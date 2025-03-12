# MCP Agent ve Lokal Kurulum Kılavuzu

## MCP Agent Nedir?

MCP Agent, yerel geliştirme ortamınızda çalışan ve MCP hizmetleriyle iletişim kuran bir yazılım bileşenidir. Bu agent sayesinde:
- Yerel geliştirme ortamınızda MCP özelliklerini kullanabilirsiniz
- Güvenli bir şekilde uzak sistemlerle iletişim kurabilirsiniz
- Otomatik güncellemeleri alabilirsiniz

## Lokal Kurulum

### 1. Ön Gereksinimler

```bash
# Node.js kurulumu (v14 veya üzeri)
curl -fsSL https://nodejs.org/dist/v14.17.0/node-v14.17.0.pkg -o node.pkg
sudo installer -pkg node.pkg -target /

# Git kurulumu
brew install git

# MCP CLI kurulumu
npm install -g mcp-cli
```

### 2. Agent Kurulumu

```bash
# Agent'ı indir
curl -O https://mcp.dev/downloads/agent/latest

# Çalıştırma izni ver
chmod +x ./mcp-agent

# Servisi başlat
./mcp-agent start
```

### 3. Yapılandırma

```yaml
# ~/.mcp/config.yaml
agent:
  port: 8080
  log_level: info
  auto_update: true

auth:
  token: "YOUR_MCP_TOKEN"
  
endpoints:
  github: "https://api.github.com"
  gitlab: "https://gitlab.com/api/v4"
```

## Agent Kullanımı

### 1. Temel Komutlar

```bash
# Agent durumunu kontrol et
mcp-agent status

# Servisi yeniden başlat
mcp-agent restart

# Güncellemeleri kontrol et
mcp-agent update check

# Logları görüntüle
mcp-agent logs
```

### 2. JavaScript ile Agent Kullanımı

```javascript
const MCPAgent = require('mcp-agent-sdk');

async function agentOrnek() {
    const agent = new MCPAgent({
        port: 8080,
        token: process.env.MCP_TOKEN
    });

    // Agent'a bağlan
    await agent.connect();

    // GitHub işlemi gerçekleştir
    const repo = await agent.github.createRepository({
        name: 'test-repo',
        description: 'Test deposu'
    });

    // Agent bağlantısını kapat
    await agent.disconnect();
}
```

## Lokal Geliştirme Ortamı

### 1. VS Code Entegrasyonu

```json
// .vscode/settings.json
{
    "mcp.agent.enabled": true,
    "mcp.agent.port": 8080,
    "mcp.autoUpdate": true,
    "mcp.logLevel": "debug"
}
```

### 2. Docker ile Kullanım

```dockerfile
FROM node:14

# MCP Agent kur
RUN npm install -g mcp-agent

# Çalışma dizini oluştur
WORKDIR /app

# Agent yapılandırması
COPY config.yaml /root/.mcp/config.yaml

# Agent'ı başlat
CMD ["mcp-agent", "start"]
```

## Güvenlik Ayarları

### 1. Token Yönetimi

```bash
# Token oluştur
mcp-agent token create

# Token'ı yenile
mcp-agent token refresh

# Token'ı sil
mcp-agent token revoke
```

### 2. SSL Sertifikası

```bash
# SSL sertifikası oluştur
mcp-agent cert create

# Sertifikayı yenile
mcp-agent cert renew
```

## Hata Ayıklama

### 1. Debug Modu

```bash
# Debug modunda başlat
MCP_DEBUG=true mcp-agent start

# Detaylı logları görüntüle
mcp-agent logs --level debug
```

### 2. Yaygın Sorunlar ve Çözümleri

1. **Bağlantı Hatası**
   ```bash
   # Port çakışmasını kontrol et
   lsof -i :8080
   
   # Ağ ayarlarını kontrol et
   mcp-agent network test
   ```

2. **Yetkilendirme Hatası**
   ```bash
   # Token'ı doğrula
   mcp-agent token validate
   
   # Yetkileri kontrol et
   mcp-agent permissions check
   ```

## İzleme ve Metrikler

### 1. Performans İzleme

```javascript
const metrics = await agent.getMetrics();
console.log('Agent Metrikleri:', metrics);
```

### 2. Sağlık Kontrolü

```bash
# Sağlık durumunu kontrol et
mcp-agent health

# Detaylı durum raporu
mcp-agent status --verbose
```

## CI/CD Entegrasyonu

### 1. GitHub Actions ile Kullanım

```yaml
name: MCP Workflow

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: MCP Agent Kur
        uses: mcp/setup-agent@v1
      - name: İşlemleri Gerçekleştir
        run: |
          mcp-agent start
          node your-script.js
        env:
          MCP_TOKEN: ${{ secrets.MCP_TOKEN }}
```

## Kaynaklar

1. [MCP Agent Dokümantasyonu](#)
2. [Güvenlik En İyi Uygulamaları](#)
3. [API Referansı](#)
4. [Örnek Projeler](#)