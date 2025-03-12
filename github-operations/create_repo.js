// GitHub Deposu Oluşturma Örneği

async function createNewRepository(repoName, description) {
    try {
        const response = await mcp.createRepository({
            name: repoName,
            description: description,
            private: false,
            autoInit: true
        });
        
        console.log('Yeni depo oluşturuldu:', response.html_url);
        return response;
    } catch (error) {
        console.error('Depo oluşturulurken hata:', error);
        throw error;
    }
}

// Kullanım örneği:
// createNewRepository('test-repo', 'Test amaçlı oluşturulmuş depo');