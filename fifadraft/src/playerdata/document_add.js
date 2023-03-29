import { MeiliSearch } from 'meilisearch'
import players from './fifa23.json' assert { type: 'json' };

;(async () => {
  try {
    const config = {
      host: 'http://localhost:7700',
      APIKey: "XXEyxrFxR0qHYbT2G7ndp4ny0Ert3dYW2ci-tZBIC0Y"
    }

    const meili = new MeiliSearch(config)

    const index = meili.index('players')

    await index.addDocuments(players)
    
  } catch (e) {
    console.error(e)
    console.log('Meili error: ', e.message)
  }
})()