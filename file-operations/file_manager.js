// Dosya İşlemleri Örneği

async function updateFileInRepo(owner, repo, path, content, message) {
    try {
        const response = await mcp.createOrUpdateFile({
            owner: owner,
            repo: repo,
            path: path,
            message: message,
            content: Buffer.from(content).toString('base64'),
            branch: 'main'
        });

        console.log('Dosya güncellendi:', path);
        return response;
    } catch (error) {
        console.error('Dosya güncellenirken hata:', error);
        throw error;
    }
}

// Kullanım örneği:
// updateFileInRepo('kullaniciAdi', 'repoAdi', 'test.txt', 'Merhaba Dünya!', 'Test dosyası eklendi');