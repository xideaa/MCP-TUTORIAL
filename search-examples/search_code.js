// Kod Arama Örneği

async function searchCodeInGitHub(searchQuery) {
    try {
        const response = await mcp.searchCode({
            q: searchQuery,
            per_page: 10
        });

        console.log('Arama sonuçları:');
        response.items.forEach(item => {
            console.log(`- ${item.path} (${item.repository.full_name})`);
        });

        return response;
    } catch (error) {
        console.error('Kod arama sırasında hata:', error);
        throw error;
    }
}

// Kullanım örneği:
// searchCodeInGitHub('language:javascript express app');